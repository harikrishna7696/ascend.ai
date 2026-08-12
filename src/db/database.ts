import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'career_platform.sqlite');

let dbInstance: Database | null = null;

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const filebuffer = fs.readFileSync(DB_PATH);
    dbInstance = new SQL.Database(filebuffer);
  } else {
    dbInstance = new SQL.Database();
  }

  initSchema(dbInstance);
  saveDb();
  return dbInstance;
}

export function saveDb() {
  if (!dbInstance) return;
  const data = dbInstance.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

function initSchema(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      experience_years REAL,
      primary_domain TEXT,
      strong_skills TEXT,
      experience_highlights TEXT,
      raw_resume_text TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS career_targets (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      days_to_prepare INTEGER,
      target_domains TEXT,
      target_role TEXT,
      locations TEXT,
      target_salary TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS job_searches (
      id TEXT PRIMARY KEY,
      query TEXT,
      target_role TEXT,
      target_domain TEXT,
      location TEXT,
      jobs_found INTEGER,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      search_id TEXT,
      company TEXT,
      title TEXT,
      location TEXT,
      job_url TEXT,
      description TEXT,
      experience_req TEXT,
      skills TEXT,
      nice_to_have_skills TEXT,
      responsibilities TEXT,
      match_percentage REAL,
      gaps TEXT,
      source_date TEXT
    );

    CREATE TABLE IF NOT EXISTS skills (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE,
      category TEXT,
      market_demand_percentage REAL,
      current_level_percentage REAL,
      target_level_percentage REAL,
      gap_percentage REAL,
      priority TEXT,
      why_it_matters TEXT,
      is_selected INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS plan_versions (
      id TEXT PRIMARY KEY,
      version_number INTEGER,
      title TEXT,
      changes_summary TEXT,
      plan_json TEXT,
      is_active INTEGER DEFAULT 0,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS roadmaps (
      id TEXT PRIMARY KEY,
      version_id TEXT,
      target_role TEXT,
      preparation_days INTEGER,
      current_readiness REAL,
      projected_readiness REAL,
      weekly_load_hours REAL,
      is_finalized INTEGER DEFAULT 0,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      roadmap_id TEXT,
      day_number INTEGER,
      week_number INTEGER,
      month_number INTEGER,
      title TEXT,
      type TEXT,
      completed INTEGER DEFAULT 0,
      estimated_minutes INTEGER,
      completed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      roadmap_id TEXT,
      title TEXT,
      target_role TEXT,
      description TEXT,
      skills TEXT,
      stages TEXT,
      current_stage_index INTEGER DEFAULT 0,
      milestones TEXT,
      resume_value TEXT,
      portfolio_value TEXT,
      interview_value TEXT
    );

    CREATE TABLE IF NOT EXISTS content (
      id TEXT PRIMARY KEY,
      roadmap_id TEXT,
      week_number INTEGER,
      learning_topic TEXT,
      video_title TEXT,
      script_status TEXT DEFAULT 'pending',
      recording_status TEXT DEFAULT 'pending',
      editing_status TEXT DEFAULT 'pending',
      thumbnail_status TEXT DEFAULT 'pending',
      published_status TEXT DEFAULT 'pending'
    );

    CREATE TABLE IF NOT EXISTS ai_conversations (
      id TEXT PRIMARY KEY,
      sender TEXT,
      text TEXT,
      timestamp TEXT
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);
}
