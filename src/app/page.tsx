import TenderUpload from '@/components/TenderUpload';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-4xl mx-auto space-y-12 py-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-black uppercase tracking-widest text-emerald-800 animate-in fade-in zoom-in duration-1000">
            Enterprise Procurement Suite
          </div>
          <h1 className="text-5xl font-black text-stone-900 uppercase tracking-tighter leading-none">
            Procure<span className="text-emerald-700">AI</span> Portal
          </h1>
          <p className="text-stone-500 font-medium italic text-lg">
            Intelligent tender understanding and bidder evaluation for technical compliance.
          </p>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-2xl blur opacity-5 group-hover:opacity-10 transition duration-1000" />
          <TenderUpload />
        </div>

        <div className="grid grid-cols-3 gap-6 pt-12 border-t border-stone-200">
          {[
            { label: 'Document Vetting', desc: 'Pre-flight analysis of restrictive clauses.' },
            { label: 'RAG Evaluation', desc: 'Real-time bidder compliance matrix.' },
            { label: 'Immutable Audit', desc: 'Blockchain-anchored event ledger.' }
          ].map((feature) => (
            <div key={feature.label} className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-800">{feature.label}</h4>
              <p className="text-xs text-stone-500 font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
