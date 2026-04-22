'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  History, 
  Settings, 
  ShieldCheck,
  Sparkles,
  Command,
  ShieldAlert,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const navItems = [
  { name: 'Program Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Strategic Sourcing', href: '/tender/crpf-2026/criteria', icon: Command },
  { name: 'Evaluation Matrix', href: '/tender/crpf-2026/evaluation', icon: Users },
  { name: 'Draft Analyzer', href: '/tender/crpf-2026/draft-analyzer', icon: Sparkles },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Risk Intelligence', href: '/risk-intelligence', icon: ShieldAlert },
  { name: 'Compliance Ledger', href: '/tender/crpf-2026/audit', icon: History },
  { name: 'System Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-[#020410] text-slate-400 select-none">
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-1.5 border border-slate-800 rounded shadow-2xl bg-slate-900">
            <ShieldCheck className="w-5 h-5 text-slate-200" />
          </div>
          <h1 className="text-xl font-serif text-slate-100 tracking-tighter">
            ProCure<span className="text-slate-500 italic ml-0.5">AI</span>
          </h1>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em]">Defense Registry</p>
          <p className="text-[9px] font-mono text-emerald-900 uppercase font-black">Secure Node: 0x442</p>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <nav className="space-y-0.5 py-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-4 px-4 py-6 h-10 text-slate-500 hover:text-slate-100 hover:bg-slate-900/50 transition-all rounded-md group",
                    isActive && "bg-slate-900/40 text-slate-100 font-medium"
                  )}
                >
                  <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-emerald-500" : "text-slate-600 group-hover:text-slate-400")} />
                  <span className="text-xs uppercase tracking-widest">{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="mt-auto p-6">
        <div className="flex items-center gap-4 group cursor-pointer transition-opacity hover:opacity-80">
          <div className="relative">
            <div className="w-9 h-9 rounded bg-slate-800 flex items-center justify-center text-[10px] font-mono font-bold text-slate-400 border border-slate-700">
              OS
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#020410] rounded-full" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[11px] font-serif font-bold text-slate-200 truncate">Officer Smith</p>
            <p className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter truncate">Command Division</p>
          </div>
        </div>
      </div>
    </div>
  );
}
