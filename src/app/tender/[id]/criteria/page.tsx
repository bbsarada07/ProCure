'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Eye,
  Edit3,
  Bot,
  Download,
  Loader2,
  History,
  Terminal,
  ShieldCheck,
  AlertTriangle,
  GitCompare
} from 'lucide-react';
import { MOCK_CRITERIA_EXTRACTION } from '@/lib/mockData';
import { useRouter, useParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

export default function CriteriaSetupPage() {
  const router = useRouter();
  const params = useParams();
  const [criteria, setCriteria] = useState(MOCK_CRITERIA_EXTRACTION);
  const [selectedId, setSelectedId] = useState('crit_1');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [editingCriterion, setEditingCriterion] = useState<any>(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setCriteria(prev => prev.map(c => c.id === editingCriterion.id ? editingCriterion : c));
    setEditingCriterion(null);
  };

  const handleFinalize = () => {
    setIsFinalizing(true);
    setTimeout(() => {
      router.push(`/tender/${params.id}/evaluation`);
    }, 1500);
  };

  const DiffView = () => (
    <div className="space-y-6 p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
        <p className="text-xs font-serif font-medium text-amber-800 leading-normal">
          <span className="font-bold">Notice of Corrigendum:</span> Tender criteria updated to <span className="font-mono font-black">V2</span>. 4 draft evaluations have been automatically re-run against new rules to ensure deterministic consistency.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* V1 - Old */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[9px] font-mono uppercase bg-slate-100 text-slate-500 border-stone-200">Revision V1</Badge>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Archived Matrix</span>
          </div>
          <div className="p-4 rounded border border-rose-100 bg-rose-50/30 space-y-2 opacity-60">
            <h4 className="text-[11px] font-serif font-black text-slate-900 uppercase">Criterion #4: Submission Window</h4>
            <div className="p-2 bg-rose-100/50 rounded border border-rose-200">
              <p className="text-[10px] font-mono text-rose-800 line-through">Submission Window: 14 Days from publication</p>
            </div>
            <p className="text-[10px] font-serif italic text-slate-500">Node marked as non-compliant with GFR 2026.</p>
          </div>
        </div>

        {/* V2 - New */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[9px] font-mono uppercase bg-emerald-50 text-emerald-700 border-emerald-200">Revision V2 (ACTIVE)</Badge>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Live Node</span>
          </div>
          <div className="p-4 rounded border border-emerald-100 bg-emerald-50/30 space-y-2 shadow-sm">
            <h4 className="text-[11px] font-serif font-black text-slate-900 uppercase">Criterion #4: Submission Window</h4>
            <div className="p-2 bg-emerald-100/50 rounded border border-emerald-200">
              <p className="text-[10px] font-mono text-emerald-800 font-bold">Submission Window: 21 Days from publication</p>
            </div>
            <p className="text-[10px] font-serif italic text-emerald-700 font-medium">Compliance verified. Deterministic match established.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 watermark">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-1">
            <span>Tenders</span>
            <ChevronRight className="w-2.5 h-2.5" />
            <span className="font-bold text-slate-900 font-mono">CRPF-CS-2026-004</span>
          </div>
          <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight uppercase">Criteria Extraction Ledger</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-4">
            <Label htmlFor="version-toggle" className="text-[10px] font-mono font-black uppercase text-slate-400 tracking-widest">Version History</Label>
            <Switch 
              id="version-toggle"
              checked={showVersionHistory}
              onCheckedChange={setShowVersionHistory}
              className="data-[state=checked]:bg-[#020410]"
            />
          </div>
          <Button 
            className="h-8 bg-[#020410] hover:bg-[#0a1025] gap-2 text-[10px] font-mono font-black uppercase tracking-widest px-6 shadow-xl text-white"
            onClick={handleFinalize}
            disabled={isFinalizing}
          >
            {isFinalizing ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShieldCheck className="w-3 h-3" />}
            Finalize Evaluation Node
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6 overflow-hidden">
        {/* Left Section: Document or Diff */}
        <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm flex flex-col overflow-hidden defense-shadow">
          <CardHeader className="py-3 px-6 border-b border-stone-100 bg-stone-50/50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#020410] rounded shadow-sm">
                {showVersionHistory ? <GitCompare className="w-3.5 h-3.5 text-white" /> : <FileText className="w-3.5 h-3.5 text-white" />}
              </div>
              <div>
                <CardTitle className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-400">
                  {showVersionHistory ? 'Corrigendum Analysis' : 'Primary Source Node'}
                </CardTitle>
                <CardDescription className="text-[9px] font-mono uppercase text-slate-500">
                  {showVersionHistory ? 'Comparing V1 vs V2 structural changes' : 'Tender_Document_Draft_V4.pdf'}
                </CardDescription>
              </div>
            </div>
            {!showVersionHistory && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400" onClick={() => setIsPreviewOpen(true)}>
                <Eye className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <ScrollArea className="flex-1">
            {showVersionHistory ? (
              <DiffView />
            ) : (
              <div className="p-12 bg-white min-h-full font-serif leading-relaxed text-slate-800">
                <header className="text-center mb-16 border-b-2 border-double border-slate-200 pb-8">
                  <h1 className="text-xl font-black text-slate-900 mb-1">GOVERNMENT OF INDIA</h1>
                  <h2 className="text-lg font-bold text-slate-700 tracking-[0.2em] uppercase">Central Reserve Police Force</h2>
                  <div className="mt-6 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Document Reference</span>
                    <span className="text-xs font-mono font-bold bg-slate-100 px-3 py-1 rounded">CRPF/CS/2026/04-V4</span>
                  </div>
                </header>

                <section className="space-y-6 mb-12">
                  <h3 className="text-base font-black text-slate-900 border-l-4 border-[#020410] pl-4 uppercase tracking-wide">Section 4.1: Financial Eligibility</h3>
                  <p className="text-[14px]">
                    The bidder must demonstrate strong financial stability. The <span className="font-bold underline decoration-slate-300">minimum average annual turnover</span> of the bidder during the last three financial years should not be less than <span className="font-bold bg-slate-100 text-slate-900 px-1.5 py-0.5 rounded border border-slate-200">₹5,00,00,000 (Rupees Five Crore only)</span>.
                  </p>
                </section>

                <section className="space-y-6 mb-12">
                  <h3 className="text-base font-black text-slate-900 border-l-4 border-slate-300 pl-4 uppercase tracking-wide">Section 4.2: Experience</h3>
                  <p className="text-[14px]">
                    Bidders must have experience in executing <span className="font-bold underline decoration-slate-300">at least 3 (three) similar works</span> of construction for Government/Semi-Government/PSUs during the last 5 years.
                  </p>
                </section>
              </div>
            )}
          </ScrollArea>
        </Card>

        {/* Right Section: AI Extraction List */}
        <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm flex flex-col overflow-hidden defense-shadow">
          <CardHeader className="py-3 px-6 border-b border-stone-100 bg-stone-50/50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500 rounded shadow-glow-emerald">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <CardTitle className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-400">AI Vector Extraction</CardTitle>
                <CardDescription className="text-[9px] font-mono uppercase text-slate-500">Deterministic mapping of eligibility parameters</CardDescription>
              </div>
            </div>
            <Badge className="bg-[#020410] text-white text-[9px] font-mono uppercase px-2 h-5 tracking-widest">{criteria.length} Parameters</Badge>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-4">
              {criteria.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "p-5 rounded-lg border transition-all cursor-pointer group relative overflow-hidden",
                    selectedId === item.id 
                    ? 'border-emerald-500 bg-emerald-50/30 shadow-lg' 
                    : 'border-stone-100 hover:border-stone-200 bg-white/50'
                  )}
                >
                  <div className="flex items-start justify-between mb-3 relative z-10">
                    <div className="flex items-center gap-2">
                      <Badge className={cn("text-[8px] font-mono font-black uppercase h-4 px-1.5",
                        item.category === 'Financial' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        item.category === 'Technical' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      )}>
                        {item.category}
                      </Badge>
                      {item.isMandatory && (
                        <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-[8px] font-mono font-black uppercase h-4 px-1.5">Mandatory</Badge>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-slate-300 hover:text-[#020410] hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCriterion({...item});
                      }}
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </div>
                  <h4 className="text-xs font-serif font-black text-slate-900 uppercase tracking-tight mb-1">{item.description}</h4>
                  <p className="text-[11px] font-serif italic text-slate-600 leading-relaxed font-medium mb-4">{item.requirement}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100/60 relative z-10">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-emerald-500" />
                      <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Confidence Index: 0.98</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-[8px] font-mono font-black text-slate-400 uppercase">Verification Status</span>
                      <Switch defaultChecked className="data-[state=checked]:bg-emerald-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
