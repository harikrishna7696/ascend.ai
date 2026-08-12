import React from 'react';
import { ArrowRight, GitBranch, Shield, Zap, Layers, CheckCircle2, Cpu } from 'lucide-react';

interface Step8Props {
  selectedSkills: string[];
  targetRole: string;
  onContinue: () => void;
}

export const Step8GapAnalysis: React.FC<Step8Props> = ({
  selectedSkills,
  targetRole,
  onContinue,
}) => {
  const stepsFlow = [
    { label: 'CURRENT PROFILE', sub: 'Strong CV Foundation' },
    { label: 'TARGET JOB MARKET', sub: targetRole },
    { label: 'SKILL GAP VECTOR', sub: `${selectedSkills.length} Core Target Skills` },
    { label: 'LEARNING MILESTONES', sub: 'Understand -> Build -> Test' },
    { label: 'PROJECT PIPELINE', sub: 'Industry Proof Projects' },
    { label: 'PORTFOLIO PROOF', sub: 'Github + Tech Video Series' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
      {/* Title */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <GitBranch className="w-3.5 h-3.5" />
          Onboarding Phase 8 / 14 — Gap Vector Matrix
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-100">
          CAREER GAP ANALYSIS
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Translating targeted skill gaps into tangible learning, project, and public proof milestones.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 mb-8 shadow-inner">
        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block mb-4">
          TRANSFORMATION VECTOR ARCHITECTURE
        </span>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {stepsFlow.map((st, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1 relative"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-bold text-xs flex items-center justify-center mx-auto">
                {idx + 1}
              </div>
              <p className="text-[10px] font-bold text-slate-200 uppercase leading-tight pt-1">
                {st.label}
              </p>
              <p className="text-[9px] text-cyan-400 truncate">{st.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Each Selected Skill Matters */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 mb-8">
        <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          WHY YOUR SELECTED TARGET SKILLS MATTER
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {selectedSkills.map((skill, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                {skill}
              </span>
              <p className="text-[11px] text-slate-400 leading-normal">
                {skill === 'CUDA' && 'Unlocks parallel GPU execution for sub-millisecond multi-camera video inference.'}
                {skill === 'ROS2' && 'Provides standardized robotics middleware for sensor streaming, publisher nodes, and autonomous control.'}
                {skill === 'Tracking' && 'Enables DeepSORT and multi-object tracking under heavy occlusion in tactical surveillance.'}
                {skill === 'SLAM' && 'Vital for autonomous navigation and target localization in GPS-denied tactical environments.'}
                {skill === 'C++' && 'Industry standard for high-throughput, low-latency production deployment.'}
                {skill === 'Transformers' && 'State-of-the-art vision transformer models for spatial-temporal scene understanding.'}
                {!['CUDA', 'ROS2', 'Tracking', 'SLAM', 'C++', 'Transformers'].includes(skill) && 'Essential competency required by leading defense and AI engineering teams.'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="w-full py-4 px-6 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2"
      >
        <span>GENERATE PERSONALIZED TRANSITION PLAN</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
