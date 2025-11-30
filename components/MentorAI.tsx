import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, Send } from 'lucide-react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

export const MentorAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo! Saya Mentor AI NIP Warrior. Ada yang bisa saya bantu terkait materi TWK, TIU, atau TKP hari ini? Tanyakan saja!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const contextPrompt = `Kamu adalah Mentor AI untuk aplikasi persiapan CPNS bernama NIP Warrior. Jawablah pertanyaan pengguna dengan ramah, akurat, dan memotivasi. Fokus pada materi Tes Wawasan Kebangsaan (TWK), Tes Intelegensia Umum (TIU), dan Tes Karakteristik Pribadi (TKP). Gunakan format yang mudah dibaca. Pertanyaan user: ${userMsg.text}`;
    
    const aiResponseText = await getGeminiResponse(contextPrompt);
    
    setMessages(prev => [...prev, { role: 'model', text: aiResponseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const suggestions = [
    "Jelaskan bedanya MA dan MK",
    "Trik cepat hitung pecahan",
    "Tips menjawab soal TKP",
    "Buatkan contoh soal silogisme"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-purple-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <h3 className="font-bold">Mentor AI</h3>
            <p className="text-xs text-purple-100">Selalu siap membantu 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
              <span className="text-xs text-gray-500">Mentor sedang mengetik...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips (only show if few messages) */}
      {messages.length < 3 && (
        <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto no-scrollbar">
          {suggestions.map((s, idx) => (
            <button 
              key={idx} 
              onClick={() => { setInput(s); }}
              className="whitespace-nowrap px-3 py-1.5 bg-white border border-purple-200 rounded-full text-xs text-purple-700 hover:bg-purple-50 transition"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tanya materi CPNS di sini..."
            className="flex-1 p-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1.5 p-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2">Mentor AI dapat membuat kesalahan. Cek kembali informasi penting.</p>
      </div>
    </div>
  );
};