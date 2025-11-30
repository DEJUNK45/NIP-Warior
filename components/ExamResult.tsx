import React, { useState } from 'react';
import { Award, Sparkles, Loader2 } from 'lucide-react';
import { SAMPLE_QUESTIONS } from '../constants';
import { getGeminiResponse } from '../services/geminiService';

interface ExamResultProps {
  score: number;
  answeredCount: number;
  onHome: () => void;
}

export const ExamResult: React.FC<ExamResultProps> = ({ score, answeredCount, onHome }) => {
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  const getAiAnalysis = async () => {
    setLoadingAi(true);
    const prompt = `Saya baru saja mengerjakan simulasi CPNS. Skor saya ${score} dari maksimal ${SAMPLE_QUESTIONS.length * 5}. Saya menjawab ${answeredCount} dari ${SAMPLE_QUESTIONS.length} soal. Berikan analisis singkat yang memotivasi dan 3 saran belajar spesifik untuk meningkatkan skor TWK, TIU, dan TKP saya. Format dengan bullet points. Gunakan bahasa Indonesia yang santai tapi profesional selayaknya coach.`;
    
    const result = await getGeminiResponse(prompt);
    setAiAnalysis(result);
    setLoadingAi(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center animate-fade-in pb-20">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award className="w-10 h-10 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Simulasi Selesai!</h2>
        <p className="text-gray-500 mb-6">Kamu telah menyelesaikan paket soal simulasi.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-blue-600 font-medium">Skor Total</p>
            <p className="text-3xl font-bold text-blue-800">{score}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl">
            <p className="text-sm text-orange-600 font-medium">Soal Dijawab</p>
            <p className="text-3xl font-bold text-orange-800">{answeredCount}/{SAMPLE_QUESTIONS.length}</p>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-2xl text-left mb-6 border border-purple-100 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <p className="font-bold text-gray-800">Analisis Coach AI</p>
          </div>
          
          {!aiAnalysis && !loadingAi && (
            <div className="text-center py-2">
               <p className="text-sm text-gray-500 mb-3">Ingin tahu kelemahan dan saran perbaikanmu?</p>
               <button 
                onClick={getAiAnalysis}
                className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-bold border border-purple-200 shadow-sm hover:bg-purple-50 transition flex items-center justify-center gap-2 mx-auto w-full"
              >
                <Sparkles className="w-4 h-4" />
                Analisis Performaku
              </button>
            </div>
          )}

          {loadingAi && (
            <div className="flex items-center justify-center py-6 text-purple-600">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span className="text-sm font-medium">Coach sedang menganalisis nilaimu...</span>
            </div>
          )}

          {aiAnalysis && (
            <div className="text-sm text-gray-700 whitespace-pre-line animate-fade-in bg-white/60 p-3 rounded-lg border border-purple-100/50">
              {aiAnalysis}
            </div>
          )}
        </div>

        <button 
          onClick={onHome}
          className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
};