import React, { useState, useEffect } from 'react';
import { DraggableDiv } from './DraggableDiv';
import { ChillGuy } from './ChillGuy';
import { NavigationControls } from './NavigationControls';
import { GuideLines } from './GuideLines';
import { levels } from '../data/levels';
import { useKeyboardControls } from '../hooks/useKeyboardControls';

interface GameLevelProps {
  level: number;
  onComplete: (score: number) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const GameLevel: React.FC<GameLevelProps> = ({ level, onComplete, onNavigate }) => {
  const [precision, setPrecision] = useState(0);
  const [showGuides, setShowGuides] = useState(level === 1);
  const currentLevel = levels[level - 1];
  const { position } = useKeyboardControls();

  const getMessage = () => {
    if (precision >= 86) return currentLevel.perfectMessage;
    return currentLevel.poorMessage;
  };

  const handlePositionChange = (newPrecision: number) => {
    setPrecision(Math.round(newPrecision));
    if (newPrecision >= 95) {
      onComplete(newPrecision);
    }
  };

  useEffect(() => {
    setShowGuides(level === 1);
  }, [level]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Level {level}: {currentLevel.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{currentLevel.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-300">Precision:</span>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${precision}%` }}
            />
          </div>
          <span className="font-bold min-w-[3rem] text-right">{precision}%</span>
        </div>
        {level === 1 && (
          <div className="mt-4">
            <button
              onClick={() => setShowGuides(!showGuides)}
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              {showGuides ? 'Hide Guides' : 'Show Guides'}
            </button>
          </div>
        )}
      </div>

      {showGuides && <GuideLines />}

      {level === 3 && (
        <>
          <div className="absolute w-24 h-24 bg-red-300/50 dark:bg-red-500/30 rounded-lg animate-pulse" 
               style={{ left: '30%', top: '40%' }} />
          <div className="absolute w-24 h-24 bg-red-300/50 dark:bg-red-500/30 rounded-lg animate-pulse" 
               style={{ left: '60%', top: '60%' }} />
          <div className="absolute w-24 h-24 bg-red-300/50 dark:bg-red-500/30 rounded-lg animate-pulse" 
               style={{ left: '45%', top: '25%' }} />
        </>
      )}

      <DraggableDiv 
        level={level} 
        onPositionChange={handlePositionChange}
        isInvisible={level === 5}
        keyboardPosition={position}
        targetSize={currentLevel.targetSize}
      />

      <ChillGuy precision={precision} message={getMessage()} />
      
      <NavigationControls 
        currentLevel={level} 
        onNavigate={onNavigate}
        precision={precision}
      />
    </div>
  );
};