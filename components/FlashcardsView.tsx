
import React, { useState, useEffect } from 'react';
import { PDFDocument, FlashCard } from '../types';
import { generateFlashcards } from '../services/geminiService';

interface FlashcardsViewProps {
  documents: PDFDocument[];
  weaknesses?: string;
}

const FlashcardsView: React.FC<FlashcardsViewProps> = ({ documents, weaknesses = "" }) => {
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (documents.length > 0) {
      loadCards();
    }
  }, [documents]);

  const loadCards = async () => {
    setIsLoading(true);
    try {
      const context = documents.map(d => d.content).join('\n');
      const generated = await generateFlashcards(context, weaknesses);
      setCards(generated);
      setCurrentIdx(0);
      setFlipped(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12 animate-in fade-in duration-700">
         <div className="p-10 bg-slate-900 rounded-[3rem] border border-slate-800 mb-8 text-slate-700 shadow-2xl">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" /></svg>
         </div>
         <h2 className="text-3xl font-black text-white tracking-tight uppercase">Active Recall Engine</h2>
         <p className="text-slate-500 mt-4 max-w-sm mx-auto text-base font-medium leading-relaxed break-words">Ground your neural hub with academic material to generate personalized recall cards.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 blur-xl bg-indigo-500/10 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.4em] animate-pulse">Encoding Active Recall Cards...</p>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-60">Syllabus Synthesis in Progress</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) return null;

  const card = cards[currentIdx];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 flex flex-col items-center space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Neural Recall Hub</h2>
        <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
          <p className="text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase">
            {weaknesses ? 'Weakness-Targeted Session' : 'Comprehensive Module Mastery'}
          </p>
        </div>
      </div>

      <div 
        className="group relative w-full max-w-2xl h-[350px] md:h-[450px] [perspective:1000px] cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
          {/* Front Face */}
          <div className="absolute inset-0 bg-slate-900 border-2 border-slate-800 rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center shadow-[0_30px_100px_-15px_rgba(0,0,0,0.6)] [backface-visibility:hidden] overflow-y-auto chat-scroll">
            <span className="absolute top-10 text-[11px] font-black text-indigo-500 uppercase tracking-[0.4em] opacity-80">Knowledge Query</span>
            <div className="flex flex-col items-center justify-center w-full px-4 h-full">
               <p className="text-2xl md:text-3xl font-black text-slate-100 leading-tight tracking-tight break-words whitespace-pre-wrap">{card.front}</p>
            </div>
            <div className="absolute bottom-10 flex items-center space-x-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-950/50 px-5 py-2 rounded-full border border-slate-800">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
               <span>Tap to decode answer</span>
            </div>
          </div>

          {/* Back Face */}
          <div className="absolute inset-0 bg-indigo-600 border-2 border-indigo-400 rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-y-auto chat-scroll">
            <span className="absolute top-10 text-[11px] font-black text-indigo-100 uppercase tracking-[0.4em] opacity-80">Grounded Logic</span>
            <div className="flex flex-col items-center justify-center w-full px-4 h-full">
               <p className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight break-words whitespace-pre-wrap">{card.back}</p>
            </div>
            <div className="absolute bottom-10 flex items-center space-x-3 text-[10px] font-bold text-indigo-200 uppercase tracking-widest bg-black/20 px-5 py-2 rounded-full border border-indigo-500/30">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
               <span>Concept Reviewed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-16">
        <button onClick={handlePrev} className="p-7 bg-slate-900 border border-slate-800 rounded-[2rem] hover:bg-slate-800 transition-all active:scale-90 shadow-2xl group">
          <svg className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-lg font-black text-white tracking-widest">{currentIdx + 1}</span>
          <div className="w-10 h-0.5 bg-indigo-500 rounded-full opacity-50"></div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">of {cards.length}</span>
        </div>
        <button onClick={handleNext} className="p-7 bg-slate-900 border border-slate-800 rounded-[2rem] hover:bg-slate-800 transition-all active:scale-90 shadow-2xl group">
          <svg className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <button 
        onClick={loadCards}
        className="px-16 py-6 bg-slate-900 border border-slate-800 text-slate-400 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-slate-800 hover:text-white transition-all shadow-2xl active:scale-95"
      >
        Regenerate Neural Deck
      </button>
    </div>
  );
};

export default FlashcardsView;