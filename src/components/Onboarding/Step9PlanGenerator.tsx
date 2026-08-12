import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, Cpu, Calendar, Code, Video, CheckCircle2, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface Step9Props {
  daysToPrepare: number;
  targetRole: string;
}

export const Step9PlanGenerator: React.FC<Step9Props> = ({ daysToPrepare, targetRole }) => {
  const [stage, setStage] = useState(0);

  const stages = [
    { text: 'Synthesizing Resume & Target Skills Vector...', icon: Cpu },
    { text: `Structuring ${daysToPrepare}-Day Timeline into Monthly Phases...`, icon: Calendar },
    { text: 'Mapping Daily Lifecycles (Understand -> Implement -> Build -> Test)...', icon: Code },
    { text: 'Generating High-Employability Industry Projects...', icon: Layers },
    { text: 'Building 26-Week Public Technical Content Strategy...', icon: Video },
    { text: 'Finalizing Career Readiness Metrics & System Architecture...', icon: ShieldCheck },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.round(((stage + 1) / stages.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto px-4 py-12 font-mono text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500/20 via-sky-600/20 to-indigo-600/30 border border-cyan-400/40 shadow-[0_0_40px_rgba(6,182,212,0.35)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-3xl border border-dashed border-cyan-400/40"
        />
        <Cpu className="w-12 h-12 text-cyan-400 animate-pulse" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
        </span>
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs uppercase tracking-widest mb-3">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        AI Career Synthesis Engine
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-100 mb-2">
        GENERATING CAREER TRANSITION PLAN
      </h2>
      <p className="text-xs text-slate-400 max-w-md mx-auto mb-8">
        AI is crafting a personalized <strong className="text-cyan-300">{daysToPrepare}-day roadmap</strong> for <strong className="text-cyan-300">{targetRole}</strong>.
      </p>

      {/* Progress Bar & Stage Console */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-5 text-left shadow-[0_0_35px_rgba(6,182,212,0.15)] backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            SYNTHESIZING ROADMAP
          </span>
          <span className="text-cyan-400 font-extrabold text-sm">{progressPercent}%</span>
        </div>

        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Stages Checklist */}
        <div className="space-y-2 pt-1">
          {stages.map((s, idx) => {
            const Icon = s.icon;
            const isDone = stage > idx;
            const isCurrent = stage === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : isCurrent
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                  ) : (
                    <Icon className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className="truncate text-[11px] font-mono">{s.text}</span>
                </div>
                {isDone && <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono">COMPLETE</span>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
