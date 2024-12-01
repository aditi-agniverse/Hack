import { useEffect, useRef, useState } from 'react';
import { Position } from '../types/game';

interface DragState {
  isDragging: boolean;
  position: Position;
}

interface UseDraggableOptions {
  x: number;
  y: number;
}

export function useDraggable(initialPosition: UseDraggableOptions) {
  const [state, setState] = useState<DragState>({
    isDragging: false,
    position: initialPosition,
  });

  const elementRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<Position>({ x: 0, y: 0 });
  const initialPosRef = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      setState(prev => ({ ...prev, isDragging: true }));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      initialPosRef.current = state.position;
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!state.isDragging) return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      setState(prev => ({
        ...prev,
        position: {
          x: initialPosRef.current.x + dx,
          y: initialPosRef.current.y + dy,
        },
      }));
    };

    const handleMouseUp = () => {
      setState(prev => ({ ...prev, isDragging: false }));
    };

    element.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [state.isDragging]);

  const updatePosition = (newPosition: Position) => {
    setState(prev => ({
      ...prev,
      position: {
        x: prev.position.x + newPosition.x,
        y: prev.position.y + newPosition.y,
      },
    }));
  };

  return {
    elementRef,
    isDragging: state.isDragging,
    position: state.position,
    updatePosition,
  };
}