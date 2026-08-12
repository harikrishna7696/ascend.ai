import React from 'react';
import { Layers, Code, CheckCircle2, GitBranch, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectsViewProps {
  projects: ProjectItem[];
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ projects }) => {
  return (
    <div className="space-y-6 font-mono">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30">
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
          <Layers className="w-4 h-4" /> INDUSTRY-PROOF PROJECT PIPELINE
        </div>
        <h2 className="text-2xl font-extrabold uppercase text-slate-100">
          HIGH-EMPLOYABILITY PROJECTS
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Architected specifically to solve target defense & computer vision industry demands.
        </p>
      </div>

      {/* Projects Cards */}
      <div className="space-y-6">
        {projects.map((proj, idx) => (
          <div
            key={proj.id || idx}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                  PROJECT {idx + 1}
                </span>
                <h3 className="text-base font-bold text-slate-100">{proj.title}</h3>
              </div>
              <span className={`self-start sm:self-auto px-3 py-1 rounded-lg text-xs font-bold capitalize border ${
                proj.status === 'completed'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                  : proj.status === 'in_progress'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}>
                {proj.status.replace('_', ' ')}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">{proj.description}</p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-1.5">
              {proj.skills.map((s, sidx) => (
                <span key={sidx} className="px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-300 border border-slate-800 text-xs font-semibold">
                  # {s}
                </span>
              ))}
            </div>

            {/* Milestones */}
            {proj.milestones && proj.milestones.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Project Milestones:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {proj.milestones.map((m) => (
                    <div
                      key={m.id}
                      className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                        m.completed
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${m.completed ? 'text-emerald-400' : 'text-slate-600'}`} />
                      <span>{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
