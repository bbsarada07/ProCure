'use client';

import { useState } from 'react';
import { extractCriteria } from '@/lib/api';
import { Sparkles, UploadCloud, Terminal, Loader2 } from 'lucide-react';

export default function TenderUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [criteria, setCriteria] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setCriteria(null);
    try {
      const result = await extractCriteria(file);
      setCriteria(result);
      console.log('Extracted criteria:', result);
    } catch (error) {
      console.error('Extraction error:', error);
      alert('Failed to extract criteria. Make sure the backend is running and the API key is valid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-white rounded-xl border border-stone-200 relative overflow-hidden defense-shadow watermark">
      <div className="relative z-10">
        <h2 className="text-xl font-serif font-black mb-6 text-slate-900 uppercase tracking-tight">Strategic Document Ingestion</h2>
      
        <div className="flex flex-col gap-4">
          <div className="relative group">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-[10px] font-mono font-black uppercase tracking-[0.2em] text-slate-400
                file:mr-4 file:py-3 file:px-6
                file:rounded file:border file:border-stone-200
                file:text-[9px] file:font-mono file:font-black file:uppercase file:tracking-widest
                file:bg-[#020410] file:text-white
                hover:file:bg-[#0a1025] transition-all cursor-pointer shadow-xl"
            />
          </div>
          
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-[#020410] text-white px-8 py-4 rounded font-mono font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-[#0a1025] disabled:opacity-20 disabled:grayscale shadow-2xl hover:scale-[1.01] active:scale-95 glow-urgent"
          >
            {loading ? 'Executing Extraction Algorithm...' : 'Commence Intelligence Scan'}
          </button>
        </div>

        {criteria && (
          <div className="mt-8 p-6 bg-[#020410] rounded border border-white/5 animate-in fade-in slide-in-from-top-4 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Sparkles className="w-24 h-24 text-emerald-500" />
            </div>
            <div className="relative z-10">
              <h3 className="text-[9px] font-mono font-black mb-4 text-emerald-500 uppercase tracking-[0.3em] flex items-center justify-between">
                Extracted Technical Intelligence
                <span className="text-[8px] font-mono font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  SCANNED // 100%
                </span>
              </h3>
              <pre className="text-[10px] overflow-auto text-emerald-400/80 p-6 bg-black/40 rounded border border-white/5 font-mono leading-relaxed max-h-[500px]">
                {JSON.stringify(criteria, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
        <div className="w-64 h-64 bg-emerald-900 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
