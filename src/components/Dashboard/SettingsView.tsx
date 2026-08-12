import React from 'react';
import { Settings, Database, RefreshCw, Shield, Sparkles, Download } from 'lucide-react';
import { TransitionPlan, PlanVersion, ModelDef } from '../../types';
import { YamlModelConfigEditor } from './YamlModelConfigEditor';

interface SettingsViewProps {
  plan: TransitionPlan;
  planVersions: PlanVersion[];
  onResetData: () => void;
  onSelectVersion: (version: PlanVersion) => void;
  onModelChanged?: (model: ModelDef) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  plan,
  planVersions,
  onResetData,
  onSelectVersion,
  onModelChanged,
}) => {
  return (
    <div className="space-y-6 font-mono max-w-4xl mx-auto">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <Settings className="w-4 h-4" /> SYSTEM & DATABASE CONFIGURATION
          </div>
          <h2 className="text-2xl font-light tracking-tight uppercase text-white mb-1">
            COMMAND CENTER <span className="font-bold text-cyan-400">SETTINGS</span>
          </h2>
          <p className="text-xs text-gray-400">
            Manage open-source AI models via models.yaml, SQLite database persistence, and system telemetry.
          </p>
        </div>
      </div>

      {/* Open-Source AI Model Registry & YAML Config Editor */}
      <YamlModelConfigEditor onModelChanged={onModelChanged} />


      {/* SQLite Database Telemetry */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-200">
            <Database className="w-4 h-4 text-cyan-400" />
            SQLITE PERSISTENCE ENGINE
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            HEALTHY & ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Database Engine</span>
            <span className="font-bold text-gray-200">sql.js (WebAssembly)</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Disk File Path</span>
            <span className="font-bold text-cyan-300">data/career_platform.sqlite</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Active Plan Version</span>
            <span className="font-bold text-amber-400">Plan V{plan.version || 1}</span>
          </div>
        </div>
      </div>

      {/* Plan Versions History */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
        <h3 className="text-xs uppercase font-bold text-gray-300 tracking-wider">
          ROADMAP VERSION ARCHIVE ({planVersions.length} VERSIONS)
        </h3>

        <div className="space-y-2">
          {planVersions.map((v) => (
            <div
              key={v.id}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-bold text-cyan-300">Plan Version {v.versionNumber}</span>
                <p className="text-[10px] text-gray-400">
                  {v.planData.preparationDays} Days • ~{v.planData.weeklyLoadHours} hrs/wk • {v.planData.projectedReadinessPercentage}% Readiness
                </p>
              </div>

              <button
                onClick={() => onSelectVersion(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  v.versionNumber === (plan.version || 1)
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-white cursor-pointer'
                }`}
              >
                {v.versionNumber === (plan.version || 1) ? 'Active' : 'Switch To Version'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Reset System Data */}
      <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-4">
        <h3 className="text-xs uppercase font-bold text-red-300 tracking-wider flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-red-400" />
          DANGER ZONE — RESET PLATFORM STATE
        </h3>
        <p className="text-xs text-gray-400 font-sans">
          Clears all profile, job search telemetry, and transition plan data from the SQLite database and restarts the onboarding flow.
        </p>

        <button
          onClick={onResetData}
          className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase text-red-300 bg-red-950/80 border border-red-500/50 hover:bg-red-900 transition-all flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          [ RESET ALL DATA & START FRESH ]
        </button>
      </div>
    </div>
  );
};
