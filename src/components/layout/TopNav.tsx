'use client';

import { Search, Bell, HelpCircle, ChevronDown, UserCircle, ShieldAlert, Activity } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRole } from '@/context/RoleContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopNav() {
  const { role, setRole } = useRole();

  return (
    <header className="h-14 border-b border-white/5 bg-[#020410] sticky top-0 z-30 flex items-center justify-between px-8 select-none">
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
          <Input 
            placeholder="Search Intelligence Ledger..." 
            className="pl-9 bg-slate-900/50 border-white/5 text-slate-200 placeholder:text-slate-700 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/50 rounded-md h-8 text-[11px] font-mono uppercase tracking-widest transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-rose-500/10 text-rose-500 rounded border border-rose-500/20 glow-urgent animate-pulse">
          <Activity className="w-3 h-3" />
          <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em]">Priority Triage Required</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div 
              role="button"
              className={cn(
                "group/button inline-flex shrink-0 items-center justify-center rounded border border-white/5 bg-slate-900/40 text-[10px] font-mono uppercase tracking-widest transition-all outline-none select-none active:scale-[0.98] cursor-pointer text-slate-400 gap-3 px-3 h-8 hover:bg-slate-900 hover:text-slate-100 shadow-2xl"
              )}
            >
              <UserCircle className="w-3.5 h-3.5" />
              <div className="text-left">
                <div className="text-[10px] font-serif font-bold leading-none">
                  {role === 'Evaluator' ? 'Officer Smith' : 'Director Varma'}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-600" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-[#020410] border-white/5 text-slate-400 shadow-2xl backdrop-blur-3xl">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-slate-600 text-[9px] font-mono uppercase tracking-[0.3em] px-4 py-3">Authentication Levels</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem 
                onClick={() => setRole('Evaluator')}
                className="gap-3 focus:bg-slate-900 focus:text-slate-100 cursor-pointer p-4 transition-all"
              >
                <div className={cn("w-1.5 h-1.5 rounded-full", role === 'Evaluator' ? "bg-emerald-500 shadow-glow-emerald" : "bg-transparent border border-slate-800")} />
                <div className="flex flex-col">
                  <span className="font-serif font-black text-xs uppercase tracking-tight">Technical Analyst</span>
                  <span className="text-[9px] font-mono text-slate-600 uppercase">Operational Node Control</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setRole('Director')}
                className="gap-3 focus:bg-slate-900 focus:text-slate-100 cursor-pointer p-4 transition-all"
              >
                <div className={cn("w-1.5 h-1.5 rounded-full", role === 'Director' ? "bg-emerald-500 shadow-glow-emerald" : "bg-transparent border border-slate-800")} />
                <div className="flex flex-col">
                  <span className="font-serif font-black text-xs uppercase tracking-tight">Command Director</span>
                  <span className="text-[9px] font-mono text-slate-600 uppercase">Final Authorization Node</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-6 w-px bg-white/5 mx-1" />

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="relative h-8 w-8 text-slate-600 hover:text-slate-100 hover:bg-slate-900 rounded">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-[#020410]" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-slate-100 hover:bg-slate-900 rounded">
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
