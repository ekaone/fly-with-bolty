import React from 'react';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onClick: () => void;
  isMobile: boolean;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  score, 
  highScore, 
  onClick,
  isMobile 
}) => {
  const isNewHighScore = score > 0 && score >= highScore;
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20">
      <div className="bg-white rounded-xl p-6 max-w-xs mx-auto text-center shadow-lg">
        <h2 className="text-3xl font-bold text-red-500 mb-2">Game Over!</h2>
        
        <div className="mb-4">
          <p className="text-xl text-gray-700">Your Score: <span className="font-bold">{score}</span></p>
          <p className="text-sm text-gray-500">High Score: {highScore}</p>
        </div>
        
        {isNewHighScore && (
          <div className="bg-amber-100 text-amber-700 p-2 rounded-lg mb-4 animate-pulse">
            🏆 New High Score! 🏆
          </div>
        )}
        
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-600 text-sm">
            {isMobile ? 'Tap to try again' : 'Press SPACE to try again'}
          </div>
        </div>
        
        <button
          onClick={onClick}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;