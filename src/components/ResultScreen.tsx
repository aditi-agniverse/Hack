import React from 'react';
import confetti from 'canvas-confetti';

interface ResultScreenProps {
  scores: number[];
  onRestart: () => void;
}

const CHILL_GUY_QUOTES = [
  "Bro, you just rewrote the laws of div physics! 🚀",
  "They said it couldn't be done. They were wrong! 💪",
  "You're like the Buddha of div centering! 🧘‍♂️",
  "CSS masters want to know your location! 🎯",
  "Is it possible to learn this power? 🤔",
];

export const ResultScreen: React.FC<ResultScreenProps> = ({ scores, onRestart }) => {
  const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  React.useEffect(() => {
    if (averageScore > 85) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#4F46E5', '#7C3AED', '#2563EB'],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#4F46E5', '#7C3AED', '#2563EB'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [averageScore]);

  const getTitle = () => {
    if (averageScore === 100) return "Div Master Supreme";
    if (averageScore >= 81) return "Div Wizard";
    if (averageScore >= 50) return "Div Wrangler";
    return "Div Noob";
  };

  const randomQuote = CHILL_GUY_QUOTES[Math.floor(Math.random() * CHILL_GUY_QUOTES.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full sm:max-w-xl lg:max-w-2xl xl:max-w-3xl border border-gray-200 dark:border-gray-700">
        <div className="flex justify-center mb-6">
          <img 
            src="https://chill-guy.org/chill-guy-meme-transparent.png"
            alt="Chill Guy"
            className="w-32 h-32 object-contain animate-bounce"
          />
        </div>

        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Game Complete!
        </h1>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-2xl font-bold mb-2">
              Chill Guy's Impressed!
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {getTitle()}
            </p>
          </div>

          <div className="space-y-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
            {scores.map((score, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">Level {index + 1}:</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="font-bold w-12 text-right">{Math.round(score)}%</span> {/* Ensuring the score is rounded to a whole number */}
                </div>
              </div>
            ))}
          </div>

          <p className="text-lg text-center italic text-gray-600 dark:text-gray-300">
            "{randomQuote}"
          </p>

          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
