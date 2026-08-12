import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CareerTarget, UserProfile } from '../../types';
import { Target, Calendar, Globe, DollarSign, Check, ArrowRight, Sparkles, Radio, Search } from 'lucide-react';

interface Step3Props {
  userProfile?: UserProfile | null;
  onContinue: (target: CareerTarget) => void;
}

export const Step3TargetSelection: React.FC<Step3Props> = ({ userProfile, onContinue }) => {
  const defaultDomain = userProfile?.primaryDomain || '';
  const [daysToPrepare, setDaysToPrepare] = useState<number>(180);
  const [customDays, setCustomDays] = useState<string>('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>(
    defaultDomain ? [defaultDomain] : []
  );
  const [targetRole, setTargetRole] = useState<string>(
    userProfile?.primaryDomain ? `${userProfile.primaryDomain} Engineer` : ''
  );
  const [customRole, setCustomRole] = useState<string>('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['Remote']);
  const [targetSalary, setTargetSalary] = useState<string>('$100,000 - $150,000');

  const daysOptions = [30, 60, 90, 120, 180, 365];

  const domainsList = [
    'Defense',
    'Aviation',
    'Manufacturing',
    'Automotive',
    'Robotics',
    'Healthcare',
    'Space',
    'Surveillance',
    'Retail',
    'Smart Cities',
    'Industrial AI',
    'Autonomous Systems',
    'Agriculture',
    'Logistics',
    'General AI',
    'Computer Vision',
    'Multimodal AI',
  ];

  const rolesList = [
    'Senior Computer Vision Engineer',
    'AI Engineer',
    'ML Engineer',
    'Computer Vision + Robotics Engineer',
    'VLM Engineer',
    'Multimodal AI Engineer',
    'AI Research Engineer',
    'Edge AI Engineer',
    'Autonomous Systems Engineer',
  ];

  const locationsList = [
    'India',
    'Hyderabad',
    'Bangalore',
    'Remote',
    'Europe',
    'Middle East',
    'USA',
  ];

  const toggleDomain = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const toggleLocation = (loc: string) => {
    if (selectedLocations.includes(loc)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== loc));
    } else {
      setSelectedLocations([...selectedLocations, loc]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDays = customDays ? parseInt(customDays) || 180 : daysToPrepare;
    const finalRole = customRole.trim()
      ? customRole.trim()
      : targetRole || (selectedDomains[0] ? `${selectedDomains[0]} Engineer` : 'Software / AI Engineer');

    onContinue({
      daysToPrepare: finalDays,
      targetDomains: selectedDomains.length > 0 ? selectedDomains : ['Software Engineering'],
      targetRole: finalRole,
      locations: selectedLocations.length > 0 ? selectedLocations : ['Remote'],
      targetSalary,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
      {/* Title */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs uppercase tracking-widest">
          <Target className="w-3.5 h-3.5" />
          Onboarding Phase 3 / 14
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-100">
          WHERE DO YOU WANT TO GO?
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Define your target career domain, role, timeline, and location to query real job market telemetry.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Days to Prepare */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase text-slate-400 font-bold tracking-wider">
            <Calendar className="w-4 h-4 text-cyan-400" />
            1. How many days do you want to prepare?
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {daysOptions.map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => {
                  setDaysToPrepare(days);
                  setCustomDays('');
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  daysToPrepare === days && !customDays
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {days} Days
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs text-slate-500">Custom Days:</span>
            <input
              type="number"
              placeholder="e.g. 150"
              value={customDays}
              onChange={(e) => {
                setCustomDays(e.target.value);
                if (e.target.value) setDaysToPrepare(parseInt(e.target.value) || 180);
              }}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500/50 w-28"
            />
          </div>
        </div>

        {/* 2. Career Domains */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase text-slate-400 font-bold tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            2. What type of career transition are you targeting? (Multiple Allowed)
          </div>

          <div className="flex flex-wrap gap-2">
            {domainsList.map((domain) => {
              const isSelected = selectedDomains.includes(domain);
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => toggleDomain(domain)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400/80 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  {domain}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Target Role */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase text-slate-400 font-bold tracking-wider">
            <Target className="w-4 h-4 text-cyan-400" />
            3. What role are you targeting?
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {rolesList.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  setTargetRole(role);
                  setCustomRole('');
                }}
                className={`p-3 rounded-xl text-left text-xs font-bold transition-all border ${
                  targetRole === role && !customRole
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border-cyan-400'
                    : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <input
              type="text"
              placeholder="Or enter custom role name..."
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* 4 & 5. Location & Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase text-slate-400 font-bold tracking-wider">
              <Globe className="w-4 h-4 text-cyan-400" />
              4. Preferred Locations
            </div>

            <div className="flex flex-wrap gap-2">
              {locationsList.map((loc) => {
                const isSelected = selectedLocations.includes(loc);
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => toggleLocation(loc)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${
                      isSelected
                        ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Salary */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase text-slate-400 font-bold tracking-wider">
              <DollarSign className="w-4 h-4 text-cyan-400" />
              5. Target Salary Range
            </div>

            <input
              type="text"
              value={targetSalary}
              onChange={(e) => setTargetSalary(e.target.value)}
              placeholder="e.g. $120,000 - $160,000 / 25 - 40 LPA"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Submit Button with High-Tech Web Radar Animation */}
        <div className="relative pt-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="relative w-full py-5 px-8 rounded-2xl font-mono text-sm font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-3 overflow-hidden cursor-pointer group"
          >
            {/* Animated Laser Shimmer Beam */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            />

            <div className="relative z-10 flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <Radio className="w-5 h-5 text-slate-950 animate-pulse" />
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-900 opacity-75 animate-ping"></span>
              </div>
              <span className="tracking-widest">SEARCH REAL JOB MARKET ONLINE</span>
            </div>

            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="relative z-10"
            >
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </motion.div>
          </motion.button>
          
          <p className="text-[11px] text-center text-slate-500 mt-2 font-mono flex items-center justify-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            Queries live web indexes & extracts requirement vectors in real time
          </p>
        </div>
      </form>
    </div>
  );
};
