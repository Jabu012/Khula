
import React, { useState } from 'react';
import { PDFDocument } from '../types';
import { analyzePDF } from '../services/geminiService';

interface PDFManagerProps {
  onUpload: (doc: PDFDocument) => void;
  documents: PDFDocument[];
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  selectedDocId: string | null;
}

const PDFManager: React.FC<PDFManagerProps> = ({ onUpload, documents, onDelete, onSelect, selectedDocId }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress("Analyzing Material via Intelligence Engine...");
    
    try {
      const result = await analyzePDF(file);
      
      const newDoc: PDFDocument = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        content: result.fullContent,
        uploadDate: new Date(),
        summary: result.summary,
        topics: result.topics
      };
      
      onUpload(newDoc);
    } catch (err) {
      console.error("PDF Analysis Failed:", err);
      alert("Failed to analyze the academic material. Please try a different PDF.");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-6 animate-in fade-in duration-700">
      <div className="bg-slate-900 rounded-[3rem] border border-slate-800 p-16 text-center space-y-8 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative inline-flex p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 group-hover:scale-110 transition-transform">
          <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight break-words">Intelligence Hub</h2>
          <p className="text-slate-400 text-lg leading-relaxed font-medium break-words">Upload your academic materials. Khula's Engine will extract, structure, and index every concept for your personalized session.</p>
        </div>
        
        {isUploading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
            </div>
            <p className="text-indigo-400 font-black text-xs uppercase tracking-widest">{uploadProgress}</p>
          </div>
        ) : (
          <label className="relative inline-block px-12 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-sm uppercase tracking-widest cursor-pointer transition-all active:scale-95 shadow-xl shadow-indigo-600/20">
            Upload Study Material
            <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} disabled={isUploading} />
          </label>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] ml-4">Grounded Knowledge Library</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.length === 0 && !isUploading && (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-800 rounded-[3rem] opacity-30">
              <p className="text-sm font-bold uppercase tracking-widest">Library Empty - Awaiting Academic Context</p>
            </div>
          )}
          {documents.map(doc => (
            <div key={doc.id} className={`bg-slate-900 border ${selectedDocId === doc.id ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-indigo-500/10' : 'border-slate-800'} rounded-[2.5rem] p-8 flex flex-col transition-all hover:border-slate-600 shadow-xl min-h-[380px] overflow-hidden`}>
              <div className="flex items-start justify-between mb-8 shrink-0">
                <div className="flex items-center space-x-5 min-w-0 flex-1">
                  <div className={`p-4 bg-slate-950 rounded-2xl text-slate-400 transition-colors shrink-0 ${selectedDocId === doc.id ? 'text-indigo-500 bg-indigo-500/5' : ''}`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-black text-slate-100 text-lg leading-tight break-words line-clamp-2" title={doc.name}>{doc.name}</h4>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mt-1">Neural Analyzed</p>
                  </div>
                </div>
                <button onClick={() => onDelete(doc.id)} className="p-2 text-slate-700 hover:text-red-500 rounded-xl transition-colors shrink-0 ml-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
              
              <div className="flex-grow space-y-4 overflow-hidden mb-8">
                 <p className="text-[13px] text-slate-400 font-medium leading-relaxed break-words line-clamp-4 min-h-[4rem]">{doc.summary}</p>
                 <div className="flex flex-wrap gap-2 pt-2">
                    {doc.topics?.slice(0, 4).map(t => (
                      <span key={t} className="px-2.5 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-lg border border-slate-700/50 uppercase tracking-tighter truncate max-w-full">{t}</span>
                    ))}
                 </div>
              </div>

              <button 
                onClick={() => onSelect(doc.id)}
                className={`w-full py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] transition-all shrink-0
                  ${selectedDocId === doc.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}
                `}
              >
                {selectedDocId === doc.id ? 'Sync Active - Enter Room' : 'Deploy Session'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDFManager;