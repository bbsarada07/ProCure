'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  History, 
  ShieldCheck, 
  User, 
  Download, 
  Search,
  Lock,
  ChevronRight,
  CheckCircle2,
  Loader2,
  RefreshCcw,
  Fingerprint,
  Copy,
  Terminal,
  Activity
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { MOCK_AUDIT_LOGS } from '@/lib/mockData';
import { useState } from 'react';
import { cn } from "@/lib/utils";

export default function AuditTrailPage() {
  const [filterQuery, setFilterQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastVerified, setLastVerified] = useState<string>('Successful');

  const filteredLogs = MOCK_AUDIT_LOGS.filter(log => 
    log.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
    log.user.toLowerCase().includes(filterQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleExport = () => {
    setIsExporting(true);
    const report = `
PROCURE AI | IMMUTABLE AUDIT LOG
--------------------------------
Generated: ${new Date().toLocaleString()}
Tender: CRPF-CS-2026-004
Integrity: CRYPTOGRAPHICALLY SECURED

LOG ENTRIES:
${MOCK_AUDIT_LOGS.map(l => `[${l.timestamp}] ${l.action} by ${l.user}: ${l.details}`).join('\n')}

--------------------------------
END OF AUDIT TRAIL
INTEGRITY HASH: 0x8f4a7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d
    `;
    setTimeout(() => {
      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ProCure_Audit_Log_${new Date().getTime()}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 1500);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setLastVerified('Re-hashing blocks...');
    setTimeout(() => {
      setLastVerified('Verifying Merkle Roots...');
      setTimeout(() => {
        setIsVerifying(false);
        setLastVerified('Successful');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 watermark h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-1">
            <span>Tenders</span>
            <ChevronRight className="w-2.5 h-2.5" />
            <span className="font-bold text-slate-900">CRPF-CS-2026-004</span>
          </div>
          <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight uppercase">Compliance Ledger & Audit</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-sm shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono font-black uppercase tracking-widest">Ledger Secured: Cryptographic Proof Generated</span>
          </div>
          <Button 
            className="h-8 bg-[#020410] hover:bg-[#0a1025] gap-2 text-[10px] font-mono font-black uppercase tracking-widest px-6 shadow-xl text-white"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
            Extract Audit Node
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1 overflow-hidden">
        <Card className="col-span-2 border-none shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden defense-shadow flex flex-col">
          <CardHeader className="py-3 px-6 border-b border-stone-100 bg-stone-50/50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-400">Immutable Event Ledger</CardTitle>
              <CardDescription className="text-[9px] font-mono uppercase text-slate-500">Deterministic sequence of system & officer vectors</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
              <Input 
                placeholder="Filter sequence..." 
                className="pl-9 h-7 bg-white border-stone-200 text-[10px] font-mono uppercase focus-visible:ring-emerald-500/20" 
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader className="bg-stone-50/80 sticky top-0 z-30">
                <TableRow className="border-b border-stone-100 h-8">
                  <TableHead className="w-[140px] font-mono font-black uppercase text-[8px] text-stone-500 tracking-[0.2em] px-6">Timestamp</TableHead>
                  <TableHead className="w-[140px] font-mono font-black uppercase text-[8px] text-stone-500 tracking-[0.2em]">Vector</TableHead>
                  <TableHead className="w-[120px] font-mono font-black uppercase text-[8px] text-stone-500 tracking-[0.2em]">Origin Agent</TableHead>
                  <TableHead className="font-mono font-black uppercase text-[8px] text-stone-500 tracking-[0.2em]">Telemetry Details</TableHead>
                  <TableHead className="w-[140px] font-mono font-black uppercase text-[8px] text-stone-500 tracking-[0.2em] text-right px-6">Crypto Hash</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-stone-100/40 transition-colors border-stone-50 h-10 group">
                    <TableCell className="font-mono text-[9px] text-slate-500 px-6 uppercase">{log.timestamp}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-[8px] font-mono font-black uppercase px-1.5 h-4 border shadow-sm", 
                        log.action === 'Manual Override' ? 'text-amber-700 bg-amber-50 border-amber-200' :
                        log.action === 'System Flag' ? 'text-rose-700 bg-rose-50 border-rose-200' :
                        'text-emerald-700 bg-emerald-50 border-emerald-200'
                      )}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {log.user.includes('AI') || log.user.includes('Gemini') ? (
                          <Activity className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <User className="w-3 h-3 text-slate-400" />
                        )}
                        <span className="text-[10px] font-serif font-black text-slate-700 uppercase">{log.user}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[10px] font-serif italic text-slate-600 font-medium leading-tight pr-4">
                      {log.details}
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex items-center justify-end gap-2 group/hash">
                        <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter truncate max-w-[80px]">
                          0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 6)}
                        </span>
                        <Copy className="w-2.5 h-2.5 text-slate-300 cursor-pointer hover:text-emerald-500 transition-colors opacity-0 group-hover/hash:opacity-100" />
                      </div>
                    </TableCell>
                  </TableRow>
                )) : null}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="border-none shadow-sm bg-[#020410] overflow-hidden defense-shadow flex flex-col">
          <CardHeader className="py-4 px-6 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded border border-emerald-500/20">
                <Lock className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white">Integrity Matrix</h3>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <p className="text-[11px] font-serif italic text-slate-400 leading-relaxed font-medium">
              "Every operational vector in <span className="text-white font-bold">ProCure AI</span> is cryptographically anchored to an immutable ledger. This ensures non-repudiation and transparency for supreme audit authorities."
            </p>
            
            <div className="space-y-4">
              <div className="p-4 rounded bg-white/5 border border-white/10 shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] uppercase font-mono font-black text-slate-500 tracking-widest">Active Root Hash</p>
                  <Fingerprint className="w-3 h-3 text-emerald-500" />
                </div>
                <p className="text-[10px] font-mono text-emerald-500 truncate font-bold leading-none">0x8f4a7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d</p>
              </div>

              <div className={cn(
                "flex items-center gap-2 p-3 rounded text-[10px] font-mono font-black uppercase tracking-widest",
                lastVerified === 'Successful' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse'
              )}>
                {lastVerified === 'Successful' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <RefreshCcw className="w-3.5 h-3.5 animate-spin" />}
                <span>Status: Verification {lastVerified}</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-white/10 text-slate-300 hover:bg-white/5 hover:text-white gap-2 text-[10px] font-mono uppercase tracking-[0.2em] font-black h-10 shadow-2xl transition-all"
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Terminal className="w-3.5 h-3.5 text-emerald-500" />}
              {isVerifying ? 'Hashing Blocks...' : 'Execute Audit Refresh'}
            </Button>
          </CardContent>
          <div className="mt-auto p-4 opacity-5 pointer-events-none self-end">
            <ShieldCheck className="w-24 h-24 text-white" />
          </div>
        </Card>
      </div>
    </div>
  );
}
