import React from 'react';
import { motion } from 'motion/react';
import { TransitionPlan } from '../../types';
import { ShieldCheck, CheckCircle2, Sparkles, Edit3, RefreshCw, ArrowRight, Layers, Video, Clock, Activity, Check } from 'lucide-react';

interface Step13Props {
  plan: TransitionPlan;
  strongSkills: string[];
  selectedSkills: string[];
  onFinalize: () => void;
  onModify: () => void;
  onRegenerate: () => void;
  isLoading?: boolean;
}

export const Step13PlanReview: React.FC<Step13Props> = ({
  plan,
  strongSkills,
  selectedSkills,
  onFinalize,
  onModify,
  onRegenerate,
  isLoading,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
      {/* Title */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5" />
          Onboarding Phase 13 / 14 — Plan Review
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-100">
          YOUR PROPOSED CAREER TRANSITION PLAN
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Review your personalized roadmap before locking it into the command center.
        </p>
      </div>

      {/* Plan Details Grid */}
      <div className="space-y-6 mb-8">
        {/* Core Metadata Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
          <div>
            <span className="text-[10px] uppercase text-slate-500 tracking-wider font-bold">Target Role</span>
            <p className="text-sm font-bold text-cyan-300 truncate">{plan.targetRole}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-500 tracking-wider font-bold">Preparation Days</span>
            <p className="text-sm font-bold text-slate-100">{plan.preparationDays} Days</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-500 tracking-wider font-bold">Weekly Workload</span>
            <p className="text-sm font-bold text-amber-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> ~{plan.weeklyLoadHours} hrs/week
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-500 tracking-wider font-bold">Job Readiness</span>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> {plan.currentReadinessPercentage}% → {plan.projectedReadinessPercentage}%
            </p>
          </div>
        </div>

        {/* Skills & New Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              CURRENT FOUNDATION SKILLS
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {strongSkills.map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
            <h3 className="text-xs uppercase font-bold text-cyan-300 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              NEW TARGET SKILLS TO MASTER
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedSkills.map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-400/50 text-xs font-bold shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                  + {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Preview */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h3 className="text-xs uppercase font-bold text-slate-300 tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            PLANNED HIGH-EMPLOYABILITY PROJECTS ({plan.projects?.length || 4})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(plan.projects || []).map((proj, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <p className="text-xs font-bold text-cyan-300">{idx + 1}. {proj.title}</p>
                <p className="text-[11px] text-slate-400 line-clamp-2">{proj.description}</p>
                <div className="pt-1 flex flex-wrap gap-1">
                  {proj.skills.slice(0, 4).map((sk, sidx) => (
                    <span key={sidx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content & Monthly Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="text-xs uppercase font-bold text-slate-300 tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-400" />
              TECHNICAL CONTENT STRATEGY
            </h3>
            <p className="text-sm font-bold text-slate-200">
              {plan.contentCalendar?.length || 26} Technical Videos Planned
            </p>
            <p className="text-[11px] text-slate-400">
              Target: 1 technical video / week establishing public industry proof on YouTube / LinkedIn.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="text-xs uppercase font-bold text-slate-300 tracking-wider">
              ROADMAP STRUCTURE
            </h3>
            <p className="text-sm font-bold text-cyan-300">
              {plan.months?.length || 6} Months Phase Hierarchy
            </p>
            <p className="text-[11px] text-slate-400">
              Covers daily lifecycles: Learn → Implement → Practice → Document → Publish.
            </p>
          </div>
        </div>
      </div>

      {/* Does this plan look right question */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-center space-y-4 shadow-[0_0_30px_rgba(6,182,212,0.15)] font-mono">
        <h3 className="text-lg font-extrabold uppercase text-slate-100 tracking-wider">
          DOES THIS PLAN LOOK RIGHT?
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* FINALIZE PLAN */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onFinalize}
            disabled={isLoading}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold uppercase text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>[ ✓ FINALIZE PLAN ]</span>
          </motion.button>

          {/* MODIFY PLAN */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onModify}
            disabled={isLoading}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold uppercase text-xs text-cyan-300 bg-slate-950 border border-cyan-500/40 hover:bg-slate-900 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
          >
            <Edit3 className="w-4 h-4 text-cyan-400" />
            <span>[ ✎ MODIFY PLAN ]</span>
          </motion.button>

          {/* REGENERATE */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onRegenerate}
            disabled={isLoading}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold uppercase text-xs text-slate-400 bg-slate-950 border border-slate-800 hover:text-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            <span>[ ↻ REGENERATE ]</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
