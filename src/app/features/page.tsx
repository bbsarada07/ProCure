'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Database,
  Lock,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { platformFeatures } from '@/lib/featuresData';

export default function FeaturesPage() {
  const { t } = useAppContext();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-16 py-8">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Enterprise Capabilities
        </motion.div>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-black text-slate-900 tracking-tight"
        >
          Platform Features
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-500 leading-relaxed"
        >
          ProcureAI combines state-of-the-art AI with rigorous government compliance standards to transform the future of procurement.
        </motion.p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {platformFeatures.map((feature, i) => (
          <motion.div key={i} variants={item}>
            <Card className="h-full border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden bg-white">
              <CardHeader className="pb-2">
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
              <div className={`h-1.5 w-0 group-hover:w-full transition-all duration-700 ${feature.color.replace('text', 'bg')}`} />
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-slate-900 text-white border-none overflow-hidden relative group">
          <CardContent className="p-16 flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">Built for Data Sovereignty</h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                  ProcureAI supports both high-performance Cloud LLM (Gemini 2.0) and high-security 
                  <span className="text-blue-400 font-bold italic"> Air-Gapped Local LLM</span> deployments 
                  to ensure national security data remains within protected government intranets.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-300 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-xl hover:bg-white/10 transition-colors duration-300">
                  <Database className="w-5 h-5 text-blue-400" />
                  Regional Mumbai DC
                </div>
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-300 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-xl hover:bg-white/10 transition-colors duration-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  STQC Certified
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 flex justify-center relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full animate-pulse" />
              <div className="relative w-56 h-56 bg-blue-600/10 rounded-3xl border border-white/10 flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-transform duration-700 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent" />
                <Lock className="w-24 h-24 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
              </div>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] -mr-48 -mt-48 group-hover:bg-blue-600/20 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 blur-[120px] -ml-48 -mb-48 group-hover:bg-indigo-600/20 transition-colors duration-700" />
        </Card>
      </motion.div>
    </div>
  );
}
