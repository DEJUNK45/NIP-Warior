import React, { useState } from 'react';
import { Play, BookOpen, ChevronRight, Search, CheckCircle, Circle } from 'lucide-react';
import { STUDY_MATERIALS } from '../constants';

export const StudyMaterials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = STUDY_MATERIALS.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.desc.toLowerCase().includes(term) ||
      item.modules.some((mod) => mod.title.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-4 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Materi Belajar</h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition shadow-sm"
          placeholder="Cari materi, topik, atau modul..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredMaterials.length > 0 ? (
        filteredMaterials.map((item) => {
          // Calculate progress dynamically based on completed modules
          const totalModules = item.modules.length;
          const completedModules = item.modules.filter(m => m.completed).length;
          const calculatedProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

          return (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className={`p-4 ${item.color} bg-opacity-20 flex justify-between items-center`}>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-xs opacity-80 mb-2">{item.desc}</p>
                </div>
                <div className="text-right flex flex-col items-end min-w-[120px]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{calculatedProgress}%</span>
                  </div>
                  <span className="text-xs font-bold mb-2 opacity-90">
                    {completedModules}/{totalModules} Modul Selesai
                  </span>
                  <div className="w-full bg-white/50 h-1.5 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-current opacity-80 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${calculatedProgress}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {item.modules.map((mod, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center transition group">
                    <div className="flex items-center gap-3">
                      {/* Status Indicator (Checkbox style) */}
                      <div className="mr-1">
                        {mod.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500 fill-green-50" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition" />
                        )}
                      </div>

                      <div className={`p-2 rounded-lg ${mod.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {mod.type === 'Video' ? (
                          <Play className={`w-4 h-4 ${mod.completed ? 'text-green-600' : 'text-blue-500'}`} />
                        ) : (
                          <BookOpen className={`w-4 h-4 ${mod.completed ? 'text-green-600' : 'text-orange-500'}`} />
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${mod.completed ? 'text-gray-500 line-through decoration-gray-400' : 'text-gray-800'}`}>
                          {mod.title}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          {mod.type} • {mod.duration}
                        </p>
                      </div>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition" />
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">Tidak ada materi yang cocok dengan pencarianmu.</p>
          <p className="text-xs text-gray-400 mt-1">Coba kata kunci lain seperti "TWK" atau "Logika".</p>
        </div>
      )}
    </div>
  );
};