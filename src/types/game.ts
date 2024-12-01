export interface GameState {
  currentLevel: number;
  scores: number[];
  isDragging: boolean;
  precision: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  perfectMessage: string;
  poorMessage: string;
  targetSize: number;
}