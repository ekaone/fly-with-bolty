import React from 'react';

interface ScoreProps {
  score: number;
  highScore: number;
}

const Score: React.FC<ScoreProps> = ({ score, highScore }) => {
  return (
    <div className="absolute top-4 left-0 right-0 flex flex-col items-center z-10">
      <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
        <div className="text-xl font-bold text-sky-800">Score: {score}</div>
      </div>
      <div className="mt-2 bg-amber-500/70 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
        <div className="text-sm font-medium text-white">High Score: {highScore}</div>
      </div>
    </div>
  );
};

export default Score;