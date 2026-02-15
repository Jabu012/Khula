
import React, { useState, useEffect, useRef } from 'react';
import Avatar from './Avatar';
import { Message, PDFDocument } from '../types';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createPcmBlob, decode, decodeAudioData } from '../services/geminiService';
import { KHULA_SYSTEM_INSTRUCTION } from '../constants';

interface TutoringViewProps {
  document: PDFDocument;
  onNavigateToExam: () => void;
}

const TutoringView: React.FC<TutoringViewProps> = ({ document, onNavigateToExam }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [currentTranscription, setCurrentTranscription] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, currentTranscription]);

  useEffect(() => {
    startSession();
    return () => {
      if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then(session => session.close());
      }
    };
  }, [document.id]);

  const startSession = async () => {
    if (isLiveActive) return;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputAudioContext;
      outputNodeRef.current = outputAudioContext.createGain();
      outputNodeRef.current.connect(outputAudioContext.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      let activeSessionPromise: Promise<any>;

      activeSessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsLiveActive(true);
            setIsListening(true);
            
            const mediaSource = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              activeSessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            mediaSource.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);

            // Immediate professional introduction using analysis metadata
            activeSessionPromise.then((session) => {
              session.sendRealtimeInput({ 
                text: `MANDATORY SESSION START: 
                1. Introduce yourself as Khula AI Tutor.
                2. Inform the student: 'I have successfully analyzed "${document.name}" and fully mapped out its core syllabus.'
                3. Use the document summary: "${document.summary || 'Academic Resource Analysis complete.'}"
                4. Invite interaction professionally: 'We are ready to master these concepts. What specific topic or problem from this material should we tackle first?'` 
              });
            });
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn) {
              setIsThinking(false);
            } else if (message.serverContent?.turnComplete) {
              setIsThinking(false);
              if (currentTranscription.trim()) {
                setMessages(prev => [...prev, { role: 'model', text: currentTranscription, timestamp: new Date() }]);
              }
              setCurrentTranscription('');
            } else if (message.serverContent?.inputTranscription) {
              setIsThinking(true);
              setCurrentTranscription(prev => prev + message.serverContent.inputTranscription.text);
            }

            if (message.serverContent?.outputTranscription) {
              setCurrentTranscription(prev => prev + message.serverContent.outputTranscription.text);
            }

            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current.values()) {
                try { source.stop(); } catch(e) {}
              }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
              setIsThinking(false);
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setIsSpeaking(true);
              setIsThinking(false);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
              const source = outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNodeRef.current!);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }
          },
          onerror: (e) => {
            console.error('Live session error:', e);
            setIsLiveActive(false);
          },
          onclose: () => {
            setIsLiveActive(false);
            setIsListening(false);
            setIsSpeaking(false);
            setIsThinking(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          systemInstruction: KHULA_SYSTEM_INSTRUCTION + ` \n\nCURRENT ACADEMIC CONTENT FOR STUDY: ${document.content}`,
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        }
      });

      sessionPromiseRef.current = activeSessionPromise;
    } catch (err) {
      console.error("Critical error starting tutor session:", err);
    }
  };

  const endSession = () => {
    if (sessionPromiseRef.current) {
      sessionPromiseRef.current.then(session => session.close());
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden relative">
      <div className="w-[400px] flex flex-col bg-slate-900 border-r border-slate-800 shadow-2xl z-20">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h3 className="text-xl font-black flex items-center space-x-3 text-slate-100">
              <span className={`w-3 h-3 rounded-full ${isLiveActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`}></span>
              <span>Tutoring Room</span>
            </h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Material: {document.name}</p>
          </div>
        </div>
        
        <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 chat-scroll scroll-smooth">
          {messages.length === 0 && !currentTranscription && (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center space-y-4 opacity-40">
              <div className="p-8 bg-slate-950 rounded-[2rem] border border-slate-800">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </div>
              <p className="text-xs font-black uppercase tracking-widest leading-relaxed text-center">Khula is synced and listening...</p>
            </div>
          )}
          
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[90%] p-4 rounded-[1.5rem] text-[12px] font-medium leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50'}`}>
                {m.text}
              </div>
            </div>
          ))}

          {currentTranscription && (
            <div className="flex justify-start animate-in fade-in duration-300">
               <div className="max-w-[90%] p-4 bg-slate-800/40 border border-slate-700/20 rounded-[1.5rem] rounded-tl-none text-[12px] text-slate-400 italic leading-relaxed whitespace-pre-wrap">
                 {currentTranscription}...
               </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-950/20">
           <button 
             onClick={() => {
               endSession();
               onNavigateToExam();
             }}
             className="w-full py-5 bg-purple-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-purple-600/30 hover:bg-purple-500 hover:scale-[1.02] active:scale-95"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <span>Enter Exam Mastery Center</span>
           </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-600/10 via-slate-950 to-slate-950">
        <div className="w-full max-w-xl mb-12 transform scale-125 transition-all duration-1000">
           <Avatar isThinking={isThinking} isSpeaking={isSpeaking} isListening={isListening} />
        </div>

        <div className="flex items-center space-x-12 mt-20">
          <div className={`p-10 rounded-full border-4 transition-all duration-500 shadow-2xl ${isSpeaking ? 'border-indigo-500 bg-indigo-500/10 shadow-indigo-500/20' : isListening ? 'border-emerald-500 bg-emerald-500/10 shadow-emerald-500/20' : 'border-slate-800 bg-slate-900'}`}>
             <div className="w-16 h-16 flex items-center justify-center">
               {isSpeaking ? (
                  <div className="flex space-x-1.5 items-end h-8">
                    {[1, 2, 3, 4, 3, 2, 1, 2, 4, 3].map((h, i) => (
                      <div key={i} className="w-1.5 bg-indigo-400 rounded-full animate-pulse" style={{ height: `${h * 10}%`, animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
               ) : isListening ? (
                  <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
               ) : (
                  <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
               )}
             </div>
          </div>

          <button onClick={endSession} className="group p-8 bg-red-600/10 border border-red-500/30 text-red-500 rounded-[2rem] hover:bg-red-600 hover:text-white transition-all shadow-2xl active:scale-90">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="absolute top-12 px-6 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-full flex items-center space-x-3 shadow-xl">
           <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse ${isThinking ? 'bg-amber-500 shadow-amber-500' : 'bg-indigo-500'}`}></div>
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
             {isThinking ? 'Khula: Reflecting...' : 'Professional Academic Session'}
           </span>
        </div>

        <div className="absolute bottom-12 px-8 py-4 bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl flex items-center space-x-6 shadow-2xl">
           <div className="flex flex-col text-center">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Digital Mentor Active</span>
              <span className="text-xs font-bold text-slate-200">Grounded in Academic Metadata</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringView;
