import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, ArrowRight, Loader2, Sparkles } from 'lucide-react';

interface Step1ResumeUploadProps {
  onParseResume: (file: File | null, rawText: string) => void;
  isLoading: boolean;
}

export const Step1ResumeUpload: React.FC<Step1ResumeUploadProps> = ({
  onParseResume,
  isLoading,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState('');
  const [stageIndex, setStageIndex] = useState(0);

  const stages = [
    'Parsing Document Structure',
    'Extracting Professional Experience',
    'Identifying Skill Vectors',
    'Extracting Key Projects & Scale',
    'Synthesizing AI Career Profile',
  ];

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

    // Simulate animated extraction pipeline stages
    setStageIndex(0);
    const interval = setInterval(() => {
      setStageIndex((prev) => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    onParseResume(selectedFile, pasteText);
  };

  const sampleResumeData = `John Doe
Senior Computer Vision & AI Engineer
Experience: 3.5 years in AI/CV
Primary Domain: Computer Vision & Edge AI
Skills: Python, C++, PyTorch, YOLO, Object Detection, Segmentation, TensorRT, ONNX, Docker, Redis, RabbitMQ, DeepStream, FFmpeg, Real-time Video Analytics, Model Optimization, MLOps, Production AI
Highlights:
- Developed production AI for real-time video analytics in airport operations handling 200+ camera streams across 40+ operational use cases.
- Optimized deep learning inference pipelines with TensorRT and ONNX reducing latency by 45%.
- Architected distributed event post-processing message bus with Redis & RabbitMQ.`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 font-sans">
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Onboarding Phase 1 / 14
        </div>
        <h2 className="text-3xl sm:text-4xl font-light uppercase tracking-tight text-white font-mono">
          MAP YOUR <span className="font-bold text-cyan-400">CAREER VECTOR</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-mono">
          Upload your resume. We'll analyze where you are and discover where you can go next.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dropzone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all bg-white/5 backdrop-blur-md ${
            dragActive
              ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.2)]'
              : selectedFile
              ? 'border-emerald-500/60 bg-emerald-950/20'
              : 'border-white/10 hover:border-cyan-500/40 hover:bg-white/10'
          }`}
        >
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center gap-3">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
              selectedFile
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}>
              {selectedFile ? <FileText className="w-7 h-7" /> : <Upload className="w-7 h-7" />}
            </div>

            {selectedFile ? (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-emerald-300 font-mono">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-400 font-mono">
                  {(selectedFile.size / 1024).toFixed(1)} KB — Ready to analyze
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer text-sm font-mono font-bold text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/40 underline-offset-4"
                >
                  DROP YOUR RESUME HERE or click to browse
                </label>
                <p className="text-xs text-gray-400 font-mono">
                  Supported formats: PDF, DOCX, TXT
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Text Paste Fallback / Sample Loader */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>OR PASTE RESUME TEXT / LOAD SAMPLE</span>
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setPasteText(sampleResumeData);
              }}
              className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
            >
              <Sparkles className="w-3 h-3" /> Load Sample CV (Computer Vision)
            </button>
          </div>
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="Paste raw text resume contents here..."
            rows={4}
            className="w-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-3 text-xs font-mono text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Animated Progress Indicator during loading */}
        {isLoading && (
          <div className="p-5 rounded-2xl bg-white/5 border border-cyan-500/40 backdrop-blur-md space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs text-cyan-300">
              <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                ANALYZING YOUR CAREER PROFILE
              </span>
              <span className="text-cyan-400 font-extrabold">
                {Math.round(((stageIndex + 1) / stages.length) * 100)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                style={{ width: `${Math.round(((stageIndex + 1) / stages.length) * 100)}%` }}
              />
            </div>

            {/* Active Stage Label */}
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Stage {stageIndex + 1}: {stages[stageIndex]}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || (!selectedFile && !pasteText.trim())}
          className="w-full py-3.5 px-6 rounded-xl font-mono text-sm font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing AI Profile...
            </>
          ) : (
            <>
              Analyze Career Resume <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
