import React from 'react';
import { motion } from 'motion/react';
import { JobItem } from '../../types';
import { Briefcase, ExternalLink, CheckCircle2, AlertTriangle, ArrowRight, Building2, MapPin } from 'lucide-react';

interface Step6Props {
  jobs: JobItem[];
  onContinue: () => void;
}

export const Step6JobSummary: React.FC<Step6Props> = ({ jobs, onContinue }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-mono">
      {/* Title */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Briefcase className="w-3.5 h-3.5" />
          Onboarding Phase 6 / 14 — Job Summaries
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-100">
          ANALYZED JOB POSTINGS
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Concise AI-extracted breakdown of what real companies are asking for in your target role.
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {jobs.map((job, jobIdx) => (
          <div
            key={job.id || `job-summary-${jobIdx}`}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    {job.company}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-300 mt-0.5">{job.title}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold text-xs">
                    {job.matchPercentage}% MATCH
                  </span>
                  <div className="text-[10px] text-slate-500 flex items-center justify-end gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </div>
                </div>
              </div>

              {/* Experience Req */}
              <div className="py-2 text-xs text-slate-400">
                <strong className="text-slate-300">Experience Required:</strong> {job.experienceReq}
              </div>

              {/* What They Expect */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  WHAT THEY EXPECT
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={`skill-${job.id || jobIdx}-${idx}-${skill}`}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-950 text-cyan-300 border border-slate-800"
                    >
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nice To Have */}
              {job.niceToHaveSkills && job.niceToHaveSkills.length > 0 && (
                <div className="space-y-1.5 pt-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    NICE TO HAVE
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.niceToHaveSkills.map((s, idx) => (
                      <span
                        key={`nth-${job.id || jobIdx}-${idx}-${s}`}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-950/60 text-slate-400 border border-slate-800/80"
                      >
                        ○ {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Responsibilities */}
              <div className="space-y-1 pt-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  RESPONSIBILITIES
                </span>
                <ul className="text-[11px] text-slate-300 space-y-1 pl-2">
                  {job.responsibilities.slice(0, 3).map((r, idx) => (
                    <li key={`resp-${job.id || jobIdx}-${idx}`} className="list-disc list-inside text-slate-400">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              {job.gaps && job.gaps.length > 0 && (
                <div className="mt-3 p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-xs flex items-center justify-between text-red-300">
                  <span className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    SKILL GAPS:
                  </span>
                  <span className="font-mono text-red-200">{job.gaps.join(', ')}</span>
                </div>
              )}
            </div>

            {/* View Job External Link */}
            <div className="pt-4 border-t border-slate-800/80">
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs text-cyan-300 hover:text-cyan-200 transition-all flex items-center justify-center gap-1.5"
              >
                <span>[ VIEW ORIGINAL JOB SOURCE ]</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        onClick={onContinue}
        className="relative w-full py-4 px-6 rounded-2xl text-sm font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all flex items-center justify-center gap-2 overflow-hidden cursor-pointer group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        />
        <span className="relative z-10 font-mono">SELECT YOUR TARGET SKILLS</span>
        <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowRight className="w-4 h-4 text-slate-950 relative z-10" />
        </motion.div>
      </motion.button>
    </div>
  );
};
