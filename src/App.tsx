import { useState, useEffect } from 'react';
import Game from './components/Game';
import MuteButton from './components/MuteButton';
import './index.css';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [muted, setMuted] = useState(() => {
    const saved = localStorage.getItem('boltyMuted');
    return saved === 'true';
  });

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('boltyMuted', muted ? 'true' : 'false');
  }, [muted]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-100 flex flex-col items-center justify-center overflow-hidden relative">
      <MuteButton muted={muted} onToggle={() => setMuted(m => !m)} />
      <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md mb-4">Bolty</h1>
      <Game isMobile={isMobile} muted={muted} />
    </div>
  );
}

export default App;