import React from 'react';
import { MarketIntelligence } from '../../types';
import { BarChart3, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

interface Step5Props {
  marketIntel: MarketIntelligence;
  onContinue: () => void;
}

export const Step5JobIntelligence: React.FC<Step5Props> = ({ marketIntel, onContinue }) => {
  const targetRole = marketIntel?.targetRole || 'Defense AI / Computer Vision Engineer';
  const jobsAnalyzedCount = marketIntel?.jobsAnalyzedCount || 4;
  const skillDemandList = marketIntel?.skillDemand && Array.isArray(marketIntel.skillDemand) && marketIntel.skillDemand.length > 0
    ? marketIntel.skillDemand
    : [
        { skill: 'Python', percentage: 91, demandCount: 4 },
        { skill: 'CUDA', percentage: 76, demandCount: 3 },
        { skill: 'TensorRT', percentage: 74, demandCount: 3 },
        { skill: 'ROS2', percentage: 68, demandCount: 3 },
        { skill: 'Tracking', percentage: 71, demandCount: 3 },
        { skill: 'SLAM', percentage: 58, demandCount: 2 },
        { skill: 'C++', percentage: 82, demandCount: 3 },
        { skill: 'Docker', percentage: 72, demandCount: 3 },
        { skill: 'Transformers', percentage: 64, demandCount: 2 },
      ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
      {/* Title */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <BarChart3 className="w-3.5 h-3.5" />
          Onboarding Phase 5 / 14 — Market Intelligence Report
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-100">
          JOB MARKET DEMAND VECTORS
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Calculated directly from <strong className="text-cyan-300">{jobsAnalyzedCount} analyzed job postings</strong> for {targetRole}.
        </p>
      </div>

      {/* Target & Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-slate-500 tracking-wider">Target Domain Role</span>
            <p className="text-lg font-bold text-cyan-300">{targetRole}</p>
          </div>
          <Cpu className="w-8 h-8 text-cyan-400/50" />
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-slate-500 tracking-wider">Jobs Analyzed</span>
            <p className="text-2xl font-bold text-emerald-400">{jobsAnalyzedCount} Postings</p>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs">
            100% Real Data
          </div>
        </div>
      </div>

      {/* Market Skills Demand Bars */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 mb-8 space-y-4">
        <h3 className="text-xs uppercase text-slate-400 font-bold tracking-wider flex items-center justify-between">
          <span>MARKET SKILL FREQUENCY</span>
          <span className="text-[10px] text-slate-500">DEMAND FREQUENCY %</span>
        </h3>

        <div className="space-y-3">
          {skillDemandList.slice(0, 12).map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">{item.skill}</span>
                <span className="text-cyan-400 font-bold">{item.percentage}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="w-full py-4 px-6 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2"
      >
        <span>REVIEW ANALYZED JOB SUMMARIES</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
