import React from 'react';

interface ObstacleProps {
  position: number;
  height: number;
  gap: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ position, height, gap }) => {
  return (
    <div 
      className="absolute w-16 h-full flex flex-col justify-between items-center"
      style={{ left: `${position}px` }}
    >
      {/* Top pipe */}
      <div 
        className="w-full bg-gradient-to-r from-green-600 to-green-500 rounded-b-lg border-b-4 border-x-4 border-green-700 relative"
        style={{ height: `${height}px` }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-700 rounded-b-lg"></div>
      </div>
      
      {/* Bottom pipe */}
      <div 
        className="w-full bg-gradient-to-r from-green-600 to-green-500 rounded-t-lg border-t-4 border-x-4 border-green-700 relative"
        style={{ height: `calc(100% - ${height + gap}px)` }}
      >
        <div className="absolute top-0 left-0 right-0 h-4 bg-green-700 rounded-t-lg"></div>
      </div>
    </div>
  );
};

export default Obstacle;