'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  FileText,
  ShieldCheck,
  PanelRightClose,
  PanelRightOpen,
  Zap,
  Globe,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [isAiOpen, setIsAiOpen] = useState(true);

  const stats = [
    { label: 'Total Bidders', value: '10', icon: Users, color: 'text-emerald-500' },
    { label: 'Cleared', value: '06', icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'Rejected', value: '03', icon: XCircle, color: 'text-rose-500' },
    { label: 'Manual Review', value: '01', icon: AlertCircle, color: 'text-amber-500' },
  ];

  return (
    <div className="flex h-[calc(100vh-2rem)] overflow-hidden watermark">
      <div className={cn(
        "flex-1 space-y-4 p-6 transition-all duration-500",
        isAiOpen ? "pr-4" : "pr-6"
      )}>
        {/* Header Section */}
        <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
          <div>
            <h2 className="text-2xl font-serif font-black tracking-tight text-slate-900 uppercase">Program Dashboard</h2>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">Secure Procurement Node // Active Session</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/analytics">
              <Button variant="outline" className="h-8 px-3 text-[10px] font-mono uppercase tracking-widest border-stone-300 gap-2">
                <Globe className="w-3 h-3" />
                Network Intel
              </Button>
            </Link>
            <Button className="h-8 px-4 text-[10px] font-mono uppercase tracking-widest bg-[#020410] hover:bg-[#0a1025] gap-2 shadow-xl text-white">
              <Zap className="w-3 h-3" />
              New Deployment
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-slate-400"
              onClick={() => setIsAiOpen(!isAiOpen)}
            >
              {isAiOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Operations Overview Ledger (Ticker Bar) */}
        <div className="ticker-bar rounded-md p-1 flex items-center gap-1 shadow-2xl">
          {stats.map((stat, i) => (
            <div key={stat.label} className={cn(
              "flex-1 flex items-center justify-between px-6 py-3 border-r border-white/5 last:border-none group hover:bg-white/5 transition-colors cursor-default",
            )}>
              <div className="space-y-0.5">
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                <h3 className={cn("text-2xl font-mono font-bold tracking-tighter leading-none", stat.color)}>
                  {stat.value}
                </h3>
              </div>
              <stat.icon className={cn("w-4 h-4 opacity-20 group-hover:opacity-40 transition-opacity", stat.color)} />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-4 lg:grid-cols-1">
          <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden defense-shadow">
            <CardHeader className="py-3 px-4 border-b border-stone-100 flex flex-row items-center justify-between bg-stone-50/50">
              <div className="space-y-0.5">
                <CardTitle className="text-xs font-serif font-black uppercase tracking-widest">Active Strategic Tenders</CardTitle>
                <CardDescription className="text-[10px] font-mono uppercase">Evaluating technical compliance across {1} live node.</CardDescription>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-mono uppercase h-5 px-2">
                Operational
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-stone-100">
                <div className="group relative flex items-center justify-between p-3 hover:bg-stone-50/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded border border-stone-200 shadow-inner group-hover:border-emerald-500/30 transition-colors">
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-serif font-bold text-slate-900">CRPF Construction Services 2026</h4>
                      <div className="flex items-center gap-3 text-[9px] font-mono text-slate-400 uppercase tracking-tight">
                        <span className="text-slate-600 font-bold">NODE: CS-2026-004</span>
                        <div className="w-1 h-1 rounded-full bg-stone-300" />
                        <span>Last Sync: 122ms ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right w-48">
                      <div className="flex justify-between items-end mb-1">
                        <p className="text-[10px] font-mono font-black text-slate-900">60% COMPLIANCE SCAN</p>
                        <p className="text-[9px] font-mono text-slate-400">STATUS: ACTIVE</p>
                      </div>
                      <div className="flex gap-0.5 h-1">
                        {[...Array(20)].map((_, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              "flex-1 rounded-full",
                              i < 12 ? "bg-emerald-500" : "bg-stone-200"
                            )} 
                          />
                        ))}
                      </div>
                    </div>
                    <Link href="/tender/crpf-2026/evaluation">
                      <Button size="sm" variant="outline" className="h-8 px-4 text-[10px] font-mono uppercase tracking-widest border-stone-300 hover:bg-[#020410] hover:text-white transition-all">
                        ACCESS INTEL <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Intel Panel (Collapsible Right Side) */}
      <div className={cn(
        "h-full border-l border-stone-200/60 bg-white/20 backdrop-blur-2xl transition-all duration-500 overflow-hidden relative shadow-2xl",
        isAiOpen ? "w-[400px]" : "w-0 border-none"
      )}>
        <div className="p-8 space-y-8 w-[400px]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#020410] rounded shadow-glow-emerald">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-black uppercase tracking-tight text-slate-900">AI Intel Terminal</h3>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">ProCure Core v2.4 // Real-time</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-[#020410] rounded-xl text-slate-300 border border-white/5 defense-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles className="w-20 h-20" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-900/40 text-emerald-400 border-emerald-500/20 text-[9px] font-mono uppercase h-4 px-1.5">Intel Summary</Badge>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <p className="text-xs font-serif leading-relaxed italic">
                  <>
                    I have processed all <span className="text-emerald-400 font-bold font-mono">10</span> bidder submissions for the CRPF node. 
                    A critical dependency conflict was detected in <span className="text-rose-400 font-bold underline decoration-rose-500/50">Node 7</span>. 
                    Immediate officer intervention is required.
                  </>
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Link href="/tender/crpf-2026/evaluation" className="flex-1">
                    <Button className="w-full h-9 bg-emerald-700 hover:bg-emerald-800 text-white border-none gap-2 text-[10px] font-mono uppercase tracking-widest glow-urgent">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Execute Triage
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em] pl-1">Compliance Health</h5>
              <div className="space-y-2">
                {[
                  { label: 'Technical Accuracy', val: '98%', color: 'bg-emerald-500' },
                  { label: 'Document Integrity', val: '92%', color: 'bg-emerald-500' },
                  { label: 'Risk Threshold', val: 'Low', color: 'bg-emerald-500' },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{m.label}</span>
                    <span className="text-[10px] font-mono font-black text-slate-900">{m.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
