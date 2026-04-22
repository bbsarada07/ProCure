'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  BarChart3, 
  PieChart, 
  ArrowLeft,
  Calendar,
  ChevronDown,
  Loader2,
  FileDown,
  CheckCircle2 as CheckIcon,
  Activity,
  Terminal,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const DATA_SETS: Record<string, any> = {
  'Last 7 Days': {
    totalBids: 42,
    participation: [
      { m: 'MON', v: 8, h: 40 },
      { m: 'TUE', v: 12, h: 60 },
      { m: 'WED', v: 15, h: 75 },
      { m: 'THU', v: 5, h: 25 },
      { m: 'FRI', v: 18, h: 90 },
      { m: 'SAT', v: 4, h: 20 },
      { m: 'SUN', v: 2, h: 10 },
    ],
    outcomes: [
      { label: 'Technical Pass', val: '75%', color: 'bg-emerald-500', count: 32 },
      { label: 'Technical Fail', val: '20%', color: 'bg-rose-500', count: 8 },
      { label: 'Under Review', val: '5%', color: 'bg-amber-500', count: 2 },
    ],
    stats: [
      { label: 'Avg. Eval Latency', value: '1.2 Days', trend: '-22%', icon: TrendingUp },
      { label: 'Fiscal Optimization', value: '₹1.4L', trend: '+5%', icon: ShieldCheck },
      { label: 'Manual Nodes', value: '0.8', trend: '-15%', icon: Users },
      { label: 'Protocol Integrity', value: '100%', trend: '+0.0%', icon: BarChart3 },
    ]
  },
  'Last 30 Days': {
    totalBids: 482,
    participation: [
      { m: 'WK 1', v: 110, h: 100 },
      { m: 'WK 2', v: 85, h: 77 },
      { m: 'WK 3', v: 95, h: 86 },
      { m: 'WK 4', v: 102, h: 92 },
    ],
    outcomes: [
      { label: 'Technical Pass', val: '60%', color: 'bg-emerald-500', count: 289 },
      { label: 'Technical Fail', val: '30%', color: 'bg-rose-500', count: 145 },
      { label: 'Under Review', val: '10%', color: 'bg-amber-500', count: 48 },
    ],
    stats: [
      { label: 'Avg. Eval Latency', value: '4.2 Days', trend: '-12%', icon: TrendingUp },
      { label: 'Fiscal Optimization', value: '₹12.4L', trend: '+18%', icon: ShieldCheck },
      { label: 'Manual Nodes', value: '1.4', trend: '-45%', icon: Users },
      { label: 'Protocol Integrity', value: '99.8%', trend: '+0.2%', icon: BarChart3 },
    ]
  }
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const currentData = DATA_SETS[timeRange] || DATA_SETS['Last 30 Days'];

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
  };

  const triggerFileDownload = () => {
    const reportContent = `
PROCURE AI | STRATEGIC INTELLIGENCE LEDGER
------------------------------------------
Temporal Range: ${timeRange}
Timestamp: ${new Date().toISOString()}
Node Status: SECURE

METRIC LOGS:
${currentData.stats.map((s: any) => `- ${s.label}: ${s.value} (${s.trend})`).join('\n')}

PARTICIPATION ENTROPY:
${currentData.participation.map((p: any) => `- ${p.m}: ${p.v} Nodes`).join('\n')}

DETERMINISTIC OUTCOMES:
${currentData.outcomes.map((o: any) => `- ${o.label}: ${o.val} (${o.count} Events)`).join('\n')}

------------------------------------------
CONFIDENTIAL - DEFENSE PROCUREMENT NETWORK
    `;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ProCure_Intel_Report_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (isDownloading && downloadProgress < 100) {
      const timer = setTimeout(() => {
        setDownloadProgress(prev => Math.min(prev + Math.random() * 25, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (downloadProgress === 100) {
      triggerFileDownload();
      const timer = setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDownloading, downloadProgress]);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 watermark h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded text-slate-400 hover:bg-slate-100">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight uppercase">Strategic Intelligence Ledger</h2>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">Aggregated Performance Metrics // Operational Nodes</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div 
              role="button"
              className="flex items-center gap-3 bg-white border border-stone-200 h-8 px-4 rounded text-[10px] font-mono font-black text-slate-700 hover:bg-stone-50 transition-colors cursor-pointer shadow-sm uppercase tracking-widest"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {timeRange}
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white border-stone-200 shadow-xl">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-[9px] font-mono uppercase tracking-[0.2em] text-stone-400 font-black px-3 py-2">Select Temporal Node</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'Last Year'].map((range) => (
                <DropdownMenuItem 
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className="flex items-center justify-between cursor-pointer focus:bg-stone-50 px-3 py-2"
                >
                  <span className="font-mono font-bold text-[11px] text-stone-700 uppercase">{range}</span>
                  {timeRange === range && <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shadow-glow-emerald" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-3 gap-4 flex-1 overflow-hidden">
        <Card className="col-span-2 border-none shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden defense-shadow flex flex-col">
          <CardHeader className="py-3 px-6 border-b border-stone-100 bg-stone-50/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-400">Participation Entropy</CardTitle>
                <CardDescription className="text-[9px] font-mono uppercase text-slate-500">Sub-node activity volume</CardDescription>
              </div>
              <Badge className="bg-[#020410] text-white border-white/10 font-mono text-[9px] px-3 h-5 uppercase tracking-widest">Aggregate: {currentData.totalBids} NODES</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-10 flex-1 flex flex-col justify-center">
            <div className="h-[200px] w-full flex items-end justify-between relative px-4">
              <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-20">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full border-t border-slate-300 border-dashed" />
                ))}
              </div>
              
              {currentData.participation.map((d: any, i: number) => (
                <div key={i} className="flex flex-col items-center gap-3 z-10 flex-1 group">
                  <div className="relative w-8 flex flex-col justify-end h-[160px]">
                    <div 
                      className="w-full bg-[#020410] rounded transition-all duration-700 ease-out hover:bg-emerald-600 shadow-2xl relative" 
                      style={{ height: `${d.h}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-[#020410] text-white text-[9px] px-2 py-1 rounded font-mono font-bold whitespace-nowrap shadow-2xl border border-white/10">
                        {d.v}
                      </div>
                    </div>
                  </div>
                  <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest">{d.m}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden defense-shadow flex flex-col">
          <CardHeader className="py-3 px-6 border-b border-stone-100 bg-stone-50/50">
            <CardTitle className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-400">Decision Topology</CardTitle>
            <CardDescription className="text-[9px] font-mono uppercase text-slate-500">Distribution of outcome vectors</CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col justify-center">
            <div className="flex justify-center mb-8 scale-110">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90 drop-shadow-2xl">
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#020410" strokeWidth="4" strokeDasharray={`${parseInt(currentData.outcomes[0].val)} ${100 - parseInt(currentData.outcomes[0].val)}`} strokeDashoffset="0" className="transition-all duration-1000" />
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#e11d48" strokeWidth="4" strokeDasharray={`${parseInt(currentData.outcomes[1].val)} ${100 - parseInt(currentData.outcomes[1].val)}`} strokeDashoffset={`-${parseInt(currentData.outcomes[0].val)}`} className="transition-all duration-1000 opacity-80" />
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="4" strokeDasharray={`${parseInt(currentData.outcomes[2].val)} ${100 - parseInt(currentData.outcomes[2].val)}`} strokeDashoffset={`-${parseInt(currentData.outcomes[0].val) + parseInt(currentData.outcomes[1].val)}`} className="transition-all duration-1000 opacity-60" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-mono font-black text-slate-900 tracking-tighter">{currentData.totalBids}</span>
                  <span className="text-[7px] uppercase font-mono font-black text-slate-400 tracking-tighter">NODES</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {currentData.outcomes.map((item: any, i: number) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#020410]' : item.color}`} />
                      <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                    </div>
                    <span className="text-[9px] font-mono font-black text-slate-900">{item.val}</span>
                  </div>
                  <div className="h-0.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${i === 0 ? 'bg-[#020410]' : item.color} transition-all duration-1000`} style={{ width: item.val }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {currentData.stats.map((stat: any, i: number) => (
          <Card key={i} className="border-none shadow-sm bg-[#020410] group transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <div className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-lg font-serif font-black text-white tracking-tight">{stat.value}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={cn("text-[8px] font-mono h-4", stat.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500')}>
                  {stat.trend}
                </Badge>
                <stat.icon className="w-3.5 h-3.5 text-slate-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden defense-shadow">
        <CardHeader className="py-2 px-6 border-b border-stone-100 flex flex-row items-center justify-between bg-stone-50/50">
          <div>
            <CardTitle className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-400">Node Performance Ledger</CardTitle>
            <CardDescription className="text-[9px] font-mono uppercase text-slate-500">Execution metrics for prioritized tender nodes</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 border-stone-200 text-stone-700 text-[9px] font-mono uppercase tracking-widest px-3 gap-2 hover:bg-[#020410] hover:text-white transition-all shadow-xl"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? <Loader2 className="w-3 h-3 animate-spin" /> : <FileDown className="w-3 h-3" />}
            Extract Intelligence
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/80">
                <th className="px-6 py-2 text-[8px] font-mono font-black uppercase text-slate-400 tracking-[0.2em] border-b border-stone-100">ENTITY REFERENCE</th>
                <th className="px-6 py-2 text-[8px] font-mono font-black uppercase text-slate-400 tracking-[0.2em] border-b border-stone-100 text-center">SUB-NODES</th>
                <th className="px-6 py-2 text-[8px] font-mono font-black uppercase text-slate-400 tracking-[0.2em] border-b border-stone-100 text-center">ALGO CONFIDENCE</th>
                <th className="px-6 py-2 text-[8px] font-mono font-black uppercase text-slate-400 tracking-[0.2em] border-b border-stone-100 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {[
                { ref: 'CRPF-CS-2026-04', bids: 12, conf: '98.2%', status: 'RESOLVED' },
                { ref: 'BSF-IT-2025-11', bids: 8, conf: '96.5%', status: 'RESOLVED' },
                { ref: 'CISF-MED-2026-01', bids: 24, conf: '99.1%', status: 'ACTIVE' },
                { ref: 'NSG-EQUIP-2025-08', bids: 5, conf: '97.8%', status: 'RESOLVED' },
                { ref: 'ITBP-INFRA-2026-02', bids: 15, conf: '94.2%', status: 'FLAGGED' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-stone-100/40 transition-colors h-8">
                  <td className="px-6 py-1 text-[11px] font-serif font-black text-slate-900">{row.ref}</td>
                  <td className="px-6 py-1 text-[10px] text-slate-500 text-center font-mono">{row.bids}</td>
                  <td className="px-6 py-1 text-center">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">{row.conf}</span>
                  </td>
                  <td className="px-6 py-1 text-right">
                    <span className={cn(
                      "text-[8px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded",
                      row.status === 'RESOLVED' ? 'text-emerald-600' :
                      row.status === 'FLAGGED' ? 'text-rose-600' :
                      'text-blue-600 animate-pulse'
                    )}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={isDownloading}>
        <DialogContent className="max-w-sm bg-[#020410] border-white/10 p-0 overflow-hidden shadow-2xl">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-emerald-500/20 rounded border border-emerald-500/40">
                <Terminal className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <DialogTitle className="text-white text-sm font-serif font-black uppercase">Executing Extraction Protocol</DialogTitle>
                <DialogDescription className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">Compiling Encrypted Intelligence Ledger</DialogDescription>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300 ease-out shadow-glow-emerald" 
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[8px] font-mono font-black uppercase tracking-[0.2em] text-slate-500">
                <span>{downloadProgress < 100 ? 'Compiling Nodes...' : 'Extraction Complete'}</span>
                <span className="text-emerald-500">{Math.floor(downloadProgress)}%</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
