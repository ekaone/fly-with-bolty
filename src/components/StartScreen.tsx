import React from 'react';

interface StartScreenProps {
  onClick: () => void;
  isMobile: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onClick, isMobile }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm z-20">
      <div className="bg-white rounded-xl p-6 max-w-xs mx-auto text-center shadow-lg transform transition-all">
        <h2 className="text-3xl font-bold text-sky-600 mb-4">Bolty</h2>
        <p className="text-gray-700 mb-6">
          Help Bolty fly to win Hackathon🥳
        </p>
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-600 text-sm">
            {isMobile ? 'Tap screen to flap' : 'Press SPACE to flap'}
          </div>
        </div>
        <button
          onClick={onClick}
          className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;