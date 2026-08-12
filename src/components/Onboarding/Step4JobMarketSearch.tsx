import React, { useEffect, useState } from 'react';
import { Radio, Search, Globe, Shield, Loader2, Database, CheckCircle2 } from 'lucide-react';

interface Step4Props {
  targetRole: string;
  targetDomains: string[];
  locations: string[];
  isLoading: boolean;
  onSearchComplete: () => void;
}

export const Step4JobMarketSearch: React.FC<Step4Props> = ({
  targetRole,
  targetDomains,
  locations,
  isLoading,
  onSearchComplete,
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const primaryLoc = locations[0] || 'India';
  const primaryDomain = targetDomains.join(' ');

  const searchQueries = [
    `"${targetRole}" "${primaryDomain}" "${primaryLoc}"`,
    `"${targetRole}" "Defense" "AI Engineer"`,
    `"${targetRole}" "Computer Vision" "TensorRT" "ROS2"`,
    `"${targetRole}" "Autonomous Systems" "Hyderabad"`,
  ];

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setLogs((prev) => [...prev, `[GEO] Initiating search queries across global job indexes...`]);
    }, 400);

    let timer2 = setTimeout(() => {
      setLogs((prev) => [...prev, `[QUERY 1] Ex. '${searchQueries[0]}' — Fetching live listings...`]);
    }, 1200);

    let timer3 = setTimeout(() => {
      setLogs((prev) => [...prev, `[QUERY 2] Ex. '${searchQueries[1]}' — Extracting job requirements...`]);
    }, 2200);

    let timer4 = setTimeout(() => {
      setLogs((prev) => [...prev, `[PARSER] Aggregating company metadata, skill demand vectors, and gap vectors...`]);
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 font-mono text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs uppercase tracking-widest mb-6">
        <Radio className="w-3.5 h-3.5 text-cyan-400 animate-ping" />
        Phase 4 / 14 — Live Search Engine
      </div>

      <h2 className="text-3xl font-extrabold uppercase tracking-tight text-slate-100 mb-3">
        SEARCHING REAL JOBS ONLINE
      </h2>
      <p className="text-xs text-slate-400 max-w-lg mx-auto mb-8">
        Querying current live job market postings for <strong className="text-cyan-300">{targetRole}</strong> across <strong className="text-cyan-300">{primaryDomain}</strong>.
      </p>

      {/* Radar Graphic & Live Log Console */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-6 text-left shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        {/* Radar Line */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs text-cyan-300 font-bold">
            <Globe className="w-4 h-4 text-cyan-400 animate-spin" />
            LIVE WEB MARKET TELEMETRY
          </div>
          <span className="text-[10px] text-slate-500">REAL-TIME GROUNDING</span>
        </div>

        {/* Search Query Nodes */}
        <div className="space-y-2 text-xs">
          <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">
            Active Query Vectors:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {searchQueries.map((q, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate text-[11px]">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stream Console */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 h-40 overflow-y-auto space-y-2 text-[11px] text-slate-300">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-cyan-500 font-bold">{'>'}</span>
              <span>{log}</span>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-cyan-400 animate-pulse pt-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing job descriptions & skill requirements...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
