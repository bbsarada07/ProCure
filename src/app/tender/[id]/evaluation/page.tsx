'use client';

import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ChevronRight, 
  ExternalLink, 
  Download, 
  Filter, 
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles, 
  Info, 
  ShieldAlert, 
  Link2, 
  Copy, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  FileCheck, 
  FileWarning,
  Mail, 
  Printer, 
  ShieldX,
  ShieldCheck,
  Loader2,
  Terminal,
  Activity
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { MOCK_BIDDERS, MOCK_CRITERIA_EXTRACTION } from '@/lib/mockData';
import { HITLModal } from '@/components/modals/HITLModal';
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useRole } from '@/context/RoleContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

export default function EvaluationMatrixPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBidder, setSelectedBidder] = useState<any>(null);
  const [selectedCriterion, setSelectedCriterion] = useState<any>(null);
  const [isPrecedentOpen, setIsPrecedentOpen] = useState(false);
  const [precedentSearch, setPrecedentSearch] = useState('');
  const [isFraudModalOpen, setIsFraudModalOpen] = useState(false);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [rejectionBidder, setRejectionBidder] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [precedentResult, setPrecedentResult] = useState<any>(null);
  const { role } = useRole();

  const filteredBidders = MOCK_BIDDERS.filter(bidder => {
    const matchesSearch = bidder.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         bidder.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus.length === 0 || filterStatus.includes(bidder.overallStatus);
    return matchesSearch && matchesStatus;
  });

  const openModal = (bidder: any, criterion: any) => {
    setSelectedBidder(bidder);
    setSelectedCriterion(criterion);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass':
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[9px] font-mono uppercase px-1.5 h-4">Pass</Badge>;
      case 'Fail':
        return <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-[9px] font-mono uppercase px-1.5 h-4">Fail</Badge>;
      case 'Needs Review':
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[9px] font-mono uppercase px-1.5 h-4 animate-pulse">Review</Badge>;
      default:
        return <Badge variant="secondary" className="text-[9px] font-mono uppercase h-4 px-1.5">{status}</Badge>;
    }
  };

  const handleAnalyze = () => {
    if (!precedentSearch) return;
    setIsAnalyzing(true);
    setIsPrecedentOpen(false);
    
    const responses = [
      {
        title: "HISTORICAL PRECEDENT: ISO CERTIFICATE DISPUTES",
        text: "In the 2024 Border Fencing tender, blurry ISO certificates were resolved via the Vendor Resubmission portal within 12 hours.",
        action: "RECOMMENDED: TRIGGER HITL INTERVENTION"
      },
      {
        title: "HISTORICAL PRECEDENT: TURNOVER SHORTFALLS",
        text: "In the 'Bridge Construction 2023' project, a bidder with 95% of required turnover was conditionally passed after submitting a Parent Company Guarantee.",
        action: "RECOMMENDED: REVIEW FINANCIAL GUARANTEE"
      },
      {
        title: "HISTORICAL PRECEDENT: CONFLICT OF INTEREST",
        text: "Past rulings in the Northern Sector tenders indicate that sibling-owned subsidiaries must be flagged for manually auditing to prevent collusion.",
        action: "RECOMMENDED: TRIGGER FRAUD PROTOCOL"
      }
    ];

    const keyword = precedentSearch.toLowerCase();
    let result = responses[0];
    if (keyword.includes('turnover') || keyword.includes('money') || keyword.includes('finance')) result = responses[1];
    if (keyword.includes('fraud') || keyword.includes('conflict') || keyword.includes('rule')) result = responses[2];

    setTimeout(() => {
      setIsAnalyzing(false);
      setPrecedentResult(result);
      setIsPrecedentOpen(true);
    }, 1500);
  };

  const triggerExport = () => {
    setIsExporting(true);
    const reportContent = `
PROCURE AI | BIDDER INTELLIGENCE MATRIX
------------------------------------------
Tender Node: CRPF Construction Services 2026
Timestamp: ${new Date().toISOString()}
Auth Level: ${role}

SUMMARY LOG:
${MOCK_BIDDERS.map(b => `- [${b.id}] ${b.name}: ${b.overallStatus}`).join('\n')}

CRITERIA VERIFICATION LEDGER:
${MOCK_BIDDERS.map(b => `
[${b.id}] ${b.name}
${Object.entries(b.criteria).map(([id, data]: any) => `  - CID:${id} STATUS:${data.status}`).join('\n')}`).join('\n')}

------------------------------------------
OFFICIAL TENDER RECORD - DEFENSE PROCUREMENT NODE
    `;
    setTimeout(() => {
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ProCure_Matrix_Report_${new Date().getTime()}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 1000);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500 watermark h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-1">
            <span>Tenders</span>
            <ChevronRight className="w-2.5 h-2.5" />
            <span className="font-bold text-slate-900 font-mono">CRPF-CS-2026-004</span>
          </div>
          <h2 className="text-2xl font-serif font-black text-slate-900 uppercase">Bidder Intelligence Matrix</h2>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="h-8 px-4 text-[10px] font-mono uppercase tracking-widest border-stone-300 text-stone-700 hover:bg-stone-100" 
            onClick={triggerExport}
            disabled={isExporting}
          >
            {isExporting ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Download className="w-3 h-3 mr-2" />}
            Export Intelligence
          </Button>
          <Button 
            className="h-8 px-6 text-[10px] font-mono uppercase tracking-widest bg-[#020410] hover:bg-[#0a1025] shadow-xl text-white"
            onClick={() => setIsConfirming(true)}
          >
            {role === 'Director' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                Sign & Lock Node
              </>
            ) : (
              'Finalize Analysis'
            )}
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#020410]/5 rounded-lg blur-md group-focus-within:bg-[#020410]/10 transition-all duration-500" />
          <div className="relative flex items-center bg-white border border-stone-200 rounded-lg pl-4 pr-1 h-10 shadow-sm group-focus-within:border-emerald-500 transition-all">
            <Terminal className="w-3.5 h-3.5 text-slate-400 mr-3" />
            <Input 
              placeholder="QUERY RAG ENGINE FOR HISTORICAL PRECEDENTS..." 
              className="border-none shadow-none focus-visible:ring-0 h-8 text-[11px] font-mono uppercase tracking-[0.1em] placeholder:text-stone-300 bg-transparent"
              value={precedentSearch}
              onChange={(e) => setPrecedentSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <Button 
              className="bg-[#020410] hover:bg-emerald-900 h-8 px-4 text-[10px] font-mono uppercase tracking-widest transition-all text-white"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !precedentSearch}
            >
              {isAnalyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : 'EXECUTE'}
            </Button>
          </div>
        </div>

        <Collapsible open={isPrecedentOpen} onOpenChange={setIsPrecedentOpen}>
          <CollapsibleContent className="animate-in slide-in-from-top-2 duration-500">
            <div className="bg-[#020410] rounded-lg p-4 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Sparkles className="w-24 h-24 text-emerald-500" />
              </div>
              <div className="relative z-10 flex gap-4">
                <div className="p-2 bg-emerald-500/10 rounded border border-emerald-500/20 h-fit">
                  <Activity className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-[0.2em]">{precedentResult?.title || "QUERY RESULT"}</h4>
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[8px] font-mono uppercase h-4">Verified Match</Badge>
                  </div>
                  <p className="text-xs font-serif italic text-slate-300 leading-relaxed max-w-2xl">
                    {precedentResult?.text || "Awaiting intelligence query execution..."}
                  </p>
                  <div className="pt-2">
                    <p className="text-[10px] font-mono font-black text-rose-400 uppercase tracking-widest underline decoration-rose-400/30 underline-offset-4">
                      {precedentResult?.action || "Recommended Protocol: Manual Inspection Required"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <Card className="flex-1 border-none shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden defense-shadow flex flex-col">
        <CardHeader className="py-2 px-4 border-b border-stone-100 flex flex-row items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-4 flex-1 max-w-xs">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
              <Input 
                placeholder="SEARCH NODES..." 
                className="pl-9 h-7 text-[10px] font-mono uppercase bg-white border-stone-200 focus-visible:ring-emerald-500/20" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div 
                  role="button"
                  className={cn(
                    "flex items-center gap-2 h-7 px-3 rounded border border-stone-200 bg-white text-[10px] font-mono uppercase tracking-widest transition-colors hover:bg-stone-50 cursor-pointer shadow-sm",
                    filterStatus.length > 0 && "bg-emerald-50 border-emerald-200 text-emerald-700"
                  )}
                >
                  <Filter className="w-3 h-3" />
                  FILTER {filterStatus.length > 0 && `[${filterStatus.length}]`}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-white border-stone-200 shadow-xl">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-[9px] font-mono font-black uppercase text-stone-400 tracking-[0.2em] px-3 py-2">Filter Matrix Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['Pass', 'Fail', 'Needs Review'].map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={filterStatus.includes(status)}
                      onCheckedChange={(checked) => {
                        setFilterStatus(prev => 
                          checked ? [...prev, status] : prev.filter(s => s !== status)
                        );
                      }}
                      className="text-[10px] font-mono uppercase focus:bg-stone-50 text-stone-700"
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-6 text-[9px] text-stone-400 font-mono font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> PASS
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> FAIL
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> REVIEW
            </div>
          </div>
        </CardHeader>

        <div className="flex-1 overflow-auto">
          <Table className="relative">
            <TableHeader className="bg-stone-50/80 sticky top-0 z-30 backdrop-blur-sm">
              <TableRow className="border-b border-stone-200 h-8">
                <TableHead className="w-[200px] font-mono font-black uppercase text-[9px] text-stone-500 tracking-widest sticky left-0 bg-stone-50 z-40 border-r">Node Entity</TableHead>
                {MOCK_CRITERIA_EXTRACTION.map((c) => (
                  <TableHead key={c.id} className="min-w-[140px] font-mono font-black uppercase text-[9px] text-stone-500 tracking-widest text-center px-2">
                    {c.description}
                  </TableHead>
                ))}
                <TableHead className="min-w-[120px] font-mono font-black uppercase text-[9px] text-stone-500 tracking-widest text-center">Risk Logic</TableHead>
                <TableHead className="min-w-[180px] font-mono font-black uppercase text-[9px] text-stone-500 tracking-widest text-center">Intel & Ops</TableHead>
                <TableHead className="w-[100px] font-mono font-black uppercase text-[9px] text-stone-500 tracking-widest text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBidders.length > 0 ? filteredBidders.map((bidder) => (
                <TableRow key={bidder.id} className="group hover:bg-stone-100/40 transition-colors border-stone-100 h-10">
                  <TableCell className="sticky left-0 bg-white group-hover:bg-stone-50 transition-colors z-20 border-r shadow-[2px_0_4px_-2px_rgba(0,0,0,0.05)] p-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-serif font-black text-slate-900 leading-tight">{bidder.name}</span>
                      <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">HEX:{bidder.id.toUpperCase()}</span>
                    </div>
                  </TableCell>
                  {MOCK_CRITERIA_EXTRACTION.map((crit) => {
                    const status = bidder.criteria[crit.id].status;
                    return (
                      <TableCell key={crit.id} className="text-center p-1">
                        <button 
                          onClick={() => openModal(bidder, bidder.criteria[crit.id])}
                          className={cn(
                            "inline-flex items-center justify-center p-1 rounded transition-all hover:scale-110 active:scale-95",
                            status === 'Pass' ? 'text-emerald-500' :
                            status === 'Fail' ? 'text-rose-500' :
                            'text-amber-500 animate-pulse'
                          )}
                        >
                          {status === 'Pass' && <CheckCircle2 className="w-4 h-4" />}
                          {status === 'Fail' && <XCircle className="w-4 h-4" />}
                          {status === 'Needs Review' && <AlertCircle className="w-4 h-4" />}
                        </button>
                      </TableCell>
                    );
                  })}
                  <TableCell className="p-2 text-center">
                    {bidder.id === 'bid_5' ? (
                      <div className="flex items-center justify-center gap-1.5 px-1.5 py-0.5 rounded-sm bg-rose-500/5 border border-rose-500/20 w-fit mx-auto group/warn cursor-help relative">
                        <ShieldAlert className="w-3 h-3 text-rose-500" />
                        <span className="text-[8px] font-mono font-black text-rose-600 uppercase">Anomalous</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1.5 text-slate-300">
                        <div className="w-1 h-1 rounded-full bg-emerald-500/30" />
                        <span className="text-[8px] font-mono uppercase tracking-tighter">SECURE</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="p-2">
                    <div className="flex items-center justify-center gap-2">
                      {bidder.overallStatus === 'Fail' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setRejectionBidder(bidder);
                            setIsRejectionModalOpen(true);
                          }}
                          className="h-6 text-[8px] font-mono font-black uppercase tracking-widest border border-rose-200 text-rose-600 hover:bg-rose-50 px-2 shadow-sm"
                        >
                          ISSUE REJECTION
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right p-2">
                    {getStatusBadge(bidder.overallStatus)}
                  </TableCell>
                </TableRow>
              )) : null}
            </TableBody>
          </Table>
        </div>
      </Card>

      {isModalOpen && selectedBidder && selectedCriterion && (
        <HITLModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bidderName={selectedBidder.name}
          criterion={selectedCriterion}
          isFraud={isFraudModalOpen && selectedBidder.id === 'bid_4'}
        />
      )}

      {/* Rejection / Explainability Modal with Decision Tree */}
      <Dialog open={isRejectionModalOpen} onOpenChange={setIsRejectionModalOpen}>
        <DialogContent className="max-w-2xl bg-white border-stone-200 shadow-2xl p-0 overflow-hidden">
          <DialogHeader className="p-6 bg-slate-50 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500 rounded shadow-glow-rose">
                <ShieldX className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-serif font-black uppercase text-slate-900 tracking-tight">Technical Rejection Ledger</DialogTitle>
                <DialogDescription className="text-[10px] font-mono uppercase text-slate-500">Deterministic Logic Audit // Bidder ID: {rejectionBidder?.id}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Activity className="w-3 h-3" />
                Visual Decision Path [No Black Box]
              </h4>
              
              <div className="flex items-center justify-between gap-2 relative">
                {/* Rule Block */}
                <div className="flex-1 p-4 bg-slate-900 border-2 border-slate-800 rounded-sm shadow-xl relative z-10 group">
                  <div className="text-[8px] font-mono text-slate-500 uppercase mb-1">REGULATORY RULE</div>
                  <div className="text-[11px] font-mono font-bold text-slate-100 uppercase leading-tight">Min Turnover Requirement: ₹5.00 CR</div>
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-800 rotate-45 border-r border-t border-slate-700 hidden group-hover:block" />
                </div>

                <ChevronRight className="w-5 h-5 text-stone-300 shrink-0" />

                {/* Extraction Block */}
                <div className="flex-1 p-4 bg-white border-2 border-slate-900 rounded-sm shadow-xl relative z-10 group">
                  <div className="text-[8px] font-mono text-slate-500 uppercase mb-1">EXTRACTED VALUE [AI]</div>
                  <div className="text-[11px] font-mono font-black text-rose-600 uppercase leading-tight">Calculated Turnover: ₹3.20 CR</div>
                  <Badge className="absolute -top-2 -right-2 bg-rose-500 text-white text-[8px] font-mono px-1.5 h-4 border-2 border-white">SHORTFALL</Badge>
                </div>

                <ChevronRight className="w-5 h-5 text-stone-300 shrink-0" />

                {/* Result Block */}
                <div className="flex-1 p-4 bg-rose-50 border-2 border-rose-600 rounded-sm shadow-xl relative z-10">
                  <div className="text-[8px] font-mono text-rose-500 uppercase mb-1">FINAL DETERMINATION</div>
                  <div className="text-[11px] font-mono font-black text-rose-900 uppercase leading-tight">AUTOMATIC DISQUALIFICATION</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded border border-stone-200 space-y-3">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <h5 className="text-[9px] font-mono font-black text-slate-900 uppercase tracking-widest">Audit Narrative</h5>
              </div>
              <p className="text-xs font-serif italic text-slate-600 leading-relaxed font-medium">
                "The entity failed to meet the mandatory financial eligibility criteria established in GFR Clause 17.2. The shortfall of <span className="font-mono font-black text-rose-600">₹1.80 CR</span> is outside the permissible deviation limit. No manual override is authorized for this node."
              </p>
            </div>
          </div>

          <DialogFooter className="p-4 bg-slate-50 border-t border-stone-100 flex gap-3">
            <Button variant="ghost" onClick={() => setIsRejectionModalOpen(false)} className="h-8 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Close Audit
            </Button>
            <Button className="h-8 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-mono uppercase tracking-widest px-6 shadow-xl">
              Execute Official Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
