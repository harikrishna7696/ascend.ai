import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ModelSelectorModal } from './components/ModelSelectorModal';

// Onboarding Steps
import { Step1ResumeUpload } from './components/Onboarding/Step1ResumeUpload';
import { Step2ResumeIntelligence } from './components/Onboarding/Step2ResumeIntelligence';
import { Step3TargetSelection } from './components/Onboarding/Step3TargetSelection';
import { Step4JobMarketSearch } from './components/Onboarding/Step4JobMarketSearch';
import { Step5JobIntelligence } from './components/Onboarding/Step5JobIntelligence';
import { Step6JobSummary } from './components/Onboarding/Step6JobSummary';
import { Step7SkillSelection } from './components/Onboarding/Step7SkillSelection';
import { Step8GapAnalysis } from './components/Onboarding/Step8GapAnalysis';
import { Step9PlanGenerator } from './components/Onboarding/Step9PlanGenerator';
import { Step13PlanReview } from './components/Onboarding/Step13PlanReview';
import { Step14PlanModify } from './components/Onboarding/Step14PlanModify';

// Dashboard Views
import { DashboardView } from './components/Dashboard/DashboardView';
import { CareerTargetView } from './components/Dashboard/CareerTargetView';
import { JobMarketView } from './components/Dashboard/JobMarketView';
import { SkillGapView } from './components/Dashboard/SkillGapView';
import { RoadmapView } from './components/Dashboard/RoadmapView';
import { TodayView } from './components/Dashboard/TodayView';
import { ProjectsView } from './components/Dashboard/ProjectsView';
import { ContentView } from './components/Dashboard/ContentView';
import { ProgressView } from './components/Dashboard/ProgressView';
import { AICoachView } from './components/Dashboard/AICoachView';
import { SettingsView } from './components/Dashboard/SettingsView';

import {
  UserProfile,
  CareerTarget,
  MarketIntelligence,
  JobItem,
  SkillItem,
  TransitionPlan,
  PlanVersion,
  DayTask,
  ContentItem,
  ChatMessage,
  MainNavTab,
  ModelDef,
} from './types';

export function App() {
  // App Phase State: step 1..14 for onboarding, 15 for Main Dashboard
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<MainNavTab>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Model Selector State
  const [activeModel, setActiveModel] = useState<ModelDef | null>(null);
  const [allModels, setAllModels] = useState<ModelDef[]>([]);
  const [isModelModalOpen, setIsModelModalOpen] = useState<boolean>(false);

  // Data State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [careerTarget, setCareerTarget] = useState<CareerTarget | null>(null);
  const [marketIntel, setMarketIntel] = useState<MarketIntelligence | null>(null);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [selectedSkillNames, setSelectedSkillNames] = useState<string[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TransitionPlan | null>(null);
  const [planVersions, setPlanVersions] = useState<PlanVersion[]>([]);
  const [todayTasks, setTodayTasks] = useState<DayTask[]>([]);
  const [contentCalendar, setContentCalendar] = useState<ContentItem[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Load active AI model & dashboard state
  useEffect(() => {
    fetch('/api/models')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          setActiveModel(data.activeModel);
          setAllModels(data.models || []);
        }
      })
      .catch((err) => console.log('Models registry load notice:', err));

    fetch('/api/dashboard/data?userId=1')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.plan) {
          setUserProfile(data.user);
          setCareerTarget(data.target);
          setCurrentPlan(data.plan);
          setJobs(data.jobs || []);
          setSkills(data.skills || []);
          setTodayTasks(data.todayTasks || []);
          setContentCalendar(data.contentCalendar || []);
          setPlanVersions(data.planVersions || []);
          setCurrentStep(15); // Directly open Command Center Dashboard!
        }
      })
      .catch((err) => {
        console.log('No existing plan found or new session:', err);
      });
  }, []);

  const handleSelectModelFromModal = async (modelId: string) => {
    try {
      const res = await fetch('/api/models/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId }),
      });
      const data = await res.json();
      if (data.success && data.activeModel) {
        setActiveModel(data.activeModel);
      }
    } catch (err) {
      console.error('Error selecting model:', err);
    }
  };

  // STEP 1 -> 2: Parse Resume
  const handleParseResume = async (file: File | null, rawText: string) => {
    setIsLoading(true);
    setErrorText(null);
    try {
      const formData = new FormData();
      if (file) {
        formData.append('resumeFile', file);
      }
      if (rawText) formData.append('rawText', rawText);

      const res = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to parse resume document');
      }

      const data = await res.json();
      if (data.profile) {
        setUserProfile(data.profile);
        setCurrentStep(2); // Move to Step 2
      } else {
        throw new Error('Unable to extract career profile from resume');
      }
    } catch (err: any) {
      setErrorText(err.message || 'Error parsing resume document');
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2 -> 3: Confirm Profile
  const handleConfirmProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentStep(3); // Move to Step 3
  };

  // STEP 3 -> 4: Target Selection & Execute Job Search
  const handleTargetSelection = async (target: CareerTarget) => {
    setCareerTarget(target);
    setCurrentStep(4); // Move to Step 4 Search Animation
    setIsLoading(true);
    setErrorText(null);

    try {
      const res = await fetch('/api/jobs/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: target.targetRole,
          targetDomains: target.targetDomains,
          locations: target.locations,
        }),
      });

      if (!res.ok) throw new Error('Failed to search job market');
      const data = await res.json();

      setJobs(data.jobs || []);
      const rawIntel = data.marketIntelligence || {};
      setMarketIntel({
        targetRole: rawIntel.targetRole || target.targetRole || 'Senior Defense CV Engineer',
        jobsAnalyzedCount: rawIntel.jobsAnalyzedCount || (data.jobs ? data.jobs.length : 4),
        skillDemand: Array.isArray(rawIntel.skillDemand) && rawIntel.skillDemand.length > 0
          ? rawIntel.skillDemand
          : [
              { skill: 'Python', percentage: 91, demandCount: 4 },
              { skill: 'CUDA', percentage: 76, demandCount: 3 },
              { skill: 'TensorRT', percentage: 74, demandCount: 3 },
              { skill: 'ROS2', percentage: 68, demandCount: 3 },
              { skill: 'Tracking', percentage: 71, demandCount: 3 },
              { skill: 'SLAM', percentage: 58, demandCount: 2 },
              { skill: 'C++', percentage: 82, demandCount: 3 },
              { skill: 'Docker', percentage: 72, demandCount: 3 },
              { skill: 'Transformers', percentage: 64, demandCount: 2 },
            ],
      });

      // Now analyze skill gaps
      const skillRes = await fetch('/api/skills/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: target.targetRole,
          profile: userProfile,
          jobs: data.jobs,
        }),
      });

      if (skillRes.ok) {
        const skillData = await skillRes.json();
        setSkills(skillData.skills || []);
      }

      // Automatically transition after brief search animation
      setTimeout(() => {
        setCurrentStep(5); // Move to Step 5 (Job Intel)
      }, 2000);
    } catch (err: any) {
      setErrorText(err.message || 'Error fetching market telemetry');
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 7 -> 8: Target Skill Selection
  const handleSkillSelection = (selectedNames: string[]) => {
    setSelectedSkillNames(selectedNames);
    setCurrentStep(8); // Move to Step 8 (Gap Analysis)
  };

  // STEP 8 -> 9 & 13: Generate Plan
  const handleGeneratePlan = async () => {
    setCurrentStep(9); // Plan generation screen
    setIsLoading(true);
    setErrorText(null);

    try {
      const res = await fetch('/api/plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: userProfile,
          target: careerTarget,
          selectedSkills: selectedSkillNames,
          jobs,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate plan');
      const data = await res.json();

      setCurrentPlan(data.plan);
      setPlanVersions([{ id: 'v1', versionNumber: 1, planData: data.plan }]);

      // Populate default tasks & calendar
      if (data.plan && data.plan.months) {
        const firstMonth = data.plan.months[0];
        const firstWeek = firstMonth?.weeks?.[0];
        const firstDay = firstWeek?.days?.[0];
        if (firstDay && firstDay.tasks) {
          setTodayTasks(firstDay.tasks);
        }
      }

      setTimeout(() => {
        setCurrentStep(13); // Step 13 (Plan Review)
      }, 1500);
    } catch (err: any) {
      setErrorText(err.message || 'Error generating plan');
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 14: Modify Plan
  const handleModifyPlanPrompt = async (promptText: string) => {
    if (!currentPlan) return;
    setIsLoading(true);
    setErrorText(null);

    try {
      const res = await fetch('/api/plan/modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPlan,
          promptText,
          planVersions,
        }),
      });

      if (!res.ok) throw new Error('Failed to modify plan');
      const data = await res.json();

      setCurrentPlan(data.plan);
      setPlanVersions(data.planVersions || []);
    } catch (err: any) {
      setErrorText(err.message || 'Error modifying plan');
    } finally {
      setIsLoading(false);
    }
  };

  // FINALIZE PLAN -> STEP 15 (Main Dashboard Command Center)
  const handleFinalizePlan = async () => {
    if (!currentPlan) return;
    setIsLoading(true);
    try {
      await fetch('/api/plan/finalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, plan: currentPlan }),
      });

      setCurrentStep(15); // Enter Main Command Center!
      setActiveTab('dashboard');
    } catch (err: any) {
      console.error('Error finalizing plan:', err);
      setCurrentStep(15);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Application Data
  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to reset all data and restart onboarding?')) {
      await fetch('/api/reset', { method: 'POST' });
      setUserProfile(null);
      setCareerTarget(null);
      setMarketIntel(null);
      setJobs([]);
      setSkills([]);
      setSelectedSkillNames([]);
      setCurrentPlan(null);
      setPlanVersions([]);
      setTodayTasks([]);
      setChatHistory([]);
      setCurrentStep(1);
    }
  };

  // Toggle Task Completion State
  const handleToggleTask = (taskId: string, completed: boolean) => {
    setTodayTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed } : t))
    );
  };

  // Send message to AI Coach
  const handleSendMessageToCoach = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            user: userProfile,
            target: careerTarget,
            plan: currentPlan,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.response,
          timestamp: new Date().toISOString(),
        };
        setChatHistory((prev) => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error('Coach error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-slate-100 flex flex-col font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden"
      style={{ background: 'radial-gradient(circle at 50% 50%, #0c1221 0%, #050608 100%)' }}
    >
      {/* Canvas Particle Grid Background */}
      <ParticleBackground />

      {/* Main Header */}
      <Header
        appName="AI CAREER TRANSITION PLATFORM"
        targetRole={careerTarget?.targetRole || 'Defense AI Engineer'}
        readinessPercentage={currentPlan?.projectedReadinessPercentage || 62}
        planVersionNumber={currentPlan?.version || 1}
        isDashboardActive={currentStep === 15}
        activeModel={activeModel || undefined}
        onOpenModelSelector={() => setIsModelModalOpen(true)}
        onResetData={handleResetData}
        onStartNewPlan={() => setCurrentStep(1)}
      />

      {/* Error Banner */}
      {errorText && (
        <div className="bg-red-950/80 border-b border-red-500/40 px-4 py-2 text-center text-xs text-red-200 font-mono flex items-center justify-center gap-2 z-50">
          <span>⚠️ {errorText}</span>
          <button onClick={() => setErrorText(null)} className="underline text-red-400">
            Dismiss
          </button>
        </div>
      )}

      {/* App Body */}
      {currentStep < 15 ? (
        /* ONBOARDING FLOW VIEWPORT */
        <main className="flex-1 z-10 py-6 overflow-y-auto">
          {currentStep === 1 && (
            <Step1ResumeUpload
              onParseResume={handleParseResume}
              isLoading={isLoading}
            />
          )}

          {currentStep === 2 && userProfile && (
            <Step2ResumeIntelligence
              profile={userProfile}
              onContinue={handleConfirmProfile}
            />
          )}

          {currentStep === 3 && (
            <Step3TargetSelection onContinue={handleTargetSelection} />
          )}

          {currentStep === 4 && careerTarget && (
            <Step4JobMarketSearch
              targetRole={careerTarget.targetRole}
              targetDomains={careerTarget.targetDomains}
              locations={careerTarget.locations}
              isLoading={isLoading}
              onSearchComplete={() => setCurrentStep(5)}
            />
          )}

          {currentStep === 5 && marketIntel && (
            <Step5JobIntelligence
              marketIntel={marketIntel}
              onContinue={() => setCurrentStep(6)}
            />
          )}

          {currentStep === 6 && (
            <Step6JobSummary
              jobs={jobs}
              onContinue={() => setCurrentStep(7)}
            />
          )}

          {currentStep === 7 && (
            <Step7SkillSelection
              initialSkills={skills}
              onContinue={handleSkillSelection}
            />
          )}

          {currentStep === 8 && careerTarget && (
            <Step8GapAnalysis
              selectedSkills={selectedSkillNames}
              targetRole={careerTarget.targetRole}
              onContinue={handleGeneratePlan}
            />
          )}

          {currentStep === 9 && careerTarget && (
            <Step9PlanGenerator
              daysToPrepare={careerTarget.daysToPrepare}
              targetRole={careerTarget.targetRole}
            />
          )}

          {currentStep === 13 && currentPlan && (
            <Step13PlanReview
              plan={currentPlan}
              strongSkills={userProfile?.strongSkills || []}
              selectedSkills={selectedSkillNames}
              onFinalize={handleFinalizePlan}
              onModify={() => setCurrentStep(14)}
              onRegenerate={handleGeneratePlan}
              isLoading={isLoading}
            />
          )}

          {currentStep === 14 && currentPlan && (
            <Step14PlanModify
              currentPlan={currentPlan}
              planVersions={planVersions}
              onApplyModification={handleModifyPlanPrompt}
              onSelectVersion={(v) => setCurrentPlan(v)}
              onFinalize={handleFinalizePlan}
              onBackToReview={() => setCurrentStep(13)}
              isLoading={isLoading}
            />
          )}
        </main>
      ) : (
        /* MAIN COMMAND CENTER DASHBOARD (Step 15) */
        <div className="flex-1 flex flex-col lg:flex-row z-10 overflow-hidden">
          {/* Navigation Sidebar */}
          <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

          {/* Tab View Content Area */}
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-black/20">
            {activeTab === 'dashboard' && (
              <DashboardView
                stats={{
                  currentDay: 1,
                  totalDays: currentPlan?.preparationDays || 180,
                  overallProgressPercentage: 4,
                  learningHoursCompleted: 14,
                  tasksCompleted: todayTasks.filter((t) => t.completed).length,
                  totalTasks: todayTasks.length || 5,
                  videosPublished: 1,
                  totalVideosPlanned: 26,
                }}
                todayTasks={todayTasks}
                onToggleTask={handleToggleTask}
                onNavigateTab={setActiveTab}
                targetRole={careerTarget?.targetRole || 'Defense AI Engineer'}
                currentRole={userProfile?.primaryDomain || 'Computer Vision Engineer'}
                currentReadiness={currentPlan?.projectedReadinessPercentage || 62}
              />
            )}

            {activeTab === 'target' && careerTarget && (
              <CareerTargetView
                target={careerTarget}
                currentRole={userProfile?.primaryDomain}
                readinessPercentage={currentPlan?.projectedReadinessPercentage}
              />
            )}

            {activeTab === 'job_market' && (
              <JobMarketView
                jobs={jobs}
                targetRole={careerTarget?.targetRole || 'Defense AI Engineer'}
              />
            )}

            {activeTab === 'skill_gap' && (
              <SkillGapView skills={skills} />
            )}

            {activeTab === 'roadmap' && currentPlan && (
              <RoadmapView
                plan={currentPlan}
                onToggleTask={handleToggleTask}
              />
            )}

            {activeTab === 'today' && (
              <TodayView
                dayNumber={1}
                todayTasks={todayTasks}
                onToggleTask={handleToggleTask}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsView projects={currentPlan?.projects || []} />
            )}

            {activeTab === 'content' && (
              <ContentView contentCalendar={currentPlan?.contentCalendar || contentCalendar} />
            )}

            {activeTab === 'progress' && (
              <ProgressView
                stats={{
                  currentDay: 1,
                  totalDays: currentPlan?.preparationDays || 180,
                  overallProgressPercentage: 4,
                  learningHoursCompleted: 14,
                  tasksCompleted: todayTasks.filter((t) => t.completed).length,
                  totalTasks: todayTasks.length || 5,
                  videosPublished: 1,
                  totalVideosPlanned: 26,
                }}
                readinessScore={currentPlan?.projectedReadinessPercentage}
              />
            )}

            {activeTab === 'coach' && (
              <AICoachView
                chatHistory={chatHistory}
                onSendMessage={handleSendMessageToCoach}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'settings' && currentPlan && (
              <SettingsView
                plan={currentPlan}
                planVersions={planVersions}
                onResetData={handleResetData}
                onSelectVersion={(v) => setCurrentPlan(v)}
                onModelChanged={(m) => setActiveModel(m)}
              />
            )}
          </main>
        </div>
      )}

      {/* Model Selector Modal */}
      <ModelSelectorModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        models={allModels}
        activeModelId={activeModel?.id || ''}
        onSelectModel={handleSelectModelFromModal}
        onOpenYamlSettings={() => {
          setActiveTab('settings');
        }}
      />

      {/* Telemetry Footer Ticker */}
      <footer className="h-8 bg-black/60 border-t border-white/10 flex items-center px-4 gap-4 overflow-hidden z-20 font-mono text-[9px] shrink-0 select-none">
        <span className="text-cyan-400 uppercase font-bold shrink-0">Data Stream:</span>
        <div className="flex-1 overflow-hidden whitespace-nowrap text-gray-400 tracking-wider flex gap-8 items-center">
          <span className="animate-pulse">[PROCESSED] JOB_ID: 98231 • MATCH: 82% • COMPANY: BAE_SYSTEMS</span>
          <span>[ANALYZING] TENSOR_CORES_OPTIMIZATION_V4</span>
          <span>[SYSTEM] ROADMAP_SYNCH_COMPLETE • LAST_UPDATE: 2026-08-12_02:48</span>
          <span>[MARKET] DEFENSE_CV_SALARY_AVG: $165,000 (+12% YoY)</span>
          <span>[AI] COACH_VERDICT: MOMENTUM_HIGH</span>
        </div>
        <div className="shrink-0 hidden sm:flex items-center gap-3">
          <span className="text-green-400 underline uppercase">Network: Stable</span>
          <span className="text-gray-400">v3.4.1-frosted</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
