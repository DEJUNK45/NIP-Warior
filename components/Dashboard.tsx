import React, { useState } from 'react';
import { Award, Sparkles, CheckCircle, Play, BookOpen, ChevronRight, Pencil, Check, Users, TrendingUp, Target, BarChart2 } from 'lucide-react';

interface DashboardProps {
  onStartExam: () => void;
  onOpenMateri: () => void;
  onOpenMentor: () => void;
}

const TARGET_OPTIONS = [
  "CPNS Kemenkumham 2025",
  "CPNS Kementerian Keuangan 2025",
  "CPNS Kemendikbud Ristek 2025",
  "CPNS Kejaksaan Agung 2025",
  "CPNS Badan Intelijen Negara 2025",
  "CPNS Pemprov DKI Jakarta 2025",
  "Sekolah Kedinasan (STAN/STIS/IPDN)",
  "PPPK Teknis 2025"
];

// Mock data untuk statistik persaingan per instansi
const TARGET_STATS: Record<string, { applicants: string, passingGrade: number, avgScore: number, chance: string, color: string }> = {
  "CPNS Kemenkumham 2025": { applicants: "245,120", passingGrade: 390, avgScore: 365, chance: "Tinggi", color: "text-green-600" },
  "CPNS Kementerian Keuangan 2025": { applicants: "112,500", passingGrade: 450, avgScore: 410, chance: "Sedang", color: "text-yellow-600" },
  "CPNS Kemendikbud Ristek 2025": { applicants: "89,300", passingGrade: 350, avgScore: 330, chance: "Tinggi", color: "text-green-600" },
  "CPNS Kejaksaan Agung 2025": { applicants: "156,000", passingGrade: 400, avgScore: 380, chance: "Sedang", color: "text-yellow-600" },
  "CPNS Badan Intelijen Negara 2025": { applicants: "45,200", passingGrade: 470, avgScore: 440, chance: "Rendah", color: "text-red-600" },
  "CPNS Pemprov DKI Jakarta 2025": { applicants: "78,900", passingGrade: 410, avgScore: 395, chance: "Sedang", color: "text-yellow-600" },
  "Sekolah Kedinasan (STAN/STIS/IPDN)": { applicants: "320,000", passingGrade: 480, avgScore: 450, chance: "Rendah", color: "text-red-600" },
  "PPPK Teknis 2025": { applicants: "450,100", passingGrade: 320, avgScore: 310, chance: "Sangat Tinggi", color: "text-green-600" },
};

export const Dashboard: React.FC<DashboardProps> = ({ onStartExam, onOpenMateri, onOpenMentor }) => {
  const [target, setTarget] = useState(TARGET_OPTIONS[0]);
  const [isEditingTarget, setIsEditingTarget] = useState(false);

  // Mengambil data statistik berdasarkan target yang dipilih
  const stats = TARGET_STATS[target] || TARGET_STATS["CPNS Kemenkumham 2025"];
  
  // Mock skor user saat ini (bisa diambil dari global state nanti)
  const userScore = 385; 

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header / Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Award className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-1">Halo, Pejuang NIP!</h2>
            
            {isEditingTarget ? (
              <div className="flex items-center gap-2 mt-2 animate-fade-in">
                <select 
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="text-gray-800 text-xs md:text-sm rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/95 backdrop-blur shadow-sm cursor-pointer"
                  autoFocus
                >
                  {TARGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <button 
                  onClick={() => setIsEditingTarget(false)}
                  className="bg-white/20 hover:bg-white/30 p-1.5 rounded-lg transition-colors backdrop-blur-md"
                >
                  <Check className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <div 
                className="flex items-center gap-2 group cursor-pointer mt-1 w-fit hover:bg-white/10 px-2 py-1 -ml-2 rounded-lg transition-all"
                onClick={() => setIsEditingTarget(true)}
              >
                <p className="text-blue-100 text-sm">Target: <span className="font-semibold text-white">{target}</span></p>
                <Pencil className="w-3 h-3 text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
            <Award className="w-6 h-6 text-yellow-300" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 relative z-10">
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm border border-white/10">
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-blue-100">Hari Streak</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm border border-white/10">
            <div className="text-2xl font-bold">450</div>
            <div className="text-xs text-blue-100">Soal Selesai</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm border border-white/10">
            <div className="text-2xl font-bold">Top 5%</div>
            <div className="text-xs text-blue-100">Ranking</div>
          </div>
        </div>
      </div>

      {/* Competitor Analysis Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-800">Peta Persaingan</h3>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gray-100 ${stats.color}`}>
            Peluang: {stats.chance}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1"><Users className="w-3 h-3" /> Pesaing</p>
                <p className="font-bold text-gray-800 text-sm md:text-base">{stats.applicants}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1"><Target className="w-3 h-3" /> Target Skor</p>
                <p className="font-bold text-gray-800 text-sm md:text-base">{stats.passingGrade}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1"><BarChart2 className="w-3 h-3" /> Rata-rata</p>
                <p className="font-bold text-gray-800 text-sm md:text-base">{stats.avgScore}</p>
            </div>
        </div>

        {/* Score Comparison Bar */}
        <div className="space-y-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Skor Kamu: <strong>{userScore}</strong></span>
                <span>Rata-rata Pesaing: <strong>{stats.avgScore}</strong></span>
            </div>
            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                {/* Avg Competitor Marker */}
                <div 
                    className="absolute top-0 bottom-0 bg-gray-300 w-1 z-10" 
                    style={{ left: `${Math.min((stats.avgScore / 550) * 100, 100)}%` }}
                />
                
                {/* User Score Bar */}
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ${userScore >= stats.passingGrade ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min((userScore / 550) * 100, 100)}%` }}
                />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400">
                <span>0</span>
                <span className="text-center">Posisi kamu {userScore > stats.avgScore ? 'di atas' : 'di bawah'} rata-rata</span>
                <span>550 (Max)</span>
            </div>
        </div>
      </div>

      {/* Gemini Feature Promo */}
      <div 
        className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition" 
        onClick={onOpenMentor}
      >
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm md:text-base">Bingung Materi? Tanya Mentor AI</h3>
            <p className="text-xs text-gray-500">Dapatkan penjelasan instan tentang TWK, TIU, & TKP.</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>

      {/* Daily Quests */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
          Misi Harian
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {[
            { title: 'Selesaikan 10 Soal TIU', progress: '10/10', done: true },
            { title: 'Baca Modul UUD 1945', progress: '0/1', done: false },
            { title: 'Ikuti 1x Mini Tryout', progress: '0/1', done: false },
          ].map((quest, idx) => (
            <div key={idx} className={`p-4 border-b last:border-0 flex justify-between items-center ${quest.done ? 'bg-gray-50' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${quest.done ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                  {quest.done && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${quest.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{quest.title}</span>
              </div>
              <span className="text-xs font-semibold text-gray-500">{quest.progress}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={onStartExam}
          className="p-4 bg-orange-50 rounded-xl border border-orange-200 flex flex-col items-center justify-center hover:bg-orange-100 transition group"
        >
          <div className="bg-orange-500 p-3 rounded-full mb-2 shadow-sm group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
          <span className="font-bold text-gray-800">Simulasi CAT</span>
          <span className="text-xs text-gray-500 mt-1">Real-time timer</span>
        </button>

        <button 
          onClick={onOpenMateri}
          className="p-4 bg-blue-50 rounded-xl border border-blue-200 flex flex-col items-center justify-center hover:bg-blue-100 transition group"
        >
          <div className="bg-blue-500 p-3 rounded-full mb-2 shadow-sm group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-gray-800">Lanjut Belajar</span>
          <span className="text-xs text-gray-500 mt-1">Modul TIU #4</span>
        </button>
      </div>
    </div>
  );
};