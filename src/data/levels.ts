import { Level } from '../types/game';

export const levels: Level[] = [
  {
    id: 1,
    name: 'Warm-up',
    description: 'Drag the square to the center. Use arrow keys for fine adjustments!',
    difficulty: 'Easy',
    perfectMessage: "Ayy, smooth moves! You're making this look easy!",
    poorMessage: "Bruh... my grandma centers divs better than that!",
    targetSize: 60,
  },
  {
    id: 2,
    name: 'Scaling Chaos',
    description: 'The div changes size, but the center stays the same. You got this!',
    difficulty: 'Medium',
    perfectMessage: "Now that's what I call pixel-perfect precision!",
    poorMessage: "Is your screen resolution set to potato?",
    targetSize: 50,
  },
  {
    id: 3,
    name: 'Triple Trouble',
    description: 'Ignore the decoys - focus on centering the blue div!',
    difficulty: 'Medium-hard',
    perfectMessage: "You've got eyes like a hawk! Impressive!",
    poorMessage: "Plot twist: that wasn't even the right div...",
    targetSize: 45,
  },
  {
    id: 4,
    name: 'Spinning Mayhem',
    description: 'Round and round it goes, where it stops... you decide!',
    difficulty: 'Hard',
    perfectMessage: "You're making me dizzy with your skills!",
    poorMessage: "Did you try closing your eyes? Might work better.",
    targetSize: 40,
  },
  {
    id: 5,
    name: 'The Phantom',
    description: 'Now you see it, now you don\'t! Time your moves carefully.',
    difficulty: 'Extreme',
    perfectMessage: "You've achieved div enlightenment!",
    poorMessage: "Have you considered a career in interpretive dance instead?",
    targetSize: 35,
  },
];
