import React, { useRef, useEffect } from 'react';

const Ground: React.FC = () => {
  const groundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let animationId: number;
    let position = 0;
    
    const animate = () => {
      if (!groundRef.current) return;
      
      position -= 2;
      if (position <= -40) position = 0;
      
      groundRef.current.style.backgroundPosition = `${position}px 0`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div 
      ref={groundRef}
      className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-amber-600 to-amber-700 border-t-4 border-amber-800"
      style={{ 
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 10px, transparent 10px, transparent 20px)',
      }}
    />
  );
};

export default Ground;