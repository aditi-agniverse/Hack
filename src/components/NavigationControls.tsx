import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationControlsProps {
  currentLevel: number;
  precision: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentLevel,
  precision,
  onNavigate,
}) => {
  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      {currentLevel > 1 && (
        <button
          onClick={() => onNavigate('prev')}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous Level
        </button>
      )}
      {currentLevel < 5 && precision >= 50 && (
        <button
          onClick={() => onNavigate('next')}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
          Next Level
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};