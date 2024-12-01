import React from 'react';

export const GuideLines: React.FC = () => {
  return (
    <>
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-300 opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-300 opacity-30 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 w-8 h-8 -ml-4 -mt-4 border-2 border-blue-300 opacity-30 pointer-events-none rounded-full" />
    </>
  );
};