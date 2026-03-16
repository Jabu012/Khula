
import React, { useState } from 'react';
import { PDFDocument, QuizQuestion } from '../types';
import { generateQuiz } from '../services/geminiService';

interface ExamModeProps {
  documents: PDFDocument[];
  onNavigateToFlashcards: (weaknesses: string) => void;
}

const ExamMode: React.FC<ExamModeProps> = ({ documents, onNavigateToFlashcards }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [incorrectTopics, setIncorrectTopics] = useState<string[]>([]);

  const startExam = async () => {
    if (documents.length === 0) return;
    setIsGenerating(true);
    setIncorrectTopics([]);
    try {
      const context = documents.map(d => d.content).join('\n');
      const quiz = await generateQuiz(context);
      setQuestions(quiz);
      setCurrentIdx(0);
      setScore(0);
      setIsCompleted(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    const q = questions[currentIdx];
    if (selectedAnswer === q.correctAnswer) {
      setScore(s => s + 1);
    } else {
      setIncorrectTopics(prev => [...prev, q.question]);
    }
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedAnswer(null);
    } else {
      setIsCompleted(true);
    }
  };

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 space-y-8 min-h-[60vh] animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center border border-slate-800 shadow-2xl">
          <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">Intelligence Hub Empty</h2>
          <p className="text-slate-500 text-base font-medium max-w-sm mx-auto leading-relaxed">Upload academic context to ground your AI Tutor before starting an assessment.</p>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 min-h-[60vh] animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 blur-xl bg-indigo-500/10 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.4em] animate-pulse">Synthesizing Course Data...</p>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-60">Mapping Conceptual Authorities</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-3xl mx-auto text-center space-y-12 py-10 animate-in zoom-in-95 duration-700">
        <div className="space-y-4">
          <div className="text-8xl font-black text-indigo-500 tracking-tighter leading-none drop-shadow-2xl">{percentage}%</div>
          <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[12px]">Assessment Efficiency Achieved</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-12 rounded-[3.5rem] shadow-2xl text-left space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <h3 className="font-black text-indigo-400 text-[11px] uppercase tracking-[0.3em]">Neural Feedback</h3>
          <p className="text-lg text-slate-300 leading-relaxed font-medium break-words whitespace-pre-wrap">
            {score === questions.length 
              ? "Excellence grounded. You have fully mapped the core curriculum of this module. Your neural retention is near-perfect for this material."
              : `A productive diagnostic checkpoint. You encountered resistance in ${incorrectTopics.length} specific conceptual areas. These have been indexed for your flashcard session.`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 px-10">
          <button 
            onClick={() => onNavigateToFlashcards(incorrectTopics.join('; '))}
            className="flex-1 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-[13px] uppercase tracking-[0.2em] hover:bg-indigo-500 shadow-2xl shadow-indigo-600/30 active:scale-95 transition-all"
          >
             Ground Flashcards
          </button>
          <button onClick={startExam} className="flex-1 py-6 bg-slate-800 text-slate-300 border border-slate-700 rounded-[2rem] font-black text-[13px] uppercase tracking-[0.2em] hover:bg-slate-700 active:scale-95 transition-all">Retry Session</button>
        </div>
      </div>
    );
  }

  if (questions.length > 0) {
    const q = questions[currentIdx];
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-8 animate-in slide-in-from-bottom-8 duration-700">
        <div className="flex justify-between items-end px-6">
          <div className="space-y-2">
             <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Checkpoint {currentIdx + 1} / {questions.length}</span>
             <div className="w-64 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                <div className="bg-indigo-500 h-full transition-all duration-700 shadow-lg shadow-indigo-500/40" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}></div>
             </div>
          </div>
          <div className="text-right">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1 opacity-70">Knowledge Score</span>
             <span className="text-2xl font-black text-white">{score} Matches</span>
          </div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-[3.5rem] p-12 md:p-16 space-y-12 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-black leading-tight text-white tracking-tight break-words whitespace-pre-wrap">
            {q.question}
          </h3>
          
          <div className="grid grid-cols-1 gap-5">
            {q.options.map((opt, i) => (
              <button 
                key={i}
                onClick={() => setSelectedAnswer(i)}
                className={`
                  w-full text-left p-7 rounded-[2rem] border transition-all duration-400 flex items-center space-x-6 relative group
                  ${selectedAnswer === i 
                    ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-2xl ring-1 ring-indigo-500/30' 
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-900 hover:text-slate-100 shadow-md'}
                `}
              >
                <span className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 transition-all duration-500 ${selectedAnswer === i ? 'bg-indigo-600 text-white scale-110 rotate-2 shadow-lg' : 'bg-slate-800 border border-slate-700 text-slate-500'}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-[16px] font-bold leading-relaxed break-words flex-1 pr-4">{opt}</span>
                {selectedAnswer === i && (
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 shrink-0">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <button 
            disabled={selectedAnswer === null}
            onClick={handleNext}
            className={`px-20 py-6 rounded-[2rem] font-black text-[14px] uppercase tracking-[0.3em] transition-all shadow-2xl ${selectedAnswer !== null ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-indigo-600/40' : 'bg-slate-900 text-slate-700 cursor-not-allowed border border-slate-800 opacity-40'}`}
          >
            {currentIdx === questions.length - 1 ? 'Analyze Mastery' : 'Proceed Checkpoint'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-12 min-h-[60vh] text-center max-w-2xl mx-auto py-12 animate-in fade-in duration-700">
      <div className="p-14 bg-indigo-600/10 rounded-[4rem] border border-indigo-500/20 shadow-2xl shadow-indigo-600/5 relative group">
         <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-10 group-hover:opacity-20 transition-all duration-700"></div>
         <svg className="w-20 h-20 text-indigo-500 relative transition-transform duration-700 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
      </div>
      <div className="space-y-5 px-6">
        <h2 className="text-5xl font-black tracking-tight text-white leading-tight break-words">Syllabus Mastery Diagnostic</h2>
        <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto break-words">Generate a custom academic assessment grounded strictly in your personal study materials to identify conceptual weak points.</p>
      </div>
      <button 
        onClick={startExam}
        className="px-16 py-6 bg-indigo-600 text-white rounded-[2.5rem] font-black text-[14px] uppercase tracking-[0.3em] transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-600/40"
      >
        Synthesize Assessment
      </button>
    </div>
  );
};

export default ExamMode;