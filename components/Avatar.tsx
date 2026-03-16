
import React from 'react';

interface AvatarProps {
  isThinking: boolean;
  isSpeaking: boolean;
  isListening: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ isThinking, isSpeaking, isListening }) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-10">
      <div className="relative group">
        {/* Floating Animation Wrapper */}
        <div className="animate-[float_6s_easeInOut_infinite] relative">
          
          {/* Particles */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}></div>
          ))}

          {/* Enhanced Glowing Aura */}
          <div className={`
            absolute -inset-6 rounded-full blur-[40px] transition-all duration-700 opacity-60
            ${isSpeaking ? 'bg-indigo-500 scale-110' : isListening ? 'bg-emerald-500 scale-110' : isThinking ? 'bg-amber-500 animate-pulse' : 'bg-indigo-500/30'}
          `}></div>
          
          {/* Rotating Border Effect */}
          <div className={`
            absolute -inset-2 rounded-full border-2 border-transparent border-t-indigo-500 border-b-emerald-500 animate-spin-slow
            ${isThinking ? 'border-t-amber-500 border-b-amber-500' : ''}
          `}></div>

          {/* Main Circular Avatar */}
          <div className={`
            relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl z-10 border-4 border-slate-950
            transition-all duration-500 bg-slate-900 animate-heartbeat
          `}>
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] animate-scanline z-20 pointer-events-none"></div>
            
            <img 
              src="https://lh3.googleusercontent.com/d/1s_xu9XQNrw_tpA0JTpRh8DO-NXT_8njT" 
              alt="Khula AI Tutor" 
              className={`w-full h-full object-cover transition-all duration-1000 ${isSpeaking ? 'scale-110 contrast-125 brightness-110' : 'scale-100'} hover:scale-110`}
            />
            
            {/* Interaction States Overlays */}
            {isThinking && (
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s] shadow-[0_0_15px_rgba(251,191,36,0.8)]"></div>
                  <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s] shadow-[0_0_15px_rgba(251,191,36,0.8)]"></div>
                  <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(251,191,36,0.8)]"></div>
                </div>
              </div>
            )}
            
            {/* Voice Activity Overlay */}
            {isSpeaking && (
              <div className="absolute inset-x-0 bottom-8 flex justify-center space-x-2 h-10 items-end px-12">
                {[1, 2, 3, 4, 3, 2, 1, 2, 4, 3].map((h, i) => (
                  <div key={i} className="w-2 bg-indigo-400 rounded-full animate-[pulse_0.6s_infinite] shadow-[0_0_10px_rgba(129,140,248,0.8)]" style={{ height: `${h * 20}%`, animationDelay: `${i * 0.08}s` }}></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center relative z-10 mt-12">
        <h3 className="text-4xl font-black tracking-tight text-white mb-2 drop-shadow-2xl animate-pulse">
          Khula
        </h3>
        <p className={`
          text-[12px] font-black uppercase tracking-[0.5em] transition-colors duration-500 drop-shadow-md
          ${isSpeaking ? 'text-indigo-400' : isListening ? 'text-emerald-400' : isThinking ? 'text-amber-500' : 'text-slate-500'}
        `}>
          {isThinking ? 'Reflecting...' : isSpeaking ? 'Speaking' : isListening ? 'Listening' : 'Ready'}
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(3deg); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.05); }
          30% { transform: scale(1); }
          45% { transform: scale(1.05); }
          60% { transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Avatar;