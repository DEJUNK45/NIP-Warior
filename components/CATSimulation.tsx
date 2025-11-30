import React, { useState, useEffect } from 'react';
import { SAMPLE_QUESTIONS } from '../constants';

interface CATSimulationProps {
  onFinish: (score: number, answered: number) => void;
}

export const CATSimulation: React.FC<CATSimulationProps> = ({ onFinish }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(900);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinish();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQ]: optionIndex });
  };

  const handleFinish = () => {
    setIsFinished(true);
    let score = 0;
    SAMPLE_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) score += 5;
    });
    onFinish(score, Object.keys(answers).length);
  };

  const currentQuestion = SAMPLE_QUESTIONS[currentQ];

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      {/* CAT Header */}
      <div className="bg-gray-800 text-white p-4 rounded-t-xl flex justify-between items-center shadow-md z-10">
        <div>
          <h3 className="font-bold">Simulasi SKD CPNS</h3>
          <p className="text-xs text-gray-400">Soal {currentQ + 1} dari {SAMPLE_QUESTIONS.length}</p>
        </div>
        <div className={`text-xl font-mono font-bold px-3 py-1 rounded ${timeLeft < 60 ? 'bg-red-600 animate-pulse' : 'bg-gray-700'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white border-x border-b border-gray-200 shadow-sm">
        {/* Question Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-4">
            <span className={`text-xs font-bold px-2 py-1 rounded text-white mb-2 inline-block
              ${currentQuestion.type === 'TWK' ? 'bg-red-500' : 
                currentQuestion.type === 'TIU' ? 'bg-blue-500' : 'bg-green-500'}`}>
              {currentQuestion.type}
            </span>
            <p className="text-lg text-gray-800 leading-relaxed font-medium mt-2">
              {currentQuestion.question}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => (
              <label 
                key={idx} 
                onClick={() => handleAnswer(idx)}
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all
                  ${answers[currentQ] === idx 
                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-200'}`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0
                   ${answers[currentQ] === idx ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}`}>
                  {answers[currentQ] === idx && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-gray-700 text-sm md:text-base">
                  <span className="font-bold mr-2 text-gray-500">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation Panel */}
        <div className="w-full md:w-64 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 p-4 flex flex-col">
          <div className="grid grid-cols-5 gap-2 mb-4">
            {SAMPLE_QUESTIONS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQ(idx)}
                className={`h-10 w-full rounded flex items-center justify-center text-sm font-bold border transition
                  ${currentQ === idx ? 'ring-2 ring-blue-500 border-transparent' : ''}
                  ${answers[idx] !== undefined 
                    ? 'bg-green-500 text-white border-green-600' 
                    : 'bg-white text-gray-700 border-gray-300'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="mt-auto flex gap-2">
            <button 
              onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
              disabled={currentQ === 0}
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 text-sm font-bold hover:bg-gray-300 transition"
            >
              Kembali
            </button>
            <button 
              onClick={() => {
                if(currentQ < SAMPLE_QUESTIONS.length - 1) {
                  setCurrentQ(currentQ + 1);
                } else {
                  handleFinish(); 
                }
              }}
              className={`flex-1 py-2 px-4 rounded-lg text-white text-sm font-bold shadow-sm transition
                ${currentQ === SAMPLE_QUESTIONS.length - 1 ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {currentQ === SAMPLE_QUESTIONS.length - 1 ? 'Selesai' : 'Lanjut'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};