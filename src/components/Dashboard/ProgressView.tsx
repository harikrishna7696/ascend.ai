import React from 'react';
import { TrendingUp, Activity, Clock, Video, CheckCircle2 } from 'lucide-react';

interface ProgressViewProps {
  stats: {
    currentDay: number;
    totalDays: number;
    overallProgressPercentage: number;
    learningHoursCompleted: number;
    tasksCompleted: number;
    totalTasks: number;
    videosPublished: number;
    totalVideosPlanned: number;
  };
  readinessScore?: number;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  stats,
  readinessScore = 62,
}) => {
  return (
    <div className="space-y-6 font-mono">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30">
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
          <TrendingUp className="w-4 h-4" /> PROGRESS & VELOCITY ANALYTICS
        </div>
        <h2 className="text-2xl font-extrabold uppercase text-slate-100">
          CAREER READINESS TELEMETRY
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Real-time tracking of milestone velocity, study hours, and public proof.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Overall Completion
          </span>
          <p className="text-3xl font-extrabold text-cyan-300">{stats.overallProgressPercentage}%</p>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${stats.overallProgressPercentage}%` }} />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Learning Hours Logged
          </span>
          <p className="text-3xl font-extrabold text-slate-100">{stats.learningHoursCompleted} hrs</p>
          <p className="text-[10px] text-slate-500">Target: ~18 hrs / week</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Tasks Mastered
          </span>
          <p className="text-3xl font-extrabold text-amber-400">{stats.tasksCompleted} / {stats.totalTasks}</p>
          <p className="text-[10px] text-slate-500">Daily Lifecycle Consistency</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Job Readiness Index
          </span>
          <p className="text-3xl font-extrabold text-emerald-400">{readinessScore}% Ready</p>
          <p className="text-[10px] text-emerald-500/80">Projected Goal: 91%</p>
        </div>
      </div>
    </div>
  );
};
