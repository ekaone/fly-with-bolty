import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MuteButtonProps {
  muted: boolean;
  onToggle: () => void;
}

const MuteButton: React.FC<MuteButtonProps> = ({ muted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="absolute top-4 right-4 z-50 bg-white bg-opacity-70 rounded-full shadow p-2 hover:bg-opacity-100 transition"
      aria-label={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? (
        <VolumeX className="w-6 h-6 text-red-500" />
      ) : (
        <Volume2 className="w-6 h-6 text-green-600" />
      )}
    </button>
  );
};

export default MuteButton;
