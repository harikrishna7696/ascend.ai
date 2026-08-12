import React, { useState } from 'react';
import { Bot, Send, Sparkles, Loader2, User } from 'lucide-react';
import { ChatMessage } from '../../types';

interface AICoachViewProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const AICoachView: React.FC<AICoachViewProps> = ({
  chatHistory,
  onSendMessage,
  isLoading,
}) => {
  const [inputMessage, setInputMessage] = useState('');

  const suggestedPrompts = [
    'How should I position CUDA on my resume?',
    'What are the most common interview questions for Defense AI?',
    'I feel stuck on ROS2 publishers, explain simply.',
    'How do I pitch my transition from General CV to Defense AI?',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    onSendMessage(inputMessage.trim());
    setInputMessage('');
  };

  return (
    <div className="space-y-6 font-mono max-w-4xl mx-auto">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden flex items-center justify-between">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <Bot className="w-4 h-4" /> AI CAREER TRANSITION COACH
          </div>
          <h2 className="text-2xl font-light tracking-tight uppercase text-white mb-1">
            INTELLIGENCE <span className="font-bold text-cyan-400">COMMAND ASSISTANT</span>
          </h2>
          <p className="text-xs text-gray-400">
            Ask technical, career positioning, or portfolio strategy questions anytime.
          </p>
        </div>
        <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse relative z-10"></span>
      </div>

      {/* Suggested Chips */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
          Suggested Prompts:
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSendMessage(p)}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300 text-xs transition-all text-left backdrop-blur-sm"
            >
              "{p}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md h-96 overflow-y-auto space-y-4">
        {chatHistory.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-xs">
            <Bot className="w-8 h-8 text-cyan-400/50 mx-auto mb-2 animate-pulse" />
            <p>Your AI Career Coach is online. Ask anything about your transition roadmap!</p>
          </div>
        ) : (
          chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 text-xs ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-lg font-sans leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500/10 text-cyan-200 border border-cyan-500/30 font-mono text-xs'
                    : 'bg-white/5 text-gray-200 border border-white/10 backdrop-blur-sm'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 text-gray-300 flex items-center justify-center shrink-0 font-mono">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 animate-pulse font-mono">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>AI Coach is analyzing career vector...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask AI Coach for advice..."
          disabled={isLoading}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 backdrop-blur-md"
        />
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="px-5 py-3 rounded-xl text-xs font-bold uppercase text-black bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
