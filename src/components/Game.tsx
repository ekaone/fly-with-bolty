import { useEffect, useState, useRef } from "react";
import Bird from "./Bird";
import Obstacle from "./Obstacle";
import Ground from "./Ground";
import Background from "./Background";
import GameOverScreen from "./GameOverScreen";
import StartScreen from "./StartScreen";
import Score from "./Score";
import MuteButton from "./MuteButton";
import { useGameLoop } from "../hooks/useGameLoop";
import { GameState, ObstacleType } from "../types/game";
import { checkCollision, generateObstacle } from "../utils/gameUtils";

interface GameProps {
  isMobile: boolean;
  muted?: boolean;
}

const BACKSOUND_PATH = "/sound/backsound.MP3";
const GAMEOVER_PATH = "/sound/gameover.mp3";

const Game: React.FC<GameProps> = ({ isMobile, muted: mutedProp }) => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [birdPosition, setBirdPosition] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<ObstacleType[]>([]);
  const [muted, setMuted] = useState(() => {
    if (mutedProp !== undefined) return mutedProp;
    const saved = localStorage.getItem("boltyMuted");
    return saved === "true";
  });
  const gameRef = useRef<HTMLDivElement>(null);
  const obstacleTimerRef = useRef<number | null>(null);
  const backsoundRef = useRef<HTMLAudioElement | null>(null);
  const gameoverRef = useRef<HTMLAudioElement | null>(null);

  // Constants - Adjusted for easier gameplay
  const GRAVITY = 0.4;
  const JUMP_VELOCITY = -7.5;
  const OBSTACLE_SPEED = 2.5; // Reduced speed
  const OBSTACLE_INTERVAL = 2500; // Increased interval between obstacles

  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem("boltyHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    // Save high score to localStorage when it changes
    if (highScore > 0) {
      localStorage.setItem("boltyHighScore", highScore.toString());
    }
  }, [highScore]);

  useEffect(() => {
    localStorage.setItem("boltyMuted", muted ? "true" : "false");
    if (muted) {
      backsoundRef.current?.pause();
      backsoundRef.current && (backsoundRef.current.currentTime = 0);
    } else if (gameState === "playing") {
      backsoundRef.current?.play();
    }
  }, [muted]);

  useEffect(() => {
    if (!muted && gameState === "playing") {
      backsoundRef.current?.play();
    } else {
      backsoundRef.current?.pause();
      backsoundRef.current && (backsoundRef.current.currentTime = 0);
    }
    if (gameState === "gameOver") {
      if (!muted) {
        gameoverRef.current?.play();
      }
    } else {
      gameoverRef.current && (gameoverRef.current.currentTime = 0);
    }
  }, [gameState, muted]);

  useEffect(() => {
    if (mutedProp !== undefined) setMuted(mutedProp);
  }, [mutedProp]);

  // Handle jump/flap
  const handleJump = () => {
    if (gameState === "start") {
      startGame();
    } else if (gameState === "playing") {
      setBirdVelocity(JUMP_VELOCITY);
    } else if (gameState === "gameOver") {
      resetGame();
    }
  };

  // Start game
  const startGame = () => {
    setGameState("playing");
    setBirdPosition(250);
    setBirdVelocity(0);
    setScore(0);
    setObstacles([]);
    // Start generating obstacles
    if (obstacleTimerRef.current) clearInterval(obstacleTimerRef.current);
    obstacleTimerRef.current = window.setInterval(() => {
      setObstacles((prev) => [...prev, generateObstacle()]);
    }, OBSTACLE_INTERVAL);
  };

  // Reset game
  const resetGame = () => {
    setGameState("start");
  };

  // End game
  const endGame = () => {
    if (gameState === "playing") {
      setGameState("gameOver");
      if (obstacleTimerRef.current) clearInterval(obstacleTimerRef.current);
      if (score > highScore) {
        setHighScore(score);
      }
    }
  };

  // Game loop
  useGameLoop(() => {
    if (gameState !== "playing") return;

    // Update bird position and velocity (apply gravity)
    const newBirdVelocity = birdVelocity + GRAVITY;
    const newBirdPosition = birdPosition + newBirdVelocity;

    setBirdVelocity(newBirdVelocity);
    setBirdPosition(newBirdPosition);

    // Update obstacle positions and check if they're out of bounds
    const gameHeight = gameRef.current?.clientHeight || 500;
    const updatedObstacles = obstacles
      .map((obstacle) => ({
        ...obstacle,
        position: obstacle.position - OBSTACLE_SPEED,
      }))
      .filter((obstacle) => obstacle.position > -100);

    setObstacles(updatedObstacles);

    // Check for collisions
    if (
      newBirdPosition <= 0 ||
      newBirdPosition >= gameHeight - 40 ||
      checkCollision(newBirdPosition, updatedObstacles)
    ) {
      endGame();
      return;
    }

    // Update score when passing obstacles
    updatedObstacles.forEach((obstacle) => {
      if (!obstacle.passed && obstacle.position < 100) {
        setScore((prev) => prev + 1);
        obstacle.passed = true;
      }
    });
  }, [gameState, birdPosition, birdVelocity, obstacles]);

  // Keyboard and touch event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState, birdVelocity]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (obstacleTimerRef.current) {
        clearInterval(obstacleTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={gameRef}
      className="relative w-full max-w-3xl h-[500px] bg-sky-200 overflow-hidden border-4 border-sky-700 rounded-lg shadow-xl"
      onClick={isMobile ? handleJump : undefined}
    >
      {mutedProp === undefined && (
        <MuteButton muted={muted} onToggle={() => setMuted((m) => !m)} />
      )}
      <audio ref={backsoundRef} src={BACKSOUND_PATH} loop preload="auto" />
      <audio ref={gameoverRef} src={GAMEOVER_PATH} preload="auto" />
      <Background />

      {obstacles.map((obstacle, index) => (
        <Obstacle
          key={index}
          position={obstacle.position}
          height={obstacle.height}
          gap={obstacle.gap}
        />
      ))}

      <Bird position={birdPosition} velocity={birdVelocity} />
      <Ground />
      <Score score={score} highScore={highScore} />

      {gameState === "start" && (
        <StartScreen onClick={handleJump} isMobile={isMobile} />
      )}

      {gameState === "gameOver" && (
        <GameOverScreen
          score={score}
          highScore={highScore}
          onClick={resetGame}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default Game;
