'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  ShieldCheck, 
  Zap, 
  Search, 
  FileText, 
  Scale, 
  History, 
  Globe,
  Database,
  Lock,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function FeaturesPage() {
  const { t } = useAppContext();

  const features = [
    {
      title: "AI Criterion Extraction",
      description: "Gemini 2.0 Flash automatically parses tender PDFs to extract financial, technical, and statutory eligibility criteria with 98% confidence.",
      icon: Bot,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Bidder Intelligence Matrix",
      description: "A centralized high-density grid for comparative analysis of all bidders against extracted criteria, featuring real-time risk scoring.",
      icon: Scale,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: "Multi-Language Support",
      description: "Full localization for 10 major Indian languages, enabling regional officers to evaluate tenders in their preferred language.",
      icon: Globe,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      title: "Pre-Flight Draft Analyzer",
      description: "Vets tender drafts for restrictive clauses or GFR violations before publication to prevent vendor bias and legal challenges.",
      icon: Search,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      title: "Immutable Audit Ledger",
      description: "Every decision is cryptographically hashed and anchored to a private blockchain, ensuring a tamper-proof record for judicial review.",
      icon: Lock,
      color: "text-slate-900",
      bg: "bg-slate-100"
    },
    {
      title: "Live AI Audit Stream",
      description: "Watch real-time extraction and verification logs as the AI processes bidder documents via high-speed WebSockets.",
      icon: Zap,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Fraud & Anomaly Detection",
      description: "Cross-references GSTN, PAN, and project history to detect predatory pricing, shell companies, and document forgery.",
      icon: ShieldCheck,
      color: "text-rose-600",
      bg: "bg-rose-50"
    },
    {
      title: "Human-In-The-Loop (HITL)",
      description: "A collaborative interface where AI provides historical precedents and legal guidance for human evaluators to make the final call.",
      icon: MessageSquare,
      color: "text-cyan-600",
      bg: "bg-cyan-50"
    },
    {
      title: "Dual-Role Governance",
      description: "Strict 'Maker-Checker' workflow separating Junior Evaluators from Procurement Directors for enhanced integrity.",
      icon: History,
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          Enterprise Capabilities
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Platform Features</h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          ProcureAI combines state-of-the-art AI with rigorous government compliance standards to transform tender evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <div className={`w-12 h-12 ${feature.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
            <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 ${feature.bg.replace('50', '500')}`} />
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900 text-white border-none overflow-hidden relative">
        <CardContent className="p-12 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Built for Data Sovereignty</h2>
            <p className="text-slate-400 leading-relaxed">
              ProcureAI supports both high-performance Cloud LLM (Gemini 2.0) and high-security 
              <span className="text-blue-400 font-bold"> Air-Gapped Local LLM</span> deployments to ensure 
              national data remains within secure government intranets.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-800 px-4 py-2 rounded-lg">
                <Database className="w-4 h-4" />
                Regional Mumbai DC
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-800 px-4 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                STQC Certified
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-48 h-48 bg-blue-600/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-32 h-32 bg-blue-600/40 rounded-full flex items-center justify-center">
                <Lock className="w-16 h-16 text-blue-400" />
              </div>
            </div>
          </div>
        </CardContent>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -ml-32 -mb-32" />
      </Card>
    </div>
  );
}
