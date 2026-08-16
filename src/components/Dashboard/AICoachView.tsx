import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Bot,
  Send,
  Sparkles,
  Loader2,
  User,
  Copy,
  Check,
  Terminal,
  Shield,
  Trash2,
  Cpu,
  Target,
  Zap,
  CheckCircle2,
  Code2,
  Flame,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import { ChatMessage } from '../../types';

interface AICoachViewProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onClearHistory?: () => void;
}

// Code Block with one-click Copy button
const CodeBlock: React.FC<{ language?: string; value: string }> = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950/90 shadow-lg">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/90 border-b border-cyan-500/20 text-[11px] font-mono text-cyan-400">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="uppercase font-semibold tracking-wider">{language || 'code'}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-300 transition-all text-[11px] cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-gray-400" />
              <span>Copy Code</span>
            </>
          )}
        </motion.button>
      </div>
      <div className="p-3.5 overflow-x-auto text-[12px] font-mono text-cyan-200 leading-relaxed">
        <pre>{value}</pre>
      </div>
    </div>
  );
};

export const AICoachView: React.FC<AICoachViewProps> = ({
  chatHistory,
  onSendMessage,
  isLoading,
  onClearHistory,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPromptCategories = [
    {
      category: 'Resume & Positioning',
      icon: Briefcase,
      prompts: [
        'How should I position CUDA on my resume for Defense AI?',
        'How do I frame general CV experience for Autonomous Systems?',
      ],
    },
    {
      category: 'Technical Architecture',
      icon: Zap,
      prompts: [
        'How to eliminate PCIe transfer bottlenecks in real-time CUDA streams?',
        'Explain ROS2 Zero-Copy loaned messages vs socket IPC.',
      ],
    },
    {
      category: 'Tracking & Edge AI',
      icon: Target,
      prompts: [
        'Compare ByteTrack vs DeepSORT under optical occlusion.',
        'What are the key steps to optimize TensorRT FP16 for Jetson Orin?',
      ],
    },
    {
      category: 'Tactical Coaching',
      icon: HelpCircle,
      prompts: [
        'I only have 1 hour today, which protocol task moves the needle most?',
        'What are the top 3 live technical interview questions for defense edge AI?',
      ],
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    onSendMessage(inputMessage.trim());
    setInputMessage('');
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleClearHistory = async () => {
    try {
      await fetch('/api/coach/clear', { method: 'POST' });
      if (onClearHistory) {
        onClearHistory();
      }
    } catch (e) {
      console.warn('Error clearing history:', e);
    }
    setShowClearConfirm(false);
  };

  return (
    <div className="space-y-6 font-mono max-w-5xl mx-auto">
      {/* Title & Status Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-cyan-950/40 border border-cyan-500/30 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>

        <div className="relative z-10 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              CAREER INTELLIGENCE ARCHITECT
            </span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              STATUS: MISSION READY
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-light tracking-tight uppercase text-white">
            DEFENSE AI <span className="font-bold text-cyan-400">TACTICAL COACH</span>
          </h2>
          <p className="text-xs text-gray-300 font-sans max-w-2xl leading-relaxed">
            Get structured architectural briefings, resume impact statements, CUDA/ROS2 code blueprints, and daily transition strategy tailored to your 180-day defense career target.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 shrink-0">
          {chatHistory.length > 0 && (
            <>
              {showClearConfirm ? (
                <div className="flex items-center gap-2 bg-red-950/80 border border-red-500/40 p-1.5 rounded-xl">
                  <span className="text-[11px] text-red-300 font-bold px-2">Clear all messages?</span>
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 text-[11px] cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  title="Clear conversation history"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 text-gray-400 hover:text-red-400 text-xs transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear Chat</span>
                </motion.button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Suggested Tactical Prompts Matrix */}
      <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] uppercase text-cyan-400 font-bold tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Tactical Query Matrix:
          </span>
          <span className="text-[10px] text-gray-400 font-sans">Click any prompt to execute instant intelligence briefing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {suggestedPromptCategories.map((cat, cIdx) => {
            const Icon = cat.icon;
            return (
              <div key={cIdx} className="space-y-1.5 p-2.5 rounded-xl bg-black/20 border border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-gray-400">
                  <Icon className="w-3 h-3 text-cyan-400" />
                  <span>{cat.category}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {cat.prompts.map((p, pIdx) => (
                    <motion.button
                      key={pIdx}
                      type="button"
                      whileHover={{ x: 2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSendMessage(p)}
                      disabled={isLoading}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-950/30 text-gray-300 hover:text-cyan-200 text-xs transition-all text-left font-sans cursor-pointer disabled:opacity-50"
                    >
                      "{p}"
                    </motion.button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/70 border border-cyan-500/20 backdrop-blur-xl min-h-[420px] max-h-[640px] overflow-y-auto space-y-6 shadow-inner">
        {chatHistory.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Bot className="w-7 h-7 animate-pulse" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              AI Career Intelligence Link Active
            </h3>
            <p className="text-xs text-gray-400 font-sans max-w-md mx-auto leading-relaxed">
              Ask any question regarding your Defense CV & Autonomous Systems roadmap, resume framing, CUDA streams, TensorRT deployment, or interview preparation.
            </p>
          </div>
        ) : (
          chatHistory.map((msg) => {
            const isUser = msg.sender === 'user';
            const isCopied = copiedMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                {/* Sender Header */}
                <div className="flex items-center gap-2 px-1 text-[11px] font-mono">
                  {isUser ? (
                    <>
                      <span className="text-gray-400">
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'You'}
                      </span>
                      <span className="text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1">
                        CANDIDATE QUERY <User className="w-3.5 h-3.5 text-cyan-400" />
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase tracking-wider">
                        <Bot className="w-3.5 h-3.5" />
                        <span>INTELLIGENCE BRIEFING</span>
                      </div>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Tactical Coach'}
                      </span>
                    </>
                  )}
                </div>

                {/* Message Body Card */}
                {isUser ? (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-100 font-sans text-xs sm:text-[13px] leading-relaxed max-w-2xl shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    {msg.text}
                  </div>
                ) : (
                  <div className="w-full rounded-2xl bg-slate-900/80 border border-cyan-500/30 text-gray-200 overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
                    {/* Briefing Action Bar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-950/60 border-b border-cyan-500/20 text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        <span className="font-mono text-cyan-300 uppercase font-semibold tracking-wider text-[10px]">
                          DEFENSE AI ARCHITECT PROTOCOL
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-200 transition-all font-mono text-[11px] cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Briefing Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-gray-400" />
                            <span>Copy Briefing</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    {/* Formatted Markdown Content Container */}
                    <div className="p-5 sm:p-6 font-sans text-sm text-slate-100 leading-relaxed">
                      <div className="markdown-body space-y-4">
                        <Markdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-lg font-bold text-white uppercase tracking-wider border-b border-cyan-500/30 pb-2 mb-3 mt-1 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>{children}</span>
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-base font-bold text-cyan-300 uppercase tracking-wide border-b border-cyan-500/20 pb-1.5 mb-2 mt-4 flex items-center gap-2">
                                <Target className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>{children}</span>
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-[14px] font-bold text-cyan-300 uppercase tracking-wide mb-2 mt-4 flex items-center gap-2 bg-cyan-950/40 px-3 py-1.5 rounded-lg border-l-4 border-cyan-400">
                                <span>{children}</span>
                              </h3>
                            ),
                            h4: ({ children }) => (
                              <h4 className="text-[13px] font-semibold text-gray-200 uppercase tracking-wide mb-1 mt-3">
                                {children}
                              </h4>
                            ),
                            p: ({ children }) => (
                              <p className="text-[13px] text-slate-200 leading-relaxed mb-3">
                                {children}
                              </p>
                            ),
                            strong: ({ children }) => {
                              const textContent = String(children);
                              const isHeaderKeyword =
                                textContent.includes('STATUS') ||
                                textContent.includes('PROFILE') ||
                                textContent.includes('DIRECTIVE') ||
                                textContent.includes('RECOMMENDATION') ||
                                textContent.includes('TACTICAL') ||
                                textContent.includes('STRATEGIC') ||
                                textContent.includes('ACTION');

                              if (isHeaderKeyword) {
                                return (
                                  <strong className="inline-block font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 text-xs tracking-wider mr-1 my-0.5">
                                    {children}
                                  </strong>
                                );
                              }
                              return (
                                <strong className="font-bold text-white">
                                  {children}
                                </strong>
                              );
                            },
                            ul: ({ children }) => (
                              <ul className="space-y-2 mb-3 pl-1">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="space-y-2 mb-3 pl-1 list-decimal list-inside">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="text-[13px] text-slate-200 leading-relaxed flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                                <div className="flex-1">{children}</div>
                              </li>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-cyan-500 bg-cyan-950/30 px-4 py-2.5 rounded-r-xl my-3 italic text-cyan-100 text-xs font-mono">
                                {children}
                              </blockquote>
                            ),
                            code: ({ node, inline, className, children, ...props }: any) => {
                              const match = /language-(\w+)/.exec(className || '');
                              const codeString = String(children).replace(/\n$/, '');

                              if (!inline && (match || codeString.includes('\n'))) {
                                return (
                                  <CodeBlock
                                    language={match ? match[1] : undefined}
                                    value={codeString}
                                  />
                                );
                              }

                              return (
                                <code
                                  className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[12px] font-medium"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
                            table: ({ children }) => (
                              <div className="overflow-x-auto my-3 rounded-xl border border-cyan-500/30">
                                <table className="w-full text-xs text-left font-mono">
                                  {children}
                                </table>
                              </div>
                            ),
                            thead: ({ children }) => (
                              <thead className="bg-cyan-950/60 text-cyan-300 border-b border-cyan-500/30 uppercase text-[11px]">
                                {children}
                              </thead>
                            ),
                            th: ({ children }) => (
                              <th className="p-2.5 font-bold">{children}</th>
                            ),
                            td: ({ children }) => (
                              <td className="p-2.5 border-b border-white/5 text-gray-200">
                                {children}
                              </td>
                            ),
                          }}
                        >
                          {msg.text}
                        </Markdown>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 max-w-md animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="space-y-1">
              <div className="text-xs text-cyan-300 font-bold tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>COMPUTING DEFENSE AI BRIEFING...</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans">
                Synthesizing architectural directive and tactical recommendations...
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form with Futuristic Command Styling */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask AI Coach: e.g. How to benchmark CUDA stream memory latency?"
            disabled={isLoading}
            className="w-full bg-slate-900/90 border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 backdrop-blur-md font-sans shadow-lg transition-all"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={isLoading || !inputMessage.trim()}
          className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 disabled:opacity-40 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer shrink-0 font-mono"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-slate-950" />
              <span>Send Query</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};
