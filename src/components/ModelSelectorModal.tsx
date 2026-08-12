import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ModelDef } from '../types';
import { Cpu, Check, Zap, Server, Shield, Sparkles, Terminal, X, Code, ExternalLink } from 'lucide-react';

interface ModelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  models: ModelDef[];
  activeModelId: string;
  onSelectModel: (modelId: string) => void;
  onOpenYamlSettings?: () => void;
}

export const ModelSelectorModal: React.FC<ModelSelectorModalProps> = ({
  isOpen,
  onClose,
  models,
  activeModelId,
  onSelectModel,
  onOpenYamlSettings,
}) => {
  if (!isOpen) return null;

  const activeModel = models.find((m) => m.id === activeModelId) || models[0];

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'opensource':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'local_ollama':
        return <Server className="w-4 h-4 text-cyan-400" />;
      case 'proprietary':
        return <Sparkles className="w-4 h-4 text-blue-400" />;
      case 'offline':
        return <Shield className="w-4 h-4 text-emerald-400" />;
      default:
        return <Cpu className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'opensource':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold uppercase tracking-wider">
            Open-Source
          </span>
        );
      case 'local_ollama':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
            Local / Ollama
          </span>
        );
      case 'proprietary':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30 font-semibold uppercase tracking-wider">
            Proprietary
          </span>
        );
      case 'offline':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold uppercase tracking-wider">
            Offline Wasm
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-sans flex items-center gap-2">
                Select Active Intelligence Model
                <span className="text-xs font-mono font-normal text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  models.yaml
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Switch between Open-Source models (Llama 3, DeepSeek, Qwen), Local Ollama, and Google Gemini.
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Model List */}
        <div className="p-6 overflow-y-auto space-y-3 custom-scrollbar flex-1">
          {models.map((m) => {
            const isSelected = m.id === activeModelId;
            return (
              <motion.div
                key={m.id}
                whileHover={{ scale: 1.015, x: 2 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  onSelectModel(m.id);
                  onClose();
                }}
                className={`group relative p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/20 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <div className="mt-0.5 shrink-0">{getProviderIcon(m.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                        {m.name}
                      </span>
                      {getTypeBadge(m.type)}
                      <span className="text-[11px] font-mono text-gray-400">({m.provider})</span>
                    </div>

                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed mb-2.5">{m.description}</p>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-gray-400 flex-wrap">
                    <span className="bg-black/40 px-2 py-0.5 rounded border border-white/5">
                      Model: <span className="text-gray-200">{m.modelName}</span>
                    </span>
                    <span className="bg-black/40 px-2 py-0.5 rounded border border-white/5">
                      Type: <span className="text-gray-200">{m.endpointType}</span>
                    </span>
                    {m.apiKeyEnvVar && (
                      <span className="bg-black/40 px-2 py-0.5 rounded border border-white/5">
                        Key Env: <span className="text-amber-300">{m.apiKeyEnvVar}</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-cyan-400" />
            <span>Configured via root <strong className="text-white">models.yaml</strong> file</span>
          </div>

          {onOpenYamlSettings && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onClose();
                onOpenYamlSettings();
              }}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-mono font-semibold transition-colors cursor-pointer"
            >
              <span>Edit YAML Config</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};
