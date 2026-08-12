import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TransitionPlan, PlanVersion } from '../../types';
import { Bot, Sparkles, Send, CheckCircle2, ArrowLeft, Loader2, GitBranch, Clock, Activity } from 'lucide-react';

interface Step14Props {
  currentPlan: TransitionPlan;
  planVersions: PlanVersion[];
  onApplyModification: (promptText: string) => void;
  onSelectVersion: (version: PlanVersion) => void;
  onFinalize: () => void;
  onBackToReview: () => void;
  isLoading: boolean;
}

export const Step14PlanModify: React.FC<Step14Props> = ({
  currentPlan,
  planVersions,
  onApplyModification,
  onSelectVersion,
  onFinalize,
  onBackToReview,
  isLoading,
}) => {
  const [promptText, setPromptText] = useState('');

  const examplePrompts = [
    'I can only study 2 hours per day.',
    'I want more focus on C++ and CUDA.',
    'Remove ROS2 and add VLM & Multimodal AI.',
    'I want interview preparation in the final month.',
    'Reduce the overall weekly workload to 12 hours/week.',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() || isLoading) return;
    onApplyModification(promptText.trim());
    setPromptText('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
      {/* Back button & Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBackToReview}
          className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Plan Review
        </motion.button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs uppercase tracking-widest">
          <Bot className="w-3.5 h-3.5" /> Conversational AI Plan Editor
        </div>
      </div>

      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-100">
          MODIFY YOUR TRANSITION ROADMAP
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Instruct the AI on custom constraints, time budgets, or skill adjustments. A new plan version will be generated for comparison.
        </p>
      </div>

      {/* Plan Version Selector */}
      {planVersions.length > 1 && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 mb-6 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" /> Plan Version History ({planVersions.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {planVersions.map((v) => (
              <motion.button
                key={v.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectVersion(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  v.versionNumber === (currentPlan.version || 1)
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                Version {v.versionNumber} {v.versionNumber === (currentPlan.version || 1) ? '(Active)' : ''}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Active Plan Metrics Summary */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-slate-500 block text-[10px]">Active Version</span>
          <span className="font-bold text-cyan-300">Plan V{currentPlan.version || 1}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">Preparation Days</span>
          <span className="font-bold text-slate-100">{currentPlan.preparationDays} Days</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">Weekly Workload</span>
          <span className="font-bold text-amber-400">~{currentPlan.weeklyLoadHours} hrs/wk</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">Readiness Score</span>
          <span className="font-bold text-emerald-400">{currentPlan.projectedReadinessPercentage}% Target</span>
        </div>
      </div>

      {/* Example Prompt Chips */}
      <div className="space-y-2 mb-6">
        <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">
          Example Modification Requests:
        </span>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((p, idx) => (
            <motion.button
              key={idx}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPromptText(p)}
              className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs transition-all text-left cursor-pointer"
            >
              "{p}"
            </motion.button>
          ))}
        </div>
      </div>

      {/* Prompt Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="relative">
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="e.g. 'I can only study 2 hours per day. Focus more on C++ and interview prep in Month 6.'"
            rows={3}
            disabled={isLoading}
            className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 p-4 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 font-mono"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading || !promptText.trim()}
            className="absolute bottom-4 right-4 px-4 py-2 rounded-xl text-xs font-bold uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-40 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5 text-slate-950" />}
            <span>Apply Modification</span>
          </motion.button>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBackToReview}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          Review Full Plan (V{currentPlan.version})
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onFinalize}
          className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold uppercase text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 text-slate-950" />
          <span>[ ✓ FINALIZE PLAN & ENTER COMMAND CENTER ]</span>
        </motion.button>
      </div>
    </div>
  );
};
