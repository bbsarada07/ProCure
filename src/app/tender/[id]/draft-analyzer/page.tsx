'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UploadCloud, 
  FileWarning, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Info,
  Loader2,
  Terminal,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function DraftAnalyzerPage() {
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);
    setIsAnalyzed(false);

    // Simulate Intelligence Vetting Process
    setTimeout(() => {
      setIsUploading(false);
      setIsAnalyzed(true);
    }, 3000);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 watermark h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
        <div>
          <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight uppercase">Strategic Pre-Flight Vetting</h2>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">Vetting Draft Tenders for Restrictive Clauses // Security Mode</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-[#020410] text-white border-white/10 px-3 h-6 text-[9px] font-mono uppercase tracking-widest">Analyzer Engine: v2.4-SECURE</Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1 overflow-hidden">
        <div className="col-span-2 space-y-6 overflow-y-auto pr-2">
          {/* Ingestion Zone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileUpload}
              accept=".pdf,.docx,.csv"
            />
            <div className="absolute inset-0 bg-[#020410]/5 rounded border border-dashed border-stone-300 group-hover:border-emerald-500 transition-all" />
            <div className="relative flex flex-col items-center justify-center p-12 text-center min-h-[250px]">
              {isUploading ? (
                <div className="space-y-6 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                      <Terminal className="w-8 h-8 text-emerald-600 animate-pulse" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                      <Loader2 className="w-3 h-3 text-emerald-600 animate-spin" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-mono font-black text-slate-900 uppercase tracking-widest">Intelligence Extraction...</h3>
                    <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">Analyzing Node: {fileName}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-stone-100 rounded flex items-center justify-center mb-4 group-hover:bg-[#020410] group-hover:text-white transition-all shadow-xl">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-serif font-black text-slate-900 uppercase">
                    {fileName ? `NODE LOADED: ${fileName}` : 'Ingest Draft Tender for Analysis'}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tight mt-2 max-w-sm mx-auto">
                    {fileName ? 'Execute replacement algorithm to swap source.' : 'Drop .docx, .pdf, or .csv draft node for regulatory vetting.'}
                  </p>
                </>
              )}
            </div>
          </div>

          {isAnalyzed && (
            <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                <h3 className="text-[10px] font-mono font-black text-slate-900 uppercase tracking-[0.2em]">Intel Report Output</h3>
              </div>

              <div className="bg-[#020410] rounded-lg p-6 border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <AlertTriangle className="w-24 h-24 text-rose-500" />
                </div>
                <div className="relative z-10 flex gap-6">
                  <div className="p-3 bg-rose-500/10 rounded border border-rose-500/20 h-fit">
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20 text-[9px] font-mono uppercase h-4 px-1.5">Critical Anomaly</Badge>
                      <h4 className="text-xs font-serif font-black text-slate-100 uppercase tracking-tight">Restrictive Clause Detected</h4>
                    </div>
                    <p className="text-xs font-serif italic text-slate-400 leading-relaxed">
                      "Source document demands <span className="text-slate-100 font-bold underline decoration-white/20">ISO 27001 certification</span> but restricts the submission window to <span className="text-rose-400 font-bold font-mono">72 HOURS</span>. This configuration is highly correlated with non-competitive outcomes."
                    </p>
                    <div className="p-3 bg-white/5 rounded border border-white/10">
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Impact Analysis</p>
                      <p className="text-[11px] font-serif text-slate-300 leading-tight">
                        Violates GFR Section 144. High probability of administrative appeal or failed audit due to perceived vendor bias.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <Button className="h-8 bg-emerald-700 hover:bg-emerald-800 text-white text-[9px] font-mono uppercase tracking-widest px-4 shadow-xl glow-urgent">
                        Auto-Remediate Node
                      </Button>
                      <Button variant="ghost" className="h-8 text-[9px] font-mono uppercase tracking-widest text-slate-500 hover:text-white">
                        IGNORE FLAG
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-md rounded-lg p-6 border border-stone-200 shadow-sm flex items-start gap-6">
                <div className="p-3 bg-emerald-50 rounded border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-mono uppercase h-4 px-1.5">Compliance Verified</Badge>
                    <h4 className="text-xs font-serif font-black text-slate-900 uppercase">Statutory Preferences Secure</h4>
                  </div>
                  <p className="text-[11px] font-serif italic text-slate-600 leading-relaxed font-medium">
                    GST and MSME Preferences (Make-in-India) have been correctly mapped as per current Ministry of Finance guidelines.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="bg-[#020410] text-slate-300 border-white/5 shadow-2xl overflow-hidden defense-shadow">
            <CardHeader className="bg-white/5 border-b border-white/5 py-4">
              <CardTitle className="text-xs font-mono font-black uppercase tracking-[0.2em] text-slate-500">Analyzer Metrology</CardTitle>
              <CardDescription className="text-[9px] font-mono uppercase text-slate-600">Current Session Metrics</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-mono font-black uppercase tracking-widest text-slate-500">
                  <span>Compliance Integrity</span>
                  <span className="text-emerald-500 font-bold">72%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[72%] transition-all duration-1000 shadow-glow-emerald" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="space-y-1">
                  <div className="text-2xl font-mono font-black text-slate-100 tracking-tighter leading-none">12</div>
                  <div className="text-[9px] font-mono font-black text-slate-600 uppercase tracking-widest">Nodes Scanned</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-mono font-black text-rose-500 tracking-tighter leading-none">01</div>
                  <div className="text-[9px] font-mono font-black text-slate-600 uppercase tracking-widest">Risks Isolated</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-stone-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Globe className="w-16 h-16" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-3.5 h-3.5 text-emerald-600" />
              <h4 className="text-[9px] font-mono font-black text-slate-900 uppercase tracking-[0.2em]">Network Intelligence</h4>
            </div>
            <p className="text-[11px] font-serif italic text-slate-600 leading-relaxed font-medium">
              "Competitive bidding nodes with a 14-day window receive an average of <span className="font-mono font-black text-emerald-700">4.2X</span> higher response density than restricted windows."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
