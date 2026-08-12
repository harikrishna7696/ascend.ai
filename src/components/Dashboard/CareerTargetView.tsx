import React from 'react';
import { Target, Calendar, Globe, DollarSign, Activity, CheckCircle2 } from 'lucide-react';
import { CareerTarget } from '../../types';

interface CareerTargetViewProps {
  target: CareerTarget;
  currentRole?: string;
  readinessPercentage?: number;
}

export const CareerTargetView: React.FC<CareerTargetViewProps> = ({
  target,
  currentRole = 'Computer Vision Engineer',
  readinessPercentage = 62,
}) => {
  return (
    <div className="space-y-6 font-mono">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30">
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
          <Target className="w-4 h-4" /> CAREER TRANSITION VECTOR
        </div>
        <h2 className="text-2xl font-extrabold uppercase text-slate-100">
          DESTINATION ARCHITECTURE
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Defined mission parameters for your 180-day career leap.
        </p>
      </div>

      {/* Vector Box: Current vs Target */}
      <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Current */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Current Role</span>
            <p className="text-lg font-bold text-slate-200">{currentRole}</p>
            <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
              3.5+ Years Exp
            </span>
          </div>

          {/* Transformation Vector */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold text-xs">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              {target.daysToPrepare} DAYS TIMELINE
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full relative my-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full"
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400">Projected Readiness: 91% Job Ready</span>
          </div>

          {/* Target */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border border-cyan-400 text-center space-y-2 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <span className="text-[10px] uppercase text-cyan-400 font-bold tracking-wider">Target Destination</span>
            <p className="text-xl font-extrabold text-slate-100">{target.targetRole}</p>
            <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-cyan-900 text-cyan-200 border border-cyan-500/30">
              High Demand Domain
            </span>
          </div>
        </div>
      </div>

      {/* Target Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Domains */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            TARGET DOMAINS
          </span>
          <div className="flex flex-wrap gap-2">
            {(target.targetDomains || ['Defense', 'Computer Vision']).map((d, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                ✓ {d}
              </span>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-cyan-400" /> PREFERRED LOCATIONS
          </span>
          <div className="flex flex-wrap gap-2">
            {(target.locations || ['Hyderabad', 'Remote']).map((l, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 text-xs">
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Salary */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-400" /> TARGET COMPENSATION
          </span>
          <p className="text-lg font-bold text-emerald-400">
            {target.targetSalary || '$120,000 - $160,000'}
          </p>
        </div>
      </div>
    </div>
  );
};
