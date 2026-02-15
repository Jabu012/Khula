
import React from 'react';

interface AvatarProps {
  isThinking: boolean;
  isSpeaking: boolean;
  isListening: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ isThinking, isSpeaking, isListening }) => {
  return (
    <div className="relative flex flex-col items-center justify-center space-y-8 py-10">
      <div className="relative group">
        {/* Floating Animation Wrapper */}
        <div className="animate-[float_6s_easeInOut_infinite] relative">
          {/* Dynamic Aura Glow */}
          <div className={`
            absolute -inset-10 rounded-full blur-[60px] transition-all duration-1000 opacity-25
            ${isSpeaking ? 'bg-indigo-500 scale-125' : ''}
            ${isListening ? 'bg-emerald-500 scale-125' : ''}
            ${isThinking ? 'bg-amber-500 animate-pulse' : 'bg-indigo-500/10'}
          `}></div>
          
          <div className={`
            relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 shadow-2xl z-10
            ${isSpeaking ? 'border-indigo-500' : 'border-slate-800'}
            ${isListening ? 'border-emerald-500' : ''}
            ${isThinking ? 'border-amber-500/50' : ''}
            transition-all duration-500 bg-slate-900
          `}>
            {/* Reverted to professional portrait image */}
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600" 
              alt="Khula AI Tutor" 
              className={`w-full h-full object-cover transition-all duration-1000 ${isSpeaking ? 'scale-110 contrast-110' : 'scale-100'}`}
            />
            
            {/* Interaction States Overlays */}
            {isThinking && (
              <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] flex items-center justify-center">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s] shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s] shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
                </div>
              </div>
            )}
            
            {/* Voice Activity Overlay */}
            {isSpeaking && (
              <div className="absolute inset-x-0 bottom-6 flex justify-center space-x-1.5 h-8 items-end px-16">
                {[1, 2, 3, 4, 3, 2, 1, 2, 4, 3].map((h, i) => (
                  <div key={i} className="w-1.5 bg-white/90 rounded-full animate-[pulse_0.8s_infinite] shadow-sm" style={{ height: `${h * 18}%`, animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status Indicator */}
        <div className={`
          absolute bottom-6 right-6 w-8 h-8 rounded-full border-4 border-slate-950 z-20 transition-all duration-500 flex items-center justify-center
          ${isSpeaking ? 'bg-indigo-500 shadow-indigo-500/50 shadow-lg' : isListening ? 'bg-emerald-500 shadow-emerald-500/50 shadow-lg' : isThinking ? 'bg-amber-500 shadow-amber-500/50 shadow-lg animate-pulse' : 'bg-slate-700'}
        `}>
          {isListening && <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></div>}
        </div>
      </div>
      
      <div className="text-center relative z-10">
        <h3 className="text-3xl font-black tracking-tight text-white mb-1 drop-shadow-xl">
          Khula AI Tutor
        </h3>
        <p className={`
          text-[11px] font-black uppercase tracking-[0.4em] transition-colors duration-500 drop-shadow-md
          ${isSpeaking ? 'text-indigo-400' : isListening ? 'text-emerald-400' : isThinking ? 'text-amber-500' : 'text-slate-500'}
        `}>
          {isThinking ? 'Analyzing Syllabus' : isSpeaking ? 'Transmitting Instruction' : isListening ? 'Awaiting Input' : 'Neural Hub Active'}
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Avatar;
