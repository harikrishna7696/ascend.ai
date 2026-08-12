import React from 'react';
import { Cpu, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { SkillItem } from '../../types';

interface SkillGapViewProps {
  skills: SkillItem[];
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({ skills }) => {
  return (
    <div className="space-y-6 font-mono">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30">
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
          <Cpu className="w-4 h-4" /> SKILL GAP MATRIX
        </div>
        <h2 className="text-2xl font-extrabold uppercase text-slate-100">
          COMPETENCY VECTOR ANALYSIS
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Comparing your current resume skills against live job market demands.
        </p>
      </div>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-100">{skill.name}</h3>
                <span className="text-[10px] text-slate-500 uppercase">
                  Category: {skill.category.replace('_', ' ')}
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                skill.gapPercentage > 40
                  ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
              }`}>
                GAP: {skill.gapPercentage}%
              </span>
            </div>

            {/* Bars */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Current Mastery Level</span>
                  <span className="text-amber-400 font-bold">{skill.currentLevelPercentage}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: `${skill.currentLevelPercentage}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Target Market Level</span>
                  <span className="text-cyan-400 font-bold">{skill.targetLevelPercentage}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full"
                    style={{ width: `${skill.targetLevelPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 pt-2 border-t border-slate-800/80 leading-relaxed">
              <strong className="text-cyan-300">Why it matters:</strong> {skill.whyItMatters}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
