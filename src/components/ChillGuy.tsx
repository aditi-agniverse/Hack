import React from 'react';

interface ChillGuyProps {
  precision: number;
  message: string;
}

export const ChillGuy: React.FC<ChillGuyProps> = ({ precision, message }) => {
  const getEmoji = () => {
    const baseImageUrl = "https://chill-guy.org/chill-guy-meme-transparent.png";
    const rotation = precision < 50 ? "rotate-12" : precision > 85 ? "-rotate-12" : "";
    const scale = precision > 85 ? "scale-125" : precision < 50 ? "scale-90" : "scale-100";
    
    return (
      <div className={`relative transition-all duration-300 ${rotation} ${scale}`}>
        <img 
          src={baseImageUrl} 
          alt="Chill Guy" 
          className="w-24 h-24 object-contain transform transition-all duration-300"
        />
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 left-4 flex items-center gap-4 bg-white/90 dark:bg-gray-800/90 p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all">
      {getEmoji()}
      <div className="flex flex-col">
        <p className="text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {message}
        </p>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${precision}%` }}
          />
        </div>
      </div>
    </div>
  );
};
