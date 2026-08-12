import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SkillItem } from '../../types';
import { CheckSquare, Square, CheckCircle2, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface Step7Props {
  initialSkills: SkillItem[];
  onContinue: (selectedSkillNames: string[]) => void;
}

export const Step7SkillSelection: React.FC<Step7Props> = ({ initialSkills, onContinue }) => {
  const normalizeSkills = (items: SkillItem[]) => {
    return (items || []).map((s, idx) => ({
      ...s,
      id: s.id || `sk_${(s.name || 'skill').toLowerCase().replace(/[^a-z0-9]/g, '')}_${idx}`,
    }));
  };

  const [skills, setSkills] = useState<SkillItem[]>(() => normalizeSkills(initialSkills));

  useEffect(() => {
    if (initialSkills && initialSkills.length > 0) {
      setSkills(normalizeSkills(initialSkills));
    }
  }, [initialSkills]);

  const toggleSkill = (skillId: string, skillName: string) => {
    setSkills((prevSkills) =>
      prevSkills.map((s) => {
        const isMatch = (skillId && s.id === skillId) || (skillName && s.name === skillName);
        return isMatch ? { ...s, isSelected: !s.isSelected } : s;
      })
    );
  };

  const handleSelectAllHighPriority = () => {
    setSkills((prevSkills) =>
      prevSkills.map((s) =>
        s.category === 'high_priority' ? { ...s, isSelected: true } : s
      )
    );
  };

  const handleSubmit = () => {
    const selected = skills.filter((s) => s.isSelected).map((s) => s.name);
    onContinue(selected.length > 0 ? selected : ['CUDA', 'ROS2', 'Tracking', 'SLAM']);
  };

  const strongSkills = skills.filter((s) => s.category === 'strong');
  const gapSkills = skills.filter((s) => s.category === 'high_priority');
  const optionalSkills = skills.filter((s) => s.category === 'optional');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-mono">
      {/* Title */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          Onboarding Phase 7 / 14 — Skill Targeting
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-100">
          WHAT DO YOU WANT TO TARGET?
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          You decide what you want to master. We highlight high-priority market gaps based on live job data.
        </p>

        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSelectAllHighPriority}
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 hover:bg-cyan-900 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)] cursor-pointer"
          >
            [ SELECT ALL HIGH PRIORITY GAPS ]
          </motion.button>
        </div>
      </div>

      <div className="space-y-8 mb-8">
        {/* Category 1: ALREADY STRONG */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            ALREADY STRONG SKILLS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {strongSkills.map((s) => (
              <div
                key={s.id}
                onClick={() => toggleSkill(s.id, s.name)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  s.isSelected
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  {s.isSelected ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <div>
                    <span className="font-bold text-xs">{s.name}</span>
                    <p className="text-[10px] text-slate-500">Market Demand: {s.marketDemandPercentage}%</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  {s.currentLevelPercentage}% Level
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category 2: HIGH PRIORITY GAPS */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-4 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
            <AlertCircle className="w-4 h-4 text-cyan-400 animate-pulse" />
            HIGH PRIORITY MARKET GAPS (RECOMMENDED)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gapSkills.map((s) => (
              <div
                key={s.id}
                onClick={() => toggleSkill(s.id, s.name)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  s.isSelected
                    ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {s.isSelected ? (
                      <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                    <span className="font-bold text-sm text-slate-100">{s.name}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold border border-cyan-500/30">
                    GAP: {s.gapPercentage}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block">Market Demand</span>
                    <span className="font-bold text-slate-300">{s.marketDemandPercentage}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Your Current Level</span>
                    <span className="font-bold text-amber-400">{s.currentLevelPercentage}%</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-tight pt-1">
                  {s.whyItMatters}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category 3: OPTIONAL / EMERGING */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Sparkles className="w-4 h-4" />
            OPTIONAL / NEXT-GEN TARGETS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {optionalSkills.map((s) => (
              <div
                key={s.id}
                onClick={() => toggleSkill(s.id, s.name)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  s.isSelected
                    ? 'bg-indigo-950/40 border-indigo-400 text-indigo-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  {s.isSelected ? (
                    <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <div>
                    <span className="font-bold text-xs">{s.name}</span>
                    <p className="text-[10px] text-slate-500">{s.whyItMatters.slice(0, 45)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        onClick={handleSubmit}
        className="relative w-full py-4 px-6 rounded-2xl text-sm font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all flex items-center justify-center gap-2 overflow-hidden cursor-pointer group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        />
        <span className="relative z-10 font-mono">GENERATE CAREER GAP ANALYSIS</span>
        <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowRight className="w-4 h-4 text-slate-950 relative z-10" />
        </motion.div>
      </motion.button>
    </div>
  );
};
