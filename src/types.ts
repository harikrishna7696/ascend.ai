export type OnboardingStep = 
  | 1 // Resume Upload
  | 2 // Resume Intelligence
  | 3 // Target Selection
  | 4 // Job Market Search
  | 5 // Job Intelligence
  | 6 // Job Description Summary
  | 7 // Skill Selection
  | 8 // Gap Analysis
  | 9 // Plan Generation
  | 13 // Plan Review
  | 14; // Plan Modify

export type MainNavTab = 
  | 'dashboard'
  | 'target'
  | 'job_market'
  | 'skill_gap'
  | 'roadmap'
  | 'today'
  | 'projects'
  | 'content'
  | 'progress'
  | 'coach'
  | 'settings';

export interface UserProfile {
  id?: string;
  name: string;
  email?: string;
  experienceYears: number;
  primaryDomain: string;
  strongSkills: string[];
  experienceHighlights: string[];
  rawResumeText?: string;
}

export interface CareerTarget {
  daysToPrepare: number;
  targetDomains: string[];
  targetRole: string;
  locations: string[];
  targetSalary?: string;
}

export interface JobItem {
  id: string;
  company: string;
  title: string;
  location: string;
  jobUrl: string;
  description: string;
  experienceReq: string;
  skills: string[];
  niceToHaveSkills: string[];
  responsibilities: string[];
  matchPercentage: number;
  gaps: string[];
  sourceDate?: string;
}

export interface MarketIntelligence {
  targetRole: string;
  jobsAnalyzedCount: number;
  skillDemand: {
    skill: string;
    percentage: number;
    demandCount: number;
  }[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'strong' | 'high_priority' | 'optional';
  marketDemandPercentage: number;
  currentLevelPercentage: number;
  targetLevelPercentage: number;
  gapPercentage: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  whyItMatters: string;
  isSelected: boolean;
}

export interface DayTask {
  id: string;
  dayNumber: number;
  title: string;
  type: 'learn' | 'implement' | 'practice' | 'document' | 'publish';
  completed: boolean;
  estimatedMinutes: number;
}

export interface WeekPlan {
  weekNumber: number;
  title: string;
  focusSkill: string;
  learningTopic: string;
  videoIdea: string;
  tasks: DayTask[];
}

export interface MonthPlan {
  monthNumber: number;
  title: string;
  theme: string;
  focusSkills: string[];
  weeks: WeekPlan[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  targetRole: string;
  description: string;
  skills: string[];
  stages: string[];
  currentStageIndex: number;
  milestones: ProjectMilestone[];
  resumeValue: string;
  portfolioValue: string;
  interviewValue: string;
}

export interface ContentItem {
  id: string;
  weekNumber: number;
  learningTopic: string;
  videoTitle: string;
  scriptStatus: 'pending' | 'in_progress' | 'completed';
  recordingStatus: 'pending' | 'in_progress' | 'completed';
  editingStatus: 'pending' | 'in_progress' | 'completed';
  thumbnailStatus: 'pending' | 'in_progress' | 'completed';
  publishedStatus: 'pending' | 'in_progress' | 'completed';
}

export interface TransitionPlan {
  id: string;
  version: number;
  targetRole: string;
  preparationDays: number;
  currentReadinessPercentage: number;
  projectedReadinessPercentage: number;
  weeklyLoadHours: number;
  months: MonthPlan[];
  projects: ProjectItem[];
  contentCalendar: ContentItem[];
  isFinalized: boolean;
  createdAt: string;
}

export interface PlanVersion {
  id: string;
  versionNumber: number;
  title: string;
  changesSummary: string;
  planData: TransitionPlan;
  createdAt: string;
}

export interface ProgressStats {
  currentDay: number;
  totalDays: number;
  overallProgressPercentage: number;
  skillGrowth: { skill: string; current: number; target: number }[];
  learningHoursCompleted: number;
  tasksCompleted: number;
  totalTasks: number;
  videosPublished: number;
  totalVideosPlanned: number;
  readinessScore: {
    currentSkillMatch: number;
    requiredSkillCoverage: number;
    projectReadiness: number;
    productionExperience: number;
    portfolioScore: number;
    publicProofScore: number;
    totalReadiness: number;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ModelDef {
  id: string;
  name: string;
  provider: string;
  type: 'opensource' | 'local_ollama' | 'proprietary' | 'offline';
  description: string;
  baseUrl: string;
  endpointType: 'openai_compatible' | 'gemini' | 'offline';
  apiKeyEnvVar: string;
  modelName: string;
}

export interface ModelConfig {
  active_model: string;
  default_temperature: number;
  max_tokens: number;
  models: ModelDef[];
}

