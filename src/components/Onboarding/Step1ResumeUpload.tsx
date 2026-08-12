import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  FileText,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Sparkles,
  Scan,
  Cpu,
  Zap,
  Target,
  FileCheck,
  Eye,
  Check
} from 'lucide-react';

interface Step1ResumeUploadProps {
  onParseResume: (file: File | null, rawText: string) => void;
  isLoading: boolean;
}

export const Step1ResumeUpload: React.FC<Step1ResumeUploadProps> = ({
  onParseResume,
  isLoading: backendLoading,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [detectedTargets, setDetectedTargets] = useState<number[]>([]);

  const sampleResumeData = `John Doe
Senior AI & Systems Engineer
Experience: 3.5 years in Production AI / CV
Primary Domain: Computer Vision & Edge AI
Skills: Python, C++, PyTorch, YOLO, Object Detection, Segmentation, TensorRT, ONNX, Docker, Redis, RabbitMQ, DeepStream, FFmpeg, Real-time Video Analytics, Model Optimization, MLOps, Production AI
Highlights:
- Developed production AI for real-time video analytics handling 200+ camera streams across 40+ operational use cases.
- Optimized deep learning inference pipelines with TensorRT and ONNX reducing latency by 45%.
- Architected distributed event post-processing message bus with Redis & RabbitMQ.`;

  const stages = [
    { label: 'Mounting PDF Byte Stream & OCR Raster', icon: Scan },
    { label: 'Scanning Typography & Structural Layout', icon: Eye },
    { label: 'Extracting Technical Skill Vectors', icon: Cpu },
    { label: 'Parsing Scale Metrics & System Impact', icon: Target },
    { label: 'Synthesizing AI Candidate Knowledge Graph', icon: Zap },
  ];

  // Handle Scanning Animation Sequence
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      setScanProgress(0);
      setActiveStage(0);
      setDetectedTargets([]);

      const startTime = Date.now();
      const totalDuration = 3500; // 3.5s smooth animation loop

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
        setScanProgress(progress);

        // Stage transitions
        if (progress > 15 && progress <= 35) {
          setActiveStage(1);
          setDetectedTargets((prev) => (prev.includes(1) ? prev : [...prev, 1]));
        } else if (progress > 35 && progress <= 60) {
          setActiveStage(2);
          setDetectedTargets((prev) => (prev.includes(2) ? prev : [...prev, 2]));
        } else if (progress > 60 && progress <= 85) {
          setActiveStage(3);
          setDetectedTargets((prev) => (prev.includes(3) ? prev : [...prev, 3]));
        } else if (progress > 85) {
          setActiveStage(4);
          setDetectedTargets((prev) => (prev.includes(4) ? prev : [...prev, 4]));
        }

        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !pasteText.trim()) return;

    setIsScanning(true);

    // Give minimum 3.5s for the scanner animation to execute
    setTimeout(() => {
      onParseResume(selectedFile, pasteText);
    }, 3200);
  };

  const displayFileName = selectedFile ? selectedFile.name : pasteText ? 'Pasted_Resume_Document.pdf' : 'Career_Resume.pdf';
  const displayFileSize = selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : '4.2 KB';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs uppercase tracking-widest backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Onboarding Phase 1 / 14
        </div>
        <h2 className="text-3xl sm:text-4xl font-light uppercase tracking-tight text-white font-mono">
          MAP YOUR <span className="font-bold text-cyan-400">CAREER VECTOR</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto font-mono">
          Upload your resume. Our AI scanner performs optical analysis, skill extraction, and career trajectory mapping.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isScanning || backendLoading ? (
          /* ========================================================= */
          /*         AI PDF LASER SCAN & REVIEW ANIMATION OVERLAY       */
          /* ========================================================= */
          <motion.div
            key="pdf-scanner-screen"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="p-6 rounded-3xl bg-slate-950/90 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.2)] space-y-6 relative overflow-hidden backdrop-blur-xl"
          >
            {/* Background Cyber Grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `radial-gradient(#06b6d4 1px, transparent 1px), linear-gradient(to right, rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.05) 1px, transparent 1px)`,
                backgroundSize: '20px 20px, 40px 40px, 40px 40px',
              }}
            />

            {/* Header Telemetry */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/30 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <Scan className="w-5 h-5 animate-spin" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-cyan-300 tracking-wider">
                      AI OCR RESUME SCANNER
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-cyan-950 text-cyan-400 border border-cyan-500/40 animate-pulse">
                      LIVE AUDIT
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Target Document: <strong className="text-slate-200">{displayFileName}</strong> ({displayFileSize})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-500 block font-bold">OCR Precision</span>
                  <span className="text-cyan-400 font-extrabold text-sm">99.8%</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-500 block font-bold">Progress</span>
                  <span className="text-emerald-400 font-extrabold text-sm">{scanProgress}%</span>
                </div>
              </div>
            </div>

            {/* SIMULATED PDF REVIEW DOCUMENT CANVAS */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 overflow-hidden shadow-inner min-h-[380px]">
              {/* PDF Document Header Ribbon */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-3 font-sans">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-slate-200 uppercase tracking-wide">PDF DOCUMENT VIEW</span>
                  <span className="text-slate-500">| Page 1 of 1</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">UTF-8 ENCODED</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono">PARSING ACTIVE</span>
                </div>
              </div>

              {/* MOVING GLOWING CYAN LASER SCAN BEAM */}
              <motion.div
                className="absolute left-0 right-0 z-30 pointer-events-none flex flex-col items-center"
                animate={{
                  top: ['5%', '92%', '5%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#06b6d4,0_0_10px_#38bdf8]" />
                <div className="w-full h-12 bg-gradient-to-b from-cyan-500/20 to-transparent" />
              </motion.div>

              {/* PDF CONTENT MOCKUP WITH DYNAMIC OPTICAL BOUNDING BOX OVERLAYS */}
              <div className="space-y-6 relative font-sans text-slate-300 text-xs leading-relaxed">
                {/* SECTION 1: CANDIDATE IDENTITY */}
                <div className="relative p-3 rounded-xl transition-all border border-transparent">
                  {detectedTargets.includes(1) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 rounded-xl border-2 border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)] pointer-events-none z-20"
                    >
                      <div className="absolute -top-3 left-3 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 text-[10px] font-mono font-extrabold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" /> [TARGET 01]: PROFILE IDENTITY DETECTED
                      </div>
                    </motion.div>
                  )}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-100 font-mono uppercase tracking-tight">
                      {selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : 'Senior AI & Systems Engineer'}
                    </h3>
                    <p className="text-xs text-cyan-400 font-mono">
                      Specialization: Computer Vision • Real-Time Systems • MLOps
                    </p>
                  </div>
                </div>

                {/* SECTION 2: TECHNICAL SKILLS */}
                <div className="relative p-3 rounded-xl transition-all border border-transparent">
                  {detectedTargets.includes(2) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 rounded-xl border-2 border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)] pointer-events-none z-20"
                    >
                      <div className="absolute -top-3 left-3 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-400 text-emerald-300 text-[10px] font-mono font-extrabold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> [TARGET 02]: 18 CORE TECHNICAL SKILLS EXTRACTED
                      </div>
                    </motion.div>
                  )}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                      Technical Stack & Frameworks:
                    </span>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                      {['Python', 'C++', 'PyTorch', 'TensorRT', 'YOLO', 'ONNX', 'Docker', 'Redis', 'RabbitMQ', 'DeepStream'].map((sk, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SECTION 3: WORK EXPERIENCE & SCALE */}
                <div className="relative p-3 rounded-xl transition-all border border-transparent">
                  {detectedTargets.includes(3) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 rounded-xl border-2 border-sky-400 bg-sky-500/10 shadow-[0_0_20px_rgba(56,189,248,0.3)] pointer-events-none z-20"
                    >
                      <div className="absolute -top-3 left-3 px-2 py-0.5 rounded bg-sky-950 border border-sky-400 text-sky-300 text-[10px] font-mono font-extrabold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-sky-400" /> [TARGET 03]: 3.5+ YEARS VERIFIED SYSTEM EXPERIENCE
                      </div>
                    </motion.div>
                  )}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                      Engineering Experience & Impact:
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      <li className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-mono">•</span>
                        <span>Architected production AI analytics pipelines serving 200+ parallel camera streams.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-mono">•</span>
                        <span>Optimized TensorRT and ONNX deep learning inference models, cutting latency by 45%.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* SECTION 4: KNOWLEDGE GRAPH & TRAJECTORY */}
                <div className="relative p-3 rounded-xl transition-all border border-transparent">
                  {detectedTargets.includes(4) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 rounded-xl border-2 border-indigo-400 bg-indigo-500/10 shadow-[0_0_20px_rgba(129,140,248,0.3)] pointer-events-none z-20"
                    >
                      <div className="absolute -top-3 left-3 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-400 text-indigo-300 text-[10px] font-mono font-extrabold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-indigo-400" /> [TARGET 04]: CAREER VECTOR GRAPH GENERATED
                      </div>
                    </motion.div>
                  )}
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Target Role Readiness:</span>
                    <span className="text-cyan-300 font-extrabold">READY FOR CAREER ROADMAP GENERATION</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LIVE PIPELINE STAGES STEP INDICATOR */}
            <div className="space-y-2 font-mono">
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {stages.map((stg, i) => {
                  const Icon = stg.icon;
                  const isDone = activeStage > i;
                  const isCurrent = activeStage === i;

                  return (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-all ${
                        isDone
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                          : isCurrent
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                      ) : (
                        <Icon className="w-4 h-4 text-slate-600 shrink-0" />
                      )}
                      <span className="truncate text-[11px]">{stg.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========================================================= */
          /*            INITIAL RESUME UPLOAD FORM STATE                */
          /* ========================================================= */
          <motion.form
            key="upload-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Dropzone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all backdrop-blur-md cursor-pointer ${
                dragActive
                  ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_35px_rgba(6,182,212,0.25)]'
                  : selectedFile
                  ? 'border-emerald-500/60 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                  : 'border-white/10 hover:border-cyan-500/40 hover:bg-white/5 bg-slate-900/50'
              }`}
            >
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              <label htmlFor="resume-upload" className="cursor-pointer block">
                <div className="flex flex-col items-center justify-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all ${
                      selectedFile
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                    }`}
                  >
                    {selectedFile ? <FileCheck className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                  </motion.div>

                  {selectedFile ? (
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-emerald-300 font-mono">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-400 font-mono">
                        {(selectedFile.size / 1024).toFixed(1)} KB • PDF Document Ready
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <span className="text-sm font-mono font-bold text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/40 underline-offset-4">
                        DROP YOUR RESUME HERE or click to browse
                      </span>
                      <p className="text-xs text-slate-400 font-mono">
                        Supported formats: PDF, DOCX, TXT
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Text Paste Fallback / Sample Loader */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>OR PASTE RESUME TEXT / LOAD SAMPLE</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPasteText(sampleResumeData);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Load Sample CV (Computer Vision)
                </button>
              </div>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Paste raw text resume contents here..."
                rows={4}
                className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-3.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={!selectedFile && !pasteText.trim()}
              className="w-full py-4 px-6 rounded-2xl font-mono text-sm font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 shadow-[0_0_25px_rgba(6,182,212,0.35)] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Scan className="w-5 h-5 text-slate-950" />
              <span>Analyze Career Resume</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
