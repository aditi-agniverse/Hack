import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useDraggable } from '../hooks/useDraggable';
import { Position } from '../types/game';

interface DraggableDivProps {
  level: number;
  onPositionChange: (precision: number) => void;
  isInvisible?: boolean;
  keyboardPosition: Position;
  targetSize: number;
}

export const DraggableDiv: React.FC<DraggableDivProps> = ({ 
  level, 
  onPositionChange, 
  isInvisible,
  keyboardPosition,
  targetSize
}) => {
  const { elementRef, position, updatePosition } = useDraggable({
    x: window.innerWidth / 2,
    y: 50, // Start from top
  });

  useEffect(() => {
    if (updatePosition) {
      updatePosition({
        x: keyboardPosition.x,
        y: keyboardPosition.y
      });
    }
  }, [keyboardPosition.x, keyboardPosition.y]);

  useEffect(() => {
    if (!elementRef.current) return;

    // Level 2: Random scaling with smoother animation
    if (level === 2) {
      gsap.to(elementRef.current, {
        scale: "random(0.8, 1.5)",
        x: "random(-5, 5)",
        y: "random(-5, 5)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    // Level 4: Smooth rotation
    if (level === 4) {
      gsap.to(elementRef.current, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
      });

      // Gentle position adjustments
      const teleport = () => {
        gsap.to(elementRef.current, {
          x: `random(-10, 10)`,
          y: `random(-10, 10)`,
          duration: 0.5,
          ease: "power2.inOut"
        });
      };

      const interval = setInterval(teleport, 3000);
      return () => clearInterval(interval);
    }

    // Level 5: Improved visibility pattern
    if (level === 5) {
      gsap.to(elementRef.current, {
        opacity: 0,
        duration: 0.3,
        repeat: -1,
        repeatDelay: 1.5,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    return () => {
      gsap.killTweensOf(elementRef.current);
    };
  }, [level]);

  useEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const distanceX = Math.abs(rect.left + rect.width / 2 - centerX);
      const distanceY = Math.abs(rect.top + rect.height / 2 - centerY);
      
      const maxDistance = Math.sqrt(Math.pow(window.innerWidth / 2, 2) + Math.pow(window.innerHeight / 2, 2));
      const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
      
      // More forgiving precision calculation
      const precision = Math.max(0, 100 - (distance / (maxDistance * (targetSize / 150))) * 100);
      onPositionChange(precision);
    }
  }, [position.x, position.y, targetSize]);

  const baseClasses = "cursor-move absolute transition-transform";
  const visibilityClasses = isInvisible 
    ? "border-4 border-dashed border-blue-500 hover:bg-blue-500/20" 
    : "bg-gradient-to-br from-blue-500 to-purple-500";

  return (
    <div
      ref={elementRef}
      style={{ 
        left: position.x,
        top: position.y,
        touchAction: 'none',
        width: `${targetSize}px`,
        height: `${targetSize}px`,
        opacity: level === 5 ? 0.8 : 1
      }}
      className={`${baseClasses} ${visibilityClasses} rounded-lg shadow-lg`}
    />
  );
};