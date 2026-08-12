import React from 'react';
import { motion } from 'motion/react';
import { Shield, Radio, Cpu, RefreshCw, Sparkles, Activity, Zap, ChevronDown } from 'lucide-react';
import { ModelDef } from '../types';

interface HeaderProps {
  appName: string;
  targetRole?: string;
  readinessPercentage?: number;
  planVersionNumber?: number;
  isDashboardActive?: boolean;
  activeModel?: ModelDef;
  onOpenModelSelector?: () => void;
  onResetData?: () => void;
  onStartNewPlan?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appName,
  targetRole = 'AI / Software Engineer',
  readinessPercentage = 62,
  planVersionNumber = 1,
  isDashboardActive = false,
  activeModel,
  onOpenModelSelector,
  onResetData,
  onStartNewPlan,
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 w-full bg-white/5 backdrop-blur-md border-b border-white/10 px-4 lg:px-6 py-3.5 transition-all select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Telemetry */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg tracking-tighter uppercase italic text-white font-sans">
                ASCEND<span className="text-cyan-400">.AI</span>
              </h1>
              <div className="h-3.5 w-[1px] bg-white/20 mx-1 hidden sm:block"></div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50 tracking-wider">
                <Radio className="w-3 h-3 animate-pulse text-cyan-400" />
                MISSION_ACTIVE: DAY_001
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono flex items-center gap-2">
              <span>TARGET: <strong className="text-cyan-300">{targetRole}</strong></span>
              {isDashboardActive && (
                <span className="text-gray-500">| PLAN V{planVersionNumber}</span>
              )}
            </p>
          </div>
        </div>

        {/* Model Dropdown & Readiness Index & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {onOpenModelSelector && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenModelSelector}
              title="Click to select active AI Model"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900/90 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 transition-all font-mono text-xs group shadow-[0_0_12px_rgba(6,182,212,0.15)] cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-bold max-w-[120px] sm:max-w-[170px] truncate">
                {activeModel ? activeModel.name : 'Select Model'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-300 transition-colors shrink-0" />
            </motion.button>
          )}

          {isDashboardActive && (
            <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                  Readiness Score
                </span>
                <span className="text-sm font-bold font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] flex items-center justify-end gap-1">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  {readinessPercentage}%
                </span>
              </div>
              <div className="w-16 bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                  style={{ width: `${readinessPercentage}%` }}
                />
              </div>
            </div>
          )}

          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Engine Status</span>
            <span className="text-xs text-green-400 flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              SYNCHRONIZED
            </span>
          </div>

          {isDashboardActive && onStartNewPlan && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onStartNewPlan}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-cyan-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.1)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">New Transition</span>
            </motion.button>
          )}

          {onResetData && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onResetData}
              title="Reset Platform Data"
              className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
};

