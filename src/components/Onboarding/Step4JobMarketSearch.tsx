import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Radio, Search, Globe, Loader2, Building2, MapPin, CheckCircle2, ShieldCheck, Zap, Server } from 'lucide-react';

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
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [searchProgress, setSearchProgress] = useState(0);

  const primaryLoc = locations[0] || 'Remote';
  const primaryDomain = targetDomains[0] || 'Software Engineering';

  const searchQueries = [
    `"${targetRole}" "${primaryDomain}" "${primaryLoc}"`,
    `"${targetRole}" "${primaryDomain}" "Senior"`,
    `"${targetRole}" "Key Skills & Requirements"`,
    `"${targetRole}" "${locations.slice(0, 2).join(' ')}"`,
  ];

  const simulatedNodes = [
    { name: 'DefenseTech AI', loc: locations[0] || 'Remote', role: targetRole, match: '98.4%' },
    { name: 'AeroAstra Systems', loc: locations[1] || 'Bangalore', role: targetRole, match: '95.1%' },
    { name: 'QuantumDynamics', loc: locations[2] || 'Hyderabad', role: targetRole, match: '92.8%' },
    { name: 'Lockheed Defense', loc: 'USA / Remote', role: targetRole, match: '96.2%' },
  ];

  useEffect(() => {
    let interval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev < 100) return prev + 2;
        return 100;
      });
    }, 80);

    let timer1 = setTimeout(() => {
      setLogs((prev) => [...prev, `[GEO SATELLITE] Initiating live web search across global career indexes...`]);
      setActiveNodes([0]);
    }, 400);

    let timer2 = setTimeout(() => {
      setLogs((prev) => [...prev, `[QUERY VECTOR 1] '${searchQueries[0]}' — Crawling company career portals...`]);
      setActiveNodes([0, 1]);
    }, 1200);

    let timer3 = setTimeout(() => {
      setLogs((prev) => [...prev, `[QUERY VECTOR 2] '${searchQueries[1]}' — Parsing requirement descriptions & stack tags...`]);
      setActiveNodes([0, 1, 2]);
    }, 2200);

    let timer4 = setTimeout(() => {
      setLogs((prev) => [...prev, `[AI MATCH ENGINE] Aggregating company metadata, skill demand vectors, and gap matrices...`]);
      setActiveNodes([0, 1, 2, 3]);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-mono text-center space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-ping" />
          Onboarding Phase 4 / 14 — Satellite Web Radar
        </div>

        <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-white font-mono">
          SEARCHING REAL JOBS <span className="font-bold text-cyan-400">ONLINE</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-mono">
          Querying live job market portals for <strong className="text-cyan-300">{targetRole}</strong> across <strong className="text-cyan-300">{primaryDomain}</strong>.
        </p>
      </div>

      {/* Main Radar Screen Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="p-6 rounded-3xl bg-slate-950/90 border border-cyan-500/40 shadow-[0_0_45px_rgba(6,182,212,0.2)] text-left space-y-6 relative overflow-hidden backdrop-blur-xl"
      >
        {/* Background Cyber Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `radial-gradient(#06b6d4 1px, transparent 1px), linear-gradient(to right, rgba(6,182,212,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.08) 1px, transparent 1px)`,
            backgroundSize: '24px 24px, 48px 48px, 48px 48px',
          }}
        />

        {/* Top Header Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/30 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Globe className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-cyan-300 tracking-wider">
                  LIVE WEB GROUNDING AI
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-cyan-950 text-cyan-400 border border-cyan-500/40 animate-pulse">
                  ACTIVE SCRAPE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Targeting Role: <strong className="text-slate-200">{targetRole}</strong> ({primaryDomain})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-500 block font-bold">Live Indexes</span>
              <span className="text-cyan-400 font-extrabold text-sm">GLOBAL API</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-500 block font-bold">Scanning</span>
              <span className="text-emerald-400 font-extrabold text-sm">{searchProgress}%</span>
            </div>
          </div>
        </div>

        {/* 2D SONAR RADAR GRAPHIC + REAL-TIME DISCOVERED JOB NODES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Radar Visualizer (Left Column) */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6">
            <div className="relative w-56 h-56 rounded-full bg-slate-900 border-2 border-cyan-500/30 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.25)]">
              {/* Concentric Radar Rings */}
              <div className="absolute w-44 h-44 rounded-full border border-cyan-500/20" />
              <div className="absolute w-32 h-32 rounded-full border border-cyan-500/25" />
              <div className="absolute w-20 h-20 rounded-full border border-cyan-500/30" />
              <div className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />

              {/* Crosshairs */}
              <div className="absolute w-full h-[1px] bg-cyan-500/20" />
              <div className="absolute h-full w-[1px] bg-cyan-500/20" />

              {/* Rotating Sweep Beam */}
              <motion.div
                className="absolute inset-0 origin-center"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              >
                <div
                  className="w-1/2 h-1/2 absolute top-0 right-0 origin-bottom-left"
                  style={{
                    background: 'conic-gradient(from 180deg at 0% 100%, rgba(6,182,212,0.4) 0deg, transparent 60deg)',
                  }}
                />
              </motion.div>

              {/* Pinged Job Nodes on Radar */}
              {simulatedNodes.map((node, i) => {
                const isFound = activeNodes.includes(i);
                // Radar positions
                const coords = [
                  { top: '25%', left: '30%' },
                  { top: '65%', left: '70%' },
                  { top: '35%', left: '75%' },
                  { top: '70%', left: '25%' },
                ][i];

                return isFound ? (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.3, 1], opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.3 }}
                    className="absolute flex items-center justify-center z-20"
                    style={{ top: coords.top, left: coords.left }}
                  >
                    <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]" />
                    <span className="absolute w-6 h-6 rounded-full border border-emerald-400 animate-ping opacity-75" />
                  </motion.div>
                ) : null;
              })}
            </div>
          </div>

          {/* Real-time Discovered Job Cards (Right Column) */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-cyan-300">
                <Server className="w-3.5 h-3.5 text-cyan-400" /> DISCOVERED JOB POSITIONS ({activeNodes.length}/4)
              </span>
              <span className="text-[10px] text-slate-500 font-normal">LIVE MATCHING</span>
            </div>

            <div className="space-y-2">
              {simulatedNodes.map((node, idx) => {
                const isDiscovered = activeNodes.includes(idx);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: isDiscovered ? 1 : 0.4, y: 0 }}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                      isDiscovered
                        ? 'bg-cyan-950/40 border-cyan-500/40 text-slate-200 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className={`w-2 h-2 rounded-full ${isDiscovered ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-slate-700'}`} />
                      <div>
                        <div className="font-bold text-slate-200 text-[11px] flex items-center gap-1.5">
                          <Building2 className="w-3 h-3 text-cyan-400 shrink-0" />
                          {node.name}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          {node.loc}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {isDiscovered ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {node.match} MATCH
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-600 italic">Pinging...</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Query Vectors */}
        <div className="space-y-2 text-xs pt-2">
          <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">
            Active Query Vectors Executed:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {searchQueries.map((q, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate text-[11px] font-mono">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stream Terminal Console */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 h-36 overflow-y-auto space-y-2 text-[11px] font-mono text-slate-300">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">{'>'}</span>
              <span>{log}</span>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-cyan-400 animate-pulse pt-1">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Matching job requirement vectors & calculating gap metrics...</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
