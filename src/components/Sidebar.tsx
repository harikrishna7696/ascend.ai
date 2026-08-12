import React from 'react';
import {
  LayoutDashboard,
  Target,
  Briefcase,
  Cpu,
  GitBranch,
  CalendarCheck,
  Layers,
  Video,
  TrendingUp,
  Bot,
  Settings,
} from 'lucide-react';
import { MainNavTab } from '../types';

interface SidebarProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const navItems: { id: MainNavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'target', label: 'Career Target', icon: Target },
    { id: 'job_market', label: 'Job Market', icon: Briefcase },
    { id: 'skill_gap', label: 'Skill Gap', icon: Cpu },
    { id: 'roadmap', label: 'Roadmap', icon: GitBranch },
    { id: 'today', label: 'Today Focus', icon: CalendarCheck },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'content', label: 'Content Planner', icon: Video },
    { id: 'progress', label: 'Progress Analytics', icon: TrendingUp },
    { id: 'coach', label: 'AI Career Coach', icon: Bot },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside id="main-sidebar" className="w-full lg:w-64 bg-black/20 border-r border-white/10 backdrop-blur-md p-3.5 flex flex-col justify-between shrink-0 font-mono select-none">
      <nav className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          Mission Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)] font-semibold'
                  : 'text-gray-400 hover:text-cyan-300 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform ${
                  isActive ? 'text-cyan-400 scale-110' : 'text-gray-500 group-hover:text-gray-300'
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-[11px] space-y-1.5 backdrop-blur-sm">
        <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-wider">
          <span>Engine Status</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
        <div className="text-gray-200 font-semibold truncate">
          AI GROUNDING ONLINE
        </div>
        <p className="text-[10px] text-gray-500 leading-tight">
          SQLite Local Persistence Active
        </p>
      </div>
    </aside>
  );
};
