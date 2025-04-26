import React, { useEffect, useState } from 'react';
import { Bird as BirdIcon } from 'lucide-react';

interface BirdProps {
  position: number;
  velocity: number;
}

const Bird: React.FC<BirdProps> = ({ position, velocity }) => {
  const [rotation, setRotation] = useState(0);
  
  // Update bird rotation based on velocity
  useEffect(() => {
    const newRotation = Math.min(Math.max(velocity * 5, -30), 90);
    setRotation(newRotation);
  }, [velocity]);
  
  return (
    <div 
      className="absolute left-24 w-10 h-10 flex items-center justify-center transition-transform"
      style={{ 
        top: `${position}px`,
        transform: `rotate(${rotation}deg)`, 
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Bird character */}
      <div className="relative">
        <BirdIcon className="text-yellow-500 h-10 w-10 drop-shadow-md" />
        {/* Particle effect when flapping up */}
        {velocity < 0 && (
          <div className="absolute -bottom-2 -right-1">
            <div className="animate-ping absolute h-2 w-2 rounded-full bg-white opacity-75"></div>
            <div className="absolute h-1 w-1 rounded-full bg-white"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bird;