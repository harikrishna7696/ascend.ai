import React from 'react';
import { Video, Youtube, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { ContentItem } from '../../types';

interface ContentViewProps {
  contentCalendar: ContentItem[];
  onToggleStatus?: (contentId: string, stage: 'script' | 'recording' | 'editing' | 'published') => void;
}

export const ContentView: React.FC<ContentViewProps> = ({ contentCalendar, onToggleStatus }) => {
  return (
    <div className="space-y-6 font-mono">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30">
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
          <Video className="w-4 h-4" /> 26-WEEK TECHNICAL CONTENT PLANNER
        </div>
        <h2 className="text-2xl font-extrabold uppercase text-slate-100">
          PUBLIC PROOF & THOUGHT LEADERSHIP
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Publishing 1 technical breakdown video per week on YouTube/LinkedIn builds indisputable industry visibility.
        </p>
      </div>

      {/* Content Grid */}
      <div className="space-y-4">
        {contentCalendar.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                  WEEK {item.weekNumber} VIDEO
                </span>
                <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{item.topic}</p>
              </div>

              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize border shrink-0 ${
                item.status === 'published'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}>
                {item.status}
              </span>
            </div>

            {/* Stages Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <div
                onClick={() => onToggleStatus && onToggleStatus(item.id, 'script')}
                className={`p-2 rounded-lg border text-center cursor-pointer transition-colors ${
                  item.scriptCompleted ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                Script {item.scriptCompleted ? '✓' : '○'}
              </div>

              <div
                onClick={() => onToggleStatus && onToggleStatus(item.id, 'recording')}
                className={`p-2 rounded-lg border text-center cursor-pointer transition-colors ${
                  item.recorded ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                Recording {item.recorded ? '✓' : '○'}
              </div>

              <div
                onClick={() => onToggleStatus && onToggleStatus(item.id, 'editing')}
                className={`p-2 rounded-lg border text-center cursor-pointer transition-colors ${
                  item.edited ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                Editing {item.edited ? '✓' : '○'}
              </div>

              <div
                onClick={() => onToggleStatus && onToggleStatus(item.id, 'published')}
                className={`p-2 rounded-lg border text-center cursor-pointer transition-colors ${
                  item.published ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                Published {item.published ? '✓' : '○'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
