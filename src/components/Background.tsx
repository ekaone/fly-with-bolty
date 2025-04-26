import React, { useRef, useEffect } from 'react';

const Background: React.FC = () => {
  const cloudsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let animationId: number;
    let position = 0;
    
    const animate = () => {
      if (!cloudsRef.current) return;
      
      position -= 0.5;
      if (position <= -1000) position = 0;
      
      cloudsRef.current.style.backgroundPosition = `${position}px 0`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 z-0">
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-200" />
      
      {/* Clouds layer */}
      <div 
        ref={cloudsRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='50' viewBox='0 0 100 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 25C30 34.3 37.7 42 47 42C56.3 42 64 34.3 64 25C64 15.7 56.3 8 47 8C37.7 8 30 15.7 30 25ZM82 29C82 36.2 87.8 42 95 42C102.2 42 108 36.2 108 29C108 21.8 102.2 16 95 16C87.8 16 82 21.8 82 29ZM15 27C15 32.5 19.5 37 25 37C30.5 37 35 32.5 35 27C35 21.5 30.5 17 25 17C19.5 17 15 21.5 15 27Z' fill='rgba(255, 255, 255, 0.8)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 60px',
          backgroundPosition: '0px 40px',
        }}
      />
    </div>
  );
};

export default Background;