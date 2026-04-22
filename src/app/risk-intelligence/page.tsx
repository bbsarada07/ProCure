'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldAlert, 
  Share2, 
  Network, 
  AlertTriangle, 
  Users, 
  Fingerprint, 
  Info,
  Terminal,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RiskIntelligencePage() {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 watermark h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
        <div>
          <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight uppercase">Risk Intelligence Center</h2>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">Collusion Detection // Network Analysis // Cartel Vetting</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 px-3 h-6 text-[9px] font-mono uppercase tracking-widest animate-pulse">Threat Level: Elevated</Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Network Analysis Graph (Mock) */}
        <Card className="col-span-2 border-none shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden defense-shadow flex flex-col">
          <CardHeader className="py-3 px-6 border-b border-stone-100 bg-stone-50/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-400">Behavioral Network Graph</CardTitle>
                <CardDescription className="text-[9px] font-mono uppercase text-slate-500">Mapping entity relationships across metadata nodes</CardDescription>
              </div>
              <Badge className="bg-[#020410] text-white border-white/10 font-mono text-[9px] px-3 h-5 uppercase tracking-widest">Active Analysis</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 relative bg-slate-50/30">
            {/* Mock Network Graph UI */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full p-20">
                {/* Central Red Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-16 h-16 bg-rose-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.4)] border-4 border-white animate-pulse">
                    <Fingerprint className="w-8 h-8 text-white" />
                    <span className="text-[8px] font-mono font-black text-white mt-1">SHARED ASSET</span>
                  </div>
                </div>

                {/* Connected Bidders */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 group">
                  <div className="w-12 h-12 bg-[#020410] rounded-full flex items-center justify-center border-2 border-white shadow-xl transition-all group-hover:scale-110">
                    <span className="text-[10px] font-mono font-black text-white">BID A</span>
                  </div>
                  <div className="absolute top-12 left-12 w-32 h-0.5 bg-rose-500/20 rotate-[35deg] origin-top-left" />
                </div>

                <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 group">
                  <div className="w-12 h-12 bg-[#020410] rounded-full flex items-center justify-center border-2 border-white shadow-xl transition-all group-hover:scale-110">
                    <span className="text-[10px] font-mono font-black text-white">BID B</span>
                  </div>
                  <div className="absolute top-12 right-12 w-32 h-0.5 bg-rose-500/20 rotate-[145deg] origin-top-right" />
                </div>

                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 group">
                  <div className="w-12 h-12 bg-[#020410] rounded-full flex items-center justify-center border-2 border-white shadow-xl transition-all group-hover:scale-110">
                    <span className="text-[10px] font-mono font-black text-white">BID C</span>
                  </div>
                  <div className="absolute bottom-12 left-6 w-32 h-0.5 bg-rose-500/20 -rotate-90 origin-bottom" />
                </div>

                {/* Connection Labels */}
                <div className="absolute top-[40%] left-[38%] text-[8px] font-mono font-black text-rose-500 uppercase bg-rose-50 px-1 rounded border border-rose-100 shadow-sm">Shared IP</div>
                <div className="absolute top-[40%] right-[38%] text-[8px] font-mono font-black text-rose-500 uppercase bg-rose-50 px-1 rounded border border-rose-100 shadow-sm">Same CA</div>
                <div className="absolute bottom-[40%] left-[52%] text-[8px] font-mono font-black text-rose-500 uppercase bg-rose-50 px-1 rounded border border-rose-100 shadow-sm">Metadata Signature</div>
              </div>
            </div>

            {/* Graph Legend */}
            <div className="absolute bottom-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded border border-stone-200 shadow-xl space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[9px] font-mono font-black text-slate-500 uppercase">Shared Identity Point</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#020410]" />
                <span className="text-[9px] font-mono font-black text-slate-500 uppercase">Independent Entity</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Analysis Panel */}
        <div className="space-y-4 overflow-y-auto pr-2">
          <Card className="bg-[#020410] border-none shadow-2xl overflow-hidden group">
            <CardHeader className="py-4 px-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <CardTitle className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-white">Anomalous Cluster [Alpha]</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="p-3 bg-rose-500/10 rounded border border-rose-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-black text-rose-500 uppercase tracking-widest">High Risk: Potential Ring Bidding</span>
                  <Activity className="w-3 h-3 text-rose-500 animate-pulse" />
                </div>
                <p className="text-[11px] font-serif italic text-slate-300 leading-relaxed">
                  "Bidders 2, 5, and 8 (A, B, and C) submitted documents originating from the <span className="text-white font-bold font-mono underline">same IP address (192.168.1.142)</span> and share the same registered Chartered Accountant. Flagged for suspected cartel behavior."
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">Correlation Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400">Metadata Overlap</span>
                    <span className="text-[10px] font-mono font-black text-rose-400">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400">Temporal Submission Gap</span>
                    <span className="text-[10px] font-mono font-black text-rose-400">122ms</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 p-3 bg-emerald-500/5 rounded border border-emerald-500/20">
                  <Info className="w-3.5 h-3.5 text-emerald-500" />
                  <p className="text-[9px] font-mono text-slate-400 uppercase leading-tight">
                    AI recommendation: Issue show-cause notice and freeze evaluation for cluster alpha.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-stone-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Network className="w-16 h-16" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-3.5 h-3.5 text-emerald-600" />
              <h4 className="text-[9px] font-mono font-black text-slate-900 uppercase tracking-[0.2em]">Operational Status</h4>
            </div>
            <p className="text-[11px] font-serif italic text-slate-600 leading-relaxed font-medium">
              Intelligence engine successfully cross-referenced <span className="font-mono font-black text-emerald-700">2,400</span> historical CA registrations to identify the shared link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
