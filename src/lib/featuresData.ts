import { 
  Bot, 
  ShieldCheck, 
  Zap, 
  Search, 
  Scale, 
  History, 
  Globe,
  Lock,
  MessageSquare,
  Share2,
  GitBranch,
  RefreshCcw,
  LayoutDashboard,
  LucideIcon
} from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export const platformFeatures: Feature[] = [
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
    icon: LayoutDashboard,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    title: "Multi-Language Support",
    description: "Full localization for 10 major Indian languages, enabling regional officers to evaluate tenders in their native tongue.",
    icon: Globe,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    title: "Cartel Network Graphing",
    description: "Detects 'ring bidding' by highlighting shared IP addresses, CA registrations, or overlapping directors across competing bids.",
    icon: Share2,
    color: "text-rose-600",
    bg: "bg-rose-50"
  },
  {
    title: "Visual Decision Trees",
    description: "Replaces 'black-box' AI logic with renderable flowcharts proving exactly why a condition failed or passed for every bidder.",
    icon: GitBranch,
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    title: "Vendor Resubmission Portal",
    description: "Secure, time-limited links for bidders to re-upload illegible documents, preventing unfair disqualifications due to scan quality.",
    icon: RefreshCcw,
    color: "text-cyan-600",
    bg: "bg-cyan-50"
  },
  {
    title: "Pre-Flight Draft Analyzer",
    description: "Vets tender drafts for restrictive clauses or GFR violations before publication to prevent vendor bias and legal challenges.",
    icon: Search,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    title: "Immutable Audit Ledger",
    description: "Every decision is cryptographically hashed and anchored to a private blockchain, ensuring a tamper-proof record for judicial review.",
    icon: Lock,
    color: "text-slate-900",
    bg: "bg-slate-100"
  },
  {
    title: "Fraud & Anomaly Detection",
    description: "Cross-references GSTN, PAN, and history to detect predatory pricing, shell companies, and fraudulent document patterns.",
    icon: ShieldCheck,
    color: "text-red-600",
    bg: "bg-red-50"
  },
  {
    title: "Human-In-The-Loop (HITL)",
    description: "A collaborative interface where AI provides historical precedents and legal guidance for human evaluators to make final calls.",
    icon: MessageSquare,
    color: "text-violet-600",
    bg: "bg-violet-50"
  },
  {
    title: "Dual-Role Governance",
    description: "Strict 'Maker-Checker' workflow separating Junior Evaluators from Procurement Directors for enhanced integrity and sign-off.",
    icon: History,
    color: "text-slate-600",
    bg: "bg-slate-100"
  },
  {
    title: "Live AI Audit Stream",
    description: "Watch real-time extraction and verification logs as the AI processes bidder documents via high-speed WebSockets.",
    icon: Zap,
    color: "text-yellow-600",
    bg: "bg-yellow-50"
  }
];
