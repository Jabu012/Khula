
import React from 'react';

const AnalyticsView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <div className="flex flex-col space-y-2">
         <h2 className="text-4xl font-black tracking-tight">Growth Tracking</h2>
         <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Real-time Academic Intelligence correlating study sessions with performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: 'Syllabus Mastery', value: '78%', color: 'text-indigo-400', trend: '+12% this week' },
          { label: 'Intellectual Depth', value: 'Level 4', color: 'text-emerald-400', trend: 'Advancing fast' },
          { label: 'Recall Efficiency', value: '92%', color: 'text-purple-400', trend: 'Top 5% of users' },
          { label: 'Materials Synthesized', value: '12', color: 'text-blue-400', trend: '2.4k pages total' },
        ].map(stat => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-xl hover:border-slate-600 transition-all group">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className={`text-4xl font-black ${stat.color} mb-3`}>{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight group-hover:text-slate-400 transition-colors">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
             <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
             </div>
          </div>
          <h3 className="text-2xl font-black mb-10 tracking-tight">Active Concept Mastery</h3>
          <div className="space-y-8">
            {[
              { topic: 'Molecular Biology', progress: 92, color: 'bg-emerald-500' },
              { topic: 'Organic Chemistry', progress: 64, color: 'bg-indigo-500' },
              { topic: 'Quantum Mechanics', progress: 41, color: 'bg-purple-500' },
              { topic: 'Macroeconomics', progress: 88, color: 'bg-blue-500' },
            ].map(item => (
              <div key={item.topic} className="group cursor-help">
                <div className="flex justify-between text-[11px] mb-3 uppercase tracking-widest font-black text-slate-500 group-hover:text-slate-300 transition-colors">
                  <span>{item.topic}</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className={`h-full ${item.color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent"></div>
          <div className="relative">
             <div className="w-40 h-40 rounded-full border-2 border-slate-800 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
          </div>
          <div className="space-y-2 relative">
             <h3 className="text-2xl font-black tracking-tight">Predictive Insight Engine</h3>
             <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium leading-relaxed">Correlating your flashcard recall latency with session engagement to predict exam readiness.</p>
          </div>
          <button className="px-8 py-3 bg-slate-800 text-white rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-700 hover:bg-slate-700 transition-all relative">Generate Detailed Report</button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
