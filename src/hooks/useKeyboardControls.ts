import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useKeyboardControls(step = 1) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setPosition(prev => ({ ...prev, y: prev.y - step }));
          break;
        case 'ArrowDown':
          setPosition(prev => ({ ...prev, y: prev.y + step }));
          break;
        case 'ArrowLeft':
          setPosition(prev => ({ ...prev, x: prev.x - step }));
          break;
        case 'ArrowRight':
          setPosition(prev => ({ ...prev, x: prev.x + step }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  return {
    position,
    updatePosition: setPosition,
  };
}