import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { ShieldCheck, Edit3, ArrowRight, Check, Plus, Trash2 } from 'lucide-react';

interface Step2Props {
  profile: UserProfile;
  onContinue: (updatedProfile: UserProfile) => void;
}

export const Step2ResumeIntelligence: React.FC<Step2Props> = ({ profile, onContinue }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [experienceYears, setExperienceYears] = useState(profile.experienceYears);
  const [primaryDomain, setPrimaryDomain] = useState(profile.primaryDomain);
  const [strongSkills, setStrongSkills] = useState<string[]>(profile.strongSkills || []);
  const [highlights, setHighlights] = useState<string[]>(profile.experienceHighlights || []);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newHighlightInput, setNewHighlightInput] = useState('');

  const handleAddSkill = () => {
    if (newSkillInput.trim()) {
      setStrongSkills([...strongSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setStrongSkills(strongSkills.filter((_, i) => i !== index));
  };

  const handleAddHighlight = () => {
    if (newHighlightInput.trim()) {
      setHighlights([...highlights, newHighlightInput.trim()]);
      setNewHighlightInput('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onContinue({
      ...profile,
      experienceYears,
      primaryDomain,
      strongSkills,
      experienceHighlights: highlights,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Resume Intelligence Verified
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-100">
            CURRENT CAREER PROFILE
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Extracted from your resume. You can review or customize these values before proceeding.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-cyan-300 bg-slate-900 border border-cyan-500/30 hover:bg-slate-800 transition-all flex items-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
          {isEditing ? 'Done Editing' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Experience Box */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-[10px] uppercase text-slate-500 tracking-wider">Experience</span>
          {isEditing ? (
            <input
              type="number"
              step="0.5"
              value={experienceYears}
              onChange={(e) => setExperienceYears(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-cyan-500/40 rounded-lg p-2 text-sm text-cyan-300 focus:outline-none"
            />
          ) : (
            <p className="text-2xl font-bold text-cyan-300">
              {experienceYears}+ years
            </p>
          )}
        </div>

        {/* Primary Domain Box */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 md:col-span-2">
          <span className="text-[10px] uppercase text-slate-500 tracking-wider">Primary Domain</span>
          {isEditing ? (
            <input
              type="text"
              value={primaryDomain}
              onChange={(e) => setPrimaryDomain(e.target.value)}
              className="w-full bg-slate-950 border border-cyan-500/40 rounded-lg p-2 text-sm text-cyan-300 focus:outline-none"
            />
          ) : (
            <p className="text-xl font-bold text-slate-100 truncate">
              {primaryDomain}
            </p>
          )}
        </div>
      </div>

      {/* Strong Skills Section */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase text-slate-400 font-bold tracking-wider">
            Strong Skills ({strongSkills.length})
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {strongSkills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30"
            >
              {skill}
              {isEditing && (
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
        </div>

        {isEditing && (
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              placeholder="Add new skill..."
              className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 flex-1"
            />
            <button
              onClick={handleAddSkill}
              className="px-3 py-2 rounded-lg bg-cyan-900/60 text-cyan-300 text-xs font-bold hover:bg-cyan-800 transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        )}
      </div>

      {/* Experience Highlights Section */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 mb-8 space-y-4">
        <h3 className="text-xs uppercase text-slate-400 font-bold tracking-wider">
          Experience Highlights
        </h3>

        <ul className="space-y-2 text-xs text-slate-300">
          {highlights.map((h, index) => (
            <li key={index} className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="flex items-start gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                {h}
              </span>
              {isEditing && (
                <button
                  onClick={() => handleRemoveHighlight(index)}
                  className="text-slate-500 hover:text-red-400 shrink-0 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </li>
          ))}
        </ul>

        {isEditing && (
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={newHighlightInput}
              onChange={(e) => setNewHighlightInput(e.target.value)}
              placeholder="Add key achievement highlight..."
              className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 flex-1"
            />
            <button
              onClick={handleAddHighlight}
              className="px-3 py-2 rounded-lg bg-cyan-900/60 text-cyan-300 text-xs font-bold hover:bg-cyan-800 transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3.5 px-6 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2"
      >
        <span>CONTINUE TO TARGET SELECTION</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
