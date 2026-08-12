import React, { useEffect, useState } from 'react';
import { Loader2, Cpu, Calendar, Code, Video, CheckCircle2 } from 'lucide-react';

interface Step9Props {
  daysToPrepare: number;
  targetRole: string;
}

export const Step9PlanGenerator: React.FC<Step9Props> = ({ daysToPrepare, targetRole }) => {
  const [stage, setStage] = useState(0);

  const stages = [
    'Synthesizing Resume & Target Skills Vector...',
    `Structuring ${daysToPrepare}-Day Timeline into Monthly Phases...`,
    'Mapping Daily Lifecycles (Understand -> Implement -> Build -> Test)...',
    'Generating High-Employability Industry Projects...',
    'Building 26-Week Public Technical Content Strategy...',
    'Finalizing Career Readiness Metrics...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 font-mono text-center">
      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
        <Cpu className="w-10 h-10 text-cyan-400 animate-pulse" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-100 mb-2">
        GENERATING CAREER TRANSITION PLAN
      </h2>
      <p className="text-xs text-slate-400 max-w-md mx-auto mb-8">
        AI is crafting a personalized {daysToPrepare}-day roadmap for <strong className="text-cyan-300">{targetRole}</strong>.
      </p>

      {/* Progress Bar & Stage Console */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-4 text-left shadow-2xl">
        <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            SYNTHESIZING ROADMAP
          </span>
          <span className="text-cyan-400">{Math.round(((stage + 1) / stages.length) * 100)}%</span>
        </div>

        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
            style={{ width: `${Math.round(((stage + 1) / stages.length) * 100)}%` }}
          />
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{stages[stage]}</span>
        </div>
      </div>
    </div>
  );
};
