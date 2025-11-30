import React, { useState } from 'react';
import { Home, BookOpen, Clock, Sparkles, User, Award, ChevronRight } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { StudyMaterials } from './components/StudyMaterials';
import { CATSimulation } from './components/CATSimulation';
import { ExamResult } from './components/ExamResult';
import { MentorAI } from './components/MentorAI';
import { Sidebar } from './components/Sidebar';
import { ExamState, TabId } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [examState, setExamState] = useState<ExamState>({ active: false, finished: false, score: 0, answered: 0 });

  const startExam = () => {
    setActiveTab('simulation');
    setExamState({ active: true, finished: false, score: 0, answered: 0 });
  };

  const finishExam = (score: number, answered: number) => {
    setExamState({ active: false, finished: true, score, answered });
  };

  const renderContent = () => {
    if (activeTab === 'simulation') {
      if (examState.active) {
        return <CATSimulation onFinish={finishExam} />;
      }
      if (examState.finished) {
        return <ExamResult score={examState.score} answeredCount={examState.answered} onHome={() => setActiveTab('home')} />;
      }
      return (
        <div className="text-center py-20 animate-fade-in">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Simulasi CAT SKD</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">Uji kemampuanmu dengan sistem CAT standar BKN. 100 Soal, 90 Menit.</p>
          <button onClick={() => setExamState({ ...examState, active: true })} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
            Mulai Ujian Sekarang
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return <Dashboard onStartExam={startExam} onOpenMateri={() => setActiveTab('learn')} onOpenMentor={() => setActiveTab('mentor')} />;
      case 'learn':
        return <StudyMaterials />;
      case 'mentor':
        return <MentorAI />;
      case 'profile':
        return (
          <div className="flex flex-col items-center py-10 animate-fade-in">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
            <h2 className="text-xl font-bold">Budi Santoso, S.Kom</h2>
            <p className="text-gray-500 mb-6">Pejuang NIP • Member Premium</p>
            
            <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
                <span className="text-gray-700 font-medium">Pengaturan Akun</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
                <span className="text-gray-700 font-medium">Riwayat Tryout</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
                <span className="text-gray-700 font-medium">Langganan & Pembayaran</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full p-4 text-red-500 font-medium hover:bg-red-50 transition text-left">
                Keluar Aplikasi
              </button>
            </div>
          </div>
        );
      default:
        return <Dashboard onStartExam={startExam} onOpenMateri={() => setActiveTab('learn')} onOpenMentor={() => setActiveTab('mentor')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Award className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-gray-900">NIP Warrior</span>
          </div>
          <button className="p-2 bg-gray-100 rounded-full" onClick={() => setActiveTab('profile')}>
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full pb-24 md:pb-8">
          {renderContent()}
        </main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'learn', icon: BookOpen, label: 'Belajar' },
            { id: 'mentor', icon: Sparkles, label: 'Mentor AI' },
            { id: 'simulation', icon: Clock, label: 'Ujian' },
          ].map((item) => {
             const Icon = item.icon;
             return (
                <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabId)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition min-w-[64px]
                    ${activeTab === item.id 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-400'}`}
                >
                <Icon className={`w-6 h-6 ${activeTab === item.id ? 'fill-current' : ''}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
                </button>
             );
          })}
        </div>
      </div>
    </div>
  );
}