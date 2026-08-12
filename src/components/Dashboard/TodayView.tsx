import React, { useState } from 'react';
import { CalendarCheck, Clock, CheckSquare, Square, Zap, Sparkles, AlertCircle } from 'lucide-react';
import { DayTask } from '../../types';

interface TodayViewProps {
  dayNumber: number;
  todayTasks: DayTask[];
  onToggleTask: (taskId: string, completed: boolean) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  dayNumber,
  todayTasks,
  onToggleTask,
}) => {
  const [timeAvailableHours, setTimeAvailableHours] = useState<number>(3);
  const [energyLevel, setEnergyLevel] = useState<'high' | 'medium' | 'low'>('high');
  const [adapted, setAdapted] = useState(false);

  const handleAdaptToday = () => {
    setAdapted(true);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30">
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
          <CalendarCheck className="w-4 h-4" /> TODAY FOCUS MODE
        </div>
        <h2 className="text-2xl font-extrabold uppercase text-slate-100">
          DAY {dayNumber} EXECUTION CENTER
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Eliminate distraction. Execute today's target milestones.
        </p>
      </div>

      {/* Adapt Time Budget Widget */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-slate-300 uppercase flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" /> ADAPT TODAY'S SCHEDULE
          </span>
          {adapted && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
              ✓ Schedule Adapted
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Time Available Today (Hours):</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 5].map((h) => (
                <button
                  key={h}
                  onClick={() => {
                    setTimeAvailableHours(h);
                    setAdapted(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg border font-bold ${
                    timeAvailableHours === h
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {h} hr{h > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Energy Level:</label>
            <div className="flex items-center gap-2">
              {(['high', 'medium', 'low'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setEnergyLevel(lvl);
                    setAdapted(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg border font-bold capitalize ${
                    energyLevel === lvl
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleAdaptToday}
          className="px-4 py-2 rounded-xl text-xs font-bold uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" /> Re-index Today's Load
        </button>
      </div>

      {/* Task Checklist */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
        <h3 className="text-xs uppercase font-bold text-slate-200 tracking-wider">
          TODAY'S TASKS ({todayTasks.filter((t) => t.completed).length} / {todayTasks.length} Completed)
        </h3>

        <div className="space-y-3">
          {todayTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id, !task.completed)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                task.completed
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 line-through opacity-70'
                  : 'bg-slate-950 border-slate-800 text-slate-100 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                {task.completed ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <div>
                  <span className="font-bold">{task.title}</span>
                  <p className="text-[10px] text-slate-500 font-sans">{task.description}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" /> {task.estimatedMinutes}m
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
