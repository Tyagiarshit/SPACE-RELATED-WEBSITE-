import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, CheckCircle2, XCircle, ArrowRight, RefreshCcw } from 'lucide-react';

const QUESTIONS = [
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Neptune", "Saturn", "Jupiter", "Uranus"],
    correct: 2
  },
  {
    question: "Which planet has a complex ring system that would float in water?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    correct: 0
  },
  {
    question: "Which planet rotates on its side?",
    options: ["Venus", "Uranus", "Neptune", "Mercury"],
    correct: 1
  },
  {
    question: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correct: 1
  }
];

export function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === QUESTIONS[currentStep].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(s => s + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                Question {currentStep + 1} of {QUESTIONS.length}
              </span>
              <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-8 leading-tight">
              {QUESTIONS[currentStep].question}
            </h3>

            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((option, index) => {
                const isCorrect = index === QUESTIONS[currentStep].correct;
                const isSelected = index === selectedOption;
                
                let bgClass = "bg-white/5 border-white/10 hover:bg-white/10";
                if (isAnswered) {
                  if (isCorrect) bgClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
                  else if (isSelected) bgClass = "bg-red-500/20 border-red-500/50 text-red-400";
                  else bgClass = "bg-white/5 border-white/10 opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    disabled={isAnswered}
                    className={`w-full p-5 rounded-2xl border transition-all flex items-center justify-between text-left font-medium ${bgClass}`}
                  >
                    {option}
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={nextQuestion}
                className="mt-8 w-full py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
              >
                {currentStep === QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-yellow-400" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Quiz Complete!</h2>
            <p className="text-white/50 mb-8">You scored {score} out of {QUESTIONS.length}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Accuracy</div>
                <div className="text-2xl font-bold text-white">{(score / QUESTIONS.length * 100).toFixed(0)}%</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Rank</div>
                <div className="text-2xl font-bold text-white">{score === QUESTIONS.length ? "Explorer" : "Novice"}</div>
              </div>
            </div>

            <button
              onClick={resetQuiz}
              className="w-full py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
