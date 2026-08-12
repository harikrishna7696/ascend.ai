import React, { useState } from 'react';
import { GitBranch, Calendar, ChevronRight, CheckCircle2, Circle, Clock } from 'lucide-react';
import { TransitionPlan, DayTask } from '../../types';

interface RoadmapViewProps {
  plan: TransitionPlan;
  onToggleTask?: (taskId: string, completed: boolean) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ plan, onToggleTask }) => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  const activeMonth = plan.months?.[selectedMonthIndex] || plan.months?.[0];
  const activeWeek = activeMonth?.weeks?.[selectedWeekIndex] || activeMonth?.weeks?.[0];

  return (
    <div className="space-y-6 font-mono">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <GitBranch className="w-4 h-4" /> 180-DAY CAREER TRANSITION ROADMAP
          </div>
          <h2 className="text-2xl font-light tracking-tight text-white uppercase mb-1">
            MISSION <span className="font-bold text-cyan-400">ROADMAP ARCHITECTURE</span>
          </h2>
          <p className="text-xs text-gray-400">
            6 Months • 24 Weeks • 180 Days of Structured Daily Execution.
          </p>
        </div>
      </div>

      {/* Month Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(plan.months || []).map((m, idx) => (
          <button
            key={m.id || idx}
            onClick={() => {
              setSelectedMonthIndex(idx);
              setSelectedWeekIndex(0);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all border ${
              selectedMonthIndex === idx
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            Month {m.monthNumber}: {m.title}
          </button>
        ))}
      </div>

      {activeMonth && (
        <div className="space-y-6">
          {/* Active Month Header */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                MONTH {activeMonth.monthNumber} FOCUS: {activeMonth.title}
              </span>
              <span className="text-[10px] text-gray-400">
                Primary Goal: {activeMonth.primaryGoal}
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">{activeMonth.description}</p>
          </div>

          {/* Week Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(activeMonth.weeks || []).map((w, widx) => (
              <button
                key={w.id || widx}
                onClick={() => setSelectedWeekIndex(widx)}
                className={`p-3.5 rounded-xl text-left transition-all border ${
                  selectedWeekIndex === widx
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-gray-500 block">
                  Week {w.weekNumber}
                </span>
                <p className="text-xs font-bold text-gray-200 truncate">{w.theme}</p>
              </button>
            ))}
          </div>

          {/* Active Week Details & Days */}
          {activeWeek && (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    WEEK {activeWeek.weekNumber}: {activeWeek.theme}
                  </h3>
                  <p className="text-xs text-gray-400">Target Skill: {activeWeek.targetSkill}</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                  {activeWeek.days?.length || 7} Days
                </span>
              </div>

              {/* Day Cards */}
              <div className="space-y-3">
                {(activeWeek.days || []).map((day) => (
                  <div
                    key={day.id || day.dayNumber}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-cyan-500/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300">
                        DAY {day.dayNumber}: {day.title}
                      </span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" /> ~2.5 hrs
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 font-sans">{day.focusArea}</p>

                    {/* Day Tasks */}
                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      {day.tasks?.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => onToggleTask && onToggleTask(task.id, !task.completed)}
                          className={`p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                            task.completed
                              ? 'bg-emerald-950/20 text-emerald-300 line-through opacity-60'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {task.completed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                            )}
                            <span>{task.title}</span>
                          </div>
                          <span className="text-[10px] text-gray-400">{task.estimatedMinutes}m</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
