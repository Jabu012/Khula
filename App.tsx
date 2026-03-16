
import React, { useState } from 'react';
import { AppView, PDFDocument, SubscriptionTier } from './types';
import { UI_ICONS } from './constants';
import PDFManager from './components/PDFManager';
import TutoringView from './components/TutoringView';
import ExamMode from './components/ExamMode';
import PricingTiers from './components/PricingTiers';
import AnalyticsView from './components/AnalyticsView';
import FlashcardsView from './components/FlashcardsView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionTier>(SubscriptionTier.FREE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [examWeaknesses, setExamWeaknesses] = useState<string>("");

  const selectedDocument = documents.find(d => d.id === selectedDocId);

  const handleUpload = (doc: PDFDocument) => {
    setDocuments(prev => [...prev, doc]);
    setSelectedDocId(doc.id);
    setErrorMsg(null);
    setActiveView(AppView.TUTORING);
  };

  const handleSelectDoc = (id: string) => {
    setSelectedDocId(id);
    setActiveView(AppView.TUTORING);
  };

  const handleDeleteDoc = (id: string) => {
    setDocuments(prev => {
      const newList = prev.filter(d => d.id !== id);
      if (newList.length === 0 || selectedDocId === id) {
        setSelectedDocId(null);
        if (activeView === AppView.TUTORING) setActiveView(AppView.DOCUMENTS);
      }
      return newList;
    });
  };

  const handleSelectPlan = (tier: SubscriptionTier) => {
    alert(`Redirecting to payment for ${tier}...`);
    setSubscription(tier);
    setActiveView(AppView.DASHBOARD);
  };

  const handleNavigateToFlashcards = (weaknesses: string) => {
    setExamWeaknesses(weaknesses);
    setActiveView(AppView.FLASHCARDS);
  };

  const tryEnterTutoring = () => {
    if (documents.length === 0) {
      setErrorMsg("Please upload a PDF to initialize the Tutoring Room.");
      setActiveView(AppView.DOCUMENTS);
      setTimeout(() => setErrorMsg(null), 5000);
      return;
    }
    if (!selectedDocId) {
      setErrorMsg("Select a material from your library to start tutoring.");
      setActiveView(AppView.DOCUMENTS);
      setTimeout(() => setErrorMsg(null), 5000);
      return;
    }
    setActiveView(AppView.TUTORING);
  };

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Overview', icon: UI_ICONS.Dashboard },
    { id: AppView.DOCUMENTS, label: 'Intelligence Hub', icon: UI_ICONS.Documents },
    { id: AppView.TUTORING, label: 'Tutoring Room', icon: UI_ICONS.Tutoring, requiresDoc: true },
    { id: AppView.EXAM_MODE, label: 'Exam Center', icon: UI_ICONS.Exam, requiresDoc: true },
    { id: AppView.FLASHCARDS, label: 'Study Cards', icon: UI_ICONS.Flashcards, requiresDoc: true },
    { id: AppView.ANALYTICS, label: 'Growth Tracking', icon: UI_ICONS.Analytics },
    { id: AppView.PRICING, label: 'Membership', icon: UI_ICONS.Pricing },
  ];

  const isImmersive = activeView === AppView.TUTORING;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-indigo-500/30">
      {!isImmersive && (
        <aside className="hidden md:flex w-80 bg-slate-900 border-r border-slate-800 flex-col transition-all duration-500 ease-in-out shrink-0">
          <div className="p-10">
            <h1 className="text-4xl font-black tracking-tighter flex items-center space-x-3 bg-gradient-to-br from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              <img src="/logo.svg" alt="Khula Logo" className="w-12 h-12 rounded-2xl shadow-xl shadow-indigo-600/20 shrink-0" />
              <span>Khula</span>
            </h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2 ml-1">Academic AI Avatar</p>
          </div>
          
          <nav className="flex-1 px-6 space-y-2 overflow-y-auto chat-scroll">
            {navItems.map(item => {
              const isDisabled = item.requiresDoc && documents.length === 0;
              return (
                <button
                  key={item.id}
                  onClick={() => isDisabled ? tryEnterTutoring() : setActiveView(item.id)}
                  className={`
                    w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[13px] font-bold transition-all duration-300
                    ${activeView === item.id 
                      ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 translate-x-1' 
                      : isDisabled 
                        ? 'text-slate-600 cursor-not-allowed opacity-50'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100 hover:translate-x-1'}
                  `}
                >
                  <div className="flex items-center space-x-4">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {isDisabled && <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                </button>
              );
            })}
          </nav>

          <div className="p-6 m-6 rounded-3xl bg-slate-950/50 border border-slate-800 shadow-inner">
             <div className="flex items-center justify-between mb-3">
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Syllabus Grounding</span>
               <span className="text-[10px] px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-black border border-emerald-500/20">{subscription}</span>
             </div>
             <p className="text-[11px] text-slate-400 font-medium mb-3">{documents.length} Materials Tracked</p>
             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
               <div className="bg-indigo-500 h-full transition-all duration-1000 ease-out" style={{ width: `${Math.min((documents.length / 5) * 100, 100)}%` }}></div>
             </div>
          </div>
        </aside>
      )}

      <div role="main" className="flex-1 overflow-y-auto relative bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent">
        {errorMsg && (
          <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-sm uppercase tracking-widest animate-in slide-in-from-top-4 duration-300">
            {errorMsg}
          </div>
        )}

        {!isImmersive && (
          <header className="h-24 px-10 flex items-center justify-between sticky top-0 bg-slate-950/60 backdrop-blur-xl z-20 border-b border-slate-900/50">
            <div className="flex flex-col">
               <h2 className="text-2xl font-black capitalize tracking-tight">{activeView.replace('_', ' ')}</h2>
               <p className="text-xs text-slate-500 font-medium">Personalized Digital Tutoring Environment</p>
            </div>
            <div className="flex items-center space-x-4 bg-slate-900/50 rounded-2xl p-2.5 pr-6 border border-slate-800">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500"></div>
               <div className="flex flex-col">
                  <span className="text-sm font-black">Student Scholar</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Academic Level 12</span>
               </div>
            </div>
          </header>
        )}

        <div className={isImmersive ? "" : "p-10"}>
          {activeView === AppView.DASHBOARD && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="relative overflow-hidden bg-indigo-600 rounded-[2.5rem] p-12 text-white shadow-2xl shadow-indigo-600/30">
                  <div className="relative z-10 max-w-2xl space-y-4">
                    <h2 className="text-5xl font-black leading-tight break-words">Ready to Master Your Syllabus?</h2>
                    <p className="text-indigo-100 text-lg font-medium opacity-90 leading-relaxed break-words">
                      {documents.length > 0 
                        ? `You have ${documents.length} materials ready. Select one to start your conversation.`
                        : "Start by uploading your materials in the Intelligence Hub to activate your AI Tutor."}
                    </p>
                    <button 
                      onClick={() => setActiveView(AppView.DOCUMENTS)}
                      className="mt-4 px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl shadow-black/10"
                    >
                      {documents.length > 0 ? 'View Library' : 'Upload Material'}
                    </button>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { 
                      view: AppView.DOCUMENTS, 
                      icon: UI_ICONS.Documents, 
                      color: 'indigo', 
                      title: 'Intelligence Hub', 
                      desc: 'Ground your tutor in your personal notes, research papers, or textbooks with seamless extraction.' 
                    },
                    { 
                      view: AppView.EXAM_MODE, 
                      icon: UI_ICONS.Exam, 
                      color: 'purple', 
                      title: 'Exam Mode', 
                      desc: 'Simulate high-pressure exam conditions using questions derived strictly from your grounded materials.' 
                    },
                    { 
                      view: AppView.FLASHCARDS, 
                      icon: UI_ICONS.Flashcards, 
                      color: 'blue', 
                      title: 'Flashcards', 
                      desc: 'Deploy active recall techniques with study cards tailored specifically to identified weak concepts.' 
                    }
                  ].map((card, i) => {
                    const isDisabled = documents.length === 0 && card.view !== AppView.DOCUMENTS;
                    return (
                      <div 
                        key={i}
                        className={`bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 flex flex-col transition-all cursor-pointer shadow-xl min-h-[300px] ${isDisabled ? 'opacity-50 grayscale' : `hover:border-${card.color}-500/50 hover:bg-slate-800/40`}`}
                        onClick={() => !isDisabled ? setActiveView(card.view) : tryEnterTutoring()}
                      >
                        <div className={`w-14 h-14 bg-${card.color}-500/10 text-${card.color}-400 rounded-2xl flex items-center justify-center mb-8 shrink-0`}>
                          {card.icon}
                        </div>
                        <h3 className="text-2xl font-black mb-4 break-words">{card.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 break-words flex-grow">{card.desc}</p>
                      </div>
                    );
                  })}
               </div>
            </div>
          )}

          {activeView === AppView.DOCUMENTS && (
            <PDFManager 
              documents={documents} 
              onUpload={handleUpload} 
              onDelete={handleDeleteDoc}
              onSelect={handleSelectDoc}
              selectedDocId={selectedDocId}
            />
          )}

          {activeView === AppView.TUTORING && selectedDocument && (
            <div className="animate-in zoom-in-95 duration-500 h-full">
              <button 
                onClick={() => setActiveView(AppView.DASHBOARD)}
                className="absolute top-8 left-8 z-50 p-4 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 rounded-2xl text-slate-400 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <TutoringView 
                document={selectedDocument} 
                onNavigateToExam={() => setActiveView(AppView.EXAM_MODE)} 
              />
            </div>
          )}

          {activeView === AppView.EXAM_MODE && (
            <ExamMode 
              documents={documents} 
              onNavigateToFlashcards={handleNavigateToFlashcards}
            />
          )}
          
          {activeView === AppView.FLASHCARDS && (
            <FlashcardsView 
              documents={documents} 
              weaknesses={examWeaknesses} 
            />
          )}

          {activeView === AppView.ANALYTICS && <AnalyticsView />}
          {activeView === AppView.PRICING && <PricingTiers onSelect={handleSelectPlan} />}
        </div>
      </div>
    </div>
  );
};

export default App;