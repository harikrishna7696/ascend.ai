import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  CalendarCheck,
  Cpu,
  Briefcase,
  Video,
  Bot,
  CheckSquare,
  Square,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from 'lucide-react';
import { DayTask, JobItem, ContentItem, MainNavTab } from '../../types';

interface DashboardViewProps {
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
  todayTasks: DayTask[];
  onToggleTask: (taskId: string, completed: boolean) => void;
  onNavigateTab: (tab: MainNavTab) => void;
  targetRole: string;
  currentRole?: string;
  currentReadiness?: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  todayTasks,
  onToggleTask,
  onNavigateTab,
  targetRole,
  currentRole = 'Computer Vision Engineer',
  currentReadiness = 62,
}) => {
  const skillGapBars = [
    { name: 'CUDA', progress: 52, color: 'from-cyan-500 to-blue-500' },
    { name: 'Tracking', progress: 55, color: 'from-sky-400 to-indigo-500' },
    { name: 'ROS2 / SLAM', progress: 34, color: 'from-indigo-500 to-violet-500' },
    { name: 'TensorRT', progress: 44, color: 'from-emerald-400 to-cyan-500' },
  ];

  return (
    <div className="space-y-6 font-mono">
      {/* Top Banner: Day Count & Transformation */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.1)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
                <Activity className="w-4 h-4 animate-pulse" /> MISSION CONTROL STRATEGY
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-1 uppercase">
                MISSION: <span className="font-bold text-cyan-400">{targetRole}</span>
              </h2>
              <p className="text-xs text-gray-400 italic">
                Initiated from {currentRole} profile • {stats.totalDays}-Day Strategy
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block">
                  Global Readiness Score
                </span>
                <p className="text-3xl font-mono font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                  {currentReadiness}%
                </p>
              </div>
              <div className="w-24 sm:w-32 bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                  style={{ width: `${currentReadiness}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Learning Hours</span>
              <span className="font-bold text-gray-200">{stats.learningHoursCompleted} Hours</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Tasks Completed</span>
              <span className="font-bold text-gray-200">{stats.tasksCompleted} / {stats.totalTasks}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Videos Published</span>
              <span className="font-bold text-gray-200">{stats.videosPublished} / {stats.totalVideosPlanned}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Transition Velocity</span>
              <span className="font-bold text-emerald-400">Day {stats.currentDay} / {stats.totalDays}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Columns: TODAY & CAREER GAP */}
        <div className="lg:col-span-8 space-y-6">
          {/* TODAY OBJECTIVE CARD */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-300 tracking-widest">
                <div className="w-1 h-4 bg-cyan-500"></div>
                TODAY'S PROTOCOL
              </div>
              <motion.button
                whileHover={{ x: 3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigateTab('today')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold cursor-pointer"
              >
                Focus Mode <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-cyan-500/30 text-xs space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                DAY {stats.currentDay} PROTOCOL: CUDA Memory Latency & Profiling
              </span>
              <p className="text-gray-300 font-sans text-xs leading-relaxed">
                Master pinned host memory allocation (cudaHostAlloc) and asynchronous stream execution to eliminate PCIe transfer bottlenecks in 200+ FPS edge vision nodes.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                Daily Execution Tasks:
              </span>
              {todayTasks.length > 0 ? (
                todayTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onToggleTask(task.id, !task.completed)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                      task.completed
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 line-through opacity-60'
                        : 'bg-white/5 border-white/10 text-gray-200 hover:border-cyan-500/40 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-500 shrink-0" />
                      )}
                      <span>{task.title}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {task.estimatedMinutes}m
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400">
                  □ Learn CUDA Memory Fundamentals & Pinned Allocation
                </div>
              )}
            </div>
          </div>

          {/* CAREER GAP VECTOR PROGRESS */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-300 tracking-widest">
                <div className="w-1 h-4 bg-blue-500"></div>
                CAREER GAP MATRIX
              </div>
              <motion.button
                whileHover={{ x: 3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigateTab('skill_gap')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold cursor-pointer"
              >
                Full Skill Matrix <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            <div className="space-y-3.5">
              {skillGapBars.map((sk, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-300">{sk.name}</span>
                    <span className="text-cyan-400 font-bold">{sk.progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${sk.color} h-full rounded-full transition-all duration-700`}
                      style={{ width: `${sk.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Columns: AI COACH, WEEKLY VIDEO, MARKET INTELLIGENCE */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI COACH MESSAGE CARD */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 backdrop-blur-md space-y-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.15),transparent)] pointer-events-none"></div>
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-widest">
                  <div className="w-1 h-4 bg-purple-500"></div>
                  AI CAREER COACH
                </div>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-sans italic">
                "Analysis of current pace suggests 91% readiness by Day 165. Strategic pivot: Incorporate <strong className="text-white">YOLOv10-TensorRT</strong> benchmarking into this week's project to bypass legacy experience gaps detected in Defense listings."
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigateTab('coach')}
                className="w-full py-2.5 px-3 rounded-xl bg-white/10 border border-white/20 text-xs font-bold uppercase text-white hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Engage Architect AI
              </motion.button>
            </div>
          </div>

          {/* THIS WEEK'S VIDEO */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-widest">
                <div className="w-1 h-4 bg-purple-400"></div>
                CONTENT PRODUCTION
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigateTab('content')}
                className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
              >
                Planner
              </motion.button>
            </div>

            <p className="text-xs font-bold text-gray-200">
              "GPU Inference Optimization Explained for Engineers"
            </p>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <span className="px-2 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-center font-bold">
                Script ✓
              </span>
              <span className="px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10 text-center">
                Recording ○
              </span>
              <span className="px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10 text-center">
                Editing ○
              </span>
              <span className="px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10 text-center">
                Published ○
              </span>
            </div>
          </div>

          {/* TARGET JOB MARKET STATUS */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-widest">
                <div className="w-1 h-4 bg-emerald-500"></div>
                MARKET TELEMETRY
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigateTab('job_market')}
                className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
              >
                Scan Jobs
              </motion.button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              Analyzed <strong className="text-cyan-300">27 live job postings</strong> in Defense AI. Highest priority demand: Python (91%), CUDA (52%), TensorRT (44%), ROS2 (34%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
