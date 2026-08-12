import React, { useState } from 'react';
import { JobItem } from '../../types';
import { Briefcase, ExternalLink, Search, Filter, CheckCircle2, AlertTriangle, Building2, MapPin } from 'lucide-react';

interface JobMarketViewProps {
  jobs: JobItem[];
  targetRole: string;
}

export const JobMarketView: React.FC<JobMarketViewProps> = ({ jobs, targetRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'high_match') return matchesSearch && j.matchPercentage >= 80;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 font-mono">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30">
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
          <Briefcase className="w-4 h-4" /> LIVE JOB MARKET INTELLIGENCE
        </div>
        <h2 className="text-2xl font-extrabold uppercase text-slate-100">
          ANALYZED MARKET POSTINGS
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {jobs.length} postings retrieved via web grounding for {targetRole}. Original sources verified.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company, role, location..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedFilter === 'all'
                ? 'bg-cyan-950 text-cyan-300 border-cyan-400'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            All Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setSelectedFilter('high_match')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedFilter === 'high_match'
                ? 'bg-cyan-950 text-cyan-300 border-cyan-400'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            High Match (80%+)
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
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

              <p className="text-xs text-slate-300 pt-3 line-clamp-2">{job.description}</p>

              <div className="space-y-1.5 pt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  MUST HAVE SKILLS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-cyan-300 border border-slate-800">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {job.gaps && job.gaps.length > 0 && (
                <div className="mt-3 p-2 rounded-xl bg-red-950/20 border border-red-500/20 text-xs flex items-center justify-between text-red-300">
                  <span className="flex items-center gap-1 font-bold text-[10px]">
                    <AlertTriangle className="w-3 h-3 text-red-400" /> GAPS:
                  </span>
                  <span className="font-mono text-[11px] text-red-200">{job.gaps.join(', ')}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800">
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs text-cyan-300 transition-all flex items-center justify-center gap-1.5"
              >
                <span>[ VIEW ORIGINAL JOB SOURCE ]</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
