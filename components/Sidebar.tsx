import React from 'react';
import { Home, BookOpen, Clock, MessageSquare, User, Sparkles, Award } from 'lucide-react';
import { TabId } from '../types';

interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    { id: 'learn', icon: BookOpen, label: 'Materi Belajar' },
    { id: 'simulation', icon: Clock, label: 'Simulasi CAT' },
    { id: 'mentor', icon: MessageSquare, label: 'Mentor AI', highlight: true },
    { id: 'profile', icon: User, label: 'Profil Saya' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-200 h-screen sticky top-0 z-30">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
          <Award className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">NIP Warrior</h1>
          <p className="text-[10px] font-bold text-blue-600 tracking-wider mt-1">LULUS CPNS 2025</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
            const Icon = item.icon;
            return (
                <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabId)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-sm
                    ${activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                    ${item.highlight && activeTab !== item.id ? 'bg-purple-50 text-purple-700 hover:bg-purple-100' : ''}
                    `}
                >
                {item.highlight ? <Sparkles className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                {item.label}
                {item.highlight && <span className="ml-auto text-[10px] bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded font-bold">NEW</span>}
                </button>
            )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white shadow-lg shadow-blue-200">
          <p className="text-xs font-medium opacity-80 mb-1">Paket Premium</p>
          <p className="text-sm font-bold mb-4 leading-snug">Akses 10.000+ Soal & Video Mentor.</p>
          <button className="w-full py-2 bg-white text-indigo-700 text-xs font-bold rounded-lg shadow-sm hover:bg-gray-50 transition">
            Upgrade Sekarang
          </button>
        </div>
      </div>
    </aside>
  );
};