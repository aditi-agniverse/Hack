import { useState } from 'react';
import { GameLevel } from './components/GameLevel';
import { ResultScreen } from './components/ResultScreen';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [scores, setScores] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleLevelComplete = (score: number) => {
    const newScores = [...scores];
    newScores[currentLevel - 1] = score;
    setScores(newScores);
    
    if (currentLevel < 5) {
      setTimeout(() => setCurrentLevel(currentLevel + 1), 1000);
    } else {
      setTimeout(() => setShowResults(true), 1000);
    }
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentLevel > 1) {
      setCurrentLevel(currentLevel - 1);
    } else if (direction === 'next' && currentLevel < 5) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const handleRestart = () => {
    setCurrentLevel(1);
    setScores([]);
    setShowResults(false);
  };

  if (showResults) {
    return <ResultScreen scores={scores} onRestart={handleRestart} />;
  }

  return (
    <GameLevel 
      level={currentLevel} 
      onComplete={handleLevelComplete}
      onNavigate={handleNavigate}
    />
  );
}

export default App;
