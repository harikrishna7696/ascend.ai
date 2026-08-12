import React from 'react';
import { Layers, Code, CheckCircle2, GitBranch, Sparkles, FileText, Globe, MessageSquare } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectsViewProps {
  projects?: ProjectItem[];
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ projects = [] }) => {
  const safeProjects = Array.isArray(projects) ? projects : [];

  if (safeProjects.length === 0) {
    return (
      <div className="space-y-6 font-mono">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <Layers className="w-4 h-4" /> INDUSTRY-PROOF PROJECT PIPELINE
          </div>
          <h2 className="text-2xl font-extrabold uppercase text-slate-100">
            HIGH-EMPLOYABILITY PROJECTS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Architected specifically to solve target industry & technical demands.
          </p>
        </div>

        <div className="p-8 text-center rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-400 font-sans space-y-3">
          <Layers className="w-10 h-10 text-cyan-400/60 mx-auto" />
          <h3 className="text-base font-bold text-slate-200 uppercase">No Projects Loaded</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Finalize your career transition plan to generate a tailored sequence of high-impact portfolio projects.
          </p>
        </div>
      </div>
    );
  }

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
          Architected specifically to solve target industry & technical demands.
        </p>
      </div>

      {/* Projects Cards */}
      <div className="space-y-6">
        {safeProjects.map((proj, idx) => {
          const statusText = proj?.status || 'planned';
          const statusLabel = statusText.replace(/_/g, ' ');

          const skillsList: string[] = Array.isArray(proj?.skills)
            ? proj.skills
            : typeof (proj as any)?.skills === 'string'
            ? (() => {
                try {
                  return JSON.parse((proj as any).skills);
                } catch {
                  return String((proj as any).skills).split(',');
                }
              })()
            : [];

          const stagesList: string[] = Array.isArray(proj?.stages)
            ? proj.stages
            : typeof (proj as any)?.stages === 'string'
            ? (() => {
                try {
                  return JSON.parse((proj as any).stages);
                } catch {
                  return [];
                }
              })()
            : [];

          const milestonesList = Array.isArray(proj?.milestones) ? proj.milestones : [];

          return (
            <div
              key={proj?.id || idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                    PROJECT {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-100">{proj?.title || `Project #${idx + 1}`}</h3>
                </div>
                <span
                  className={`self-start sm:self-auto px-3 py-1 rounded-lg text-xs font-bold capitalize border ${
                    statusText === 'completed'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                      : statusText === 'in_progress'
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {statusLabel}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">{proj?.description || ''}</p>

              {/* Skills Tags */}
              {skillsList.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {skillsList.map((s, sidx) => (
                    <span
                      key={sidx}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-300 border border-slate-800 text-xs font-semibold"
                    >
                      # {String(s).trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Milestones / Stages */}
              {milestonesList.length > 0 ? (
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Project Milestones:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {milestonesList.map((m) => (
                      <div
                        key={m.id || m.title}
                        className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                          m.completed
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ${m.completed ? 'text-emerald-400' : 'text-slate-600'}`}
                        />
                        <span>{m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : stagesList.length > 0 ? (
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Execution Stages:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {stagesList.map((stageTitle, stgIdx) => (
                      <div
                        key={stgIdx}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2 font-sans"
                      >
                        <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {stgIdx + 1}
                        </span>
                        <span className="truncate">{stageTitle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Employability Callouts */}
              {(proj?.resumeValue || proj?.portfolioValue || proj?.interviewValue) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/60 font-sans text-xs">
                  {proj.resumeValue && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                      <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px]">
                        <FileText className="w-3.5 h-3.5" /> Resume Impact
                      </div>
                      <p className="text-slate-400 text-[11px] leading-snug">{proj.resumeValue}</p>
                    </div>
                  )}
                  {proj.portfolioValue && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                        <Globe className="w-3.5 h-3.5" /> Portfolio Proof
                      </div>
                      <p className="text-slate-400 text-[11px] leading-snug">{proj.portfolioValue}</p>
                    </div>
                  )}
                  {proj.interviewValue && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                        <MessageSquare className="w-3.5 h-3.5" /> Interview Advantage
                      </div>
                      <p className="text-slate-400 text-[11px] leading-snug">{proj.interviewValue}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

