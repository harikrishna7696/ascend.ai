import React, { useState, useEffect } from 'react';
import { ModelDef, ModelConfig } from '../../types';
import { Cpu, Zap, Server, Shield, Sparkles, Check, Play, RefreshCw, Save, Code, AlertTriangle, FileCode, ExternalLink } from 'lucide-react';

interface YamlModelConfigEditorProps {
  onModelChanged?: (model: ModelDef) => void;
}

export const YamlModelConfigEditor: React.FC<YamlModelConfigEditorProps> = ({ onModelChanged }) => {
  const [modelConfig, setModelConfig] = useState<ModelConfig | null>(null);
  const [yamlText, setYamlText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [savingYaml, setSavingYaml] = useState<boolean>(false);
  const [testingModel, setTestingModel] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchModelsAndYaml();
  }, []);

  const fetchModelsAndYaml = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const [modelsRes, yamlRes] = await Promise.all([
        fetch('/api/models'),
        fetch('/api/models/yaml'),
      ]);

      const modelsData = await modelsRes.json();
      const yamlData = await yamlRes.json();

      if (modelsData.success) {
        setModelConfig({
          active_model: modelsData.activeModelId,
          default_temperature: modelsData.defaultTemperature || 0.7,
          max_tokens: modelsData.maxTokens || 4096,
          models: modelsData.models || [],
        });
        if (onModelChanged && modelsData.activeModel) {
          onModelChanged(modelsData.activeModel);
        }
      }

      if (yamlData.success) {
        setYamlText(yamlData.yamlContent || '');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load models.yaml configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectModel = async (modelId: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const res = await fetch('/api/models/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`Active intelligence model updated to: ${data.activeModel.name}`);
        setModelConfig((prev) => (prev ? { ...prev, active_model: modelId } : null));
        if (onModelChanged && data.activeModel) {
          onModelChanged(data.activeModel);
        }
        // Refresh YAML text to match updated active_model
        const yamlRes = await fetch('/api/models/yaml');
        const yamlData = await yamlRes.json();
        if (yamlData.success) {
          setYamlText(yamlData.yamlContent);
        }
      } else {
        setErrorMessage(data.error || 'Failed to switch active model');
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleSaveYaml = async () => {
    setSavingYaml(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const res = await fetch('/api/models/yaml', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ yamlContent: yamlText }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage('models.yaml saved and reloaded successfully!');
        setModelConfig({
          active_model: data.activeModelId,
          default_temperature: 0.7,
          max_tokens: 4096,
          models: data.models,
        });
        if (onModelChanged && data.activeModel) {
          onModelChanged(data.activeModel);
        }
      } else {
        setErrorMessage(data.error || 'Failed to save YAML configuration');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'YAML syntax error or network failure');
    } finally {
      setSavingYaml(false);
    }
  };

  const handleTestConnection = async () => {
    setTestingModel(true);
    setTestResult(null);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/models/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId: modelConfig?.active_model }),
      });
      const data = await res.json();
      if (data.success) {
        setTestResult({
          success: true,
          latencyMs: data.latencyMs,
          message: `Verified connection to ${data.modelName}! Response: ${data.reply}`,
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || 'Model test failed',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Model test connection error',
      });
    } finally {
      setTestingModel(false);
    }
  };

  const activeModelObj = modelConfig?.models.find((m) => m.id === modelConfig.active_model) || modelConfig?.models[0];

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 tracking-wider uppercase mb-1">
            <Zap className="w-4 h-4 text-amber-400" /> OPEN-SOURCE AI MODEL REGISTRY & YAML CONFIG
          </div>
          <h3 className="text-lg font-bold text-white font-sans">
            Configured Models (<span className="text-cyan-400">{modelConfig?.models.length || 0} Models</span>)
          </h3>
          <p className="text-xs text-gray-400 font-sans">
            Configure open-source LLMs (Llama 3.3, DeepSeek R1, Qwen 2.5, Mistral), local Ollama servers, or Gemini in <code className="text-cyan-300">models.yaml</code>.
          </p>
        </div>

        {modelConfig && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-400">Active Model:</span>
            <select
              value={modelConfig.active_model}
              onChange={(e) => handleSelectModel(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-gray-900 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {modelConfig.models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.provider})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-gray-400 hover:text-white">×</button>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-gray-400 hover:text-white">×</button>
        </div>
      )}

      {/* Active Model Status & Test Button */}
      {activeModelObj && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-gray-900 via-cyan-950/20 to-gray-900 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Current Execution Model</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase font-semibold">
                {activeModelObj.type}
              </span>
            </div>
            <h4 className="text-base font-bold text-white font-sans">{activeModelObj.name}</h4>
            <p className="text-xs text-gray-400">{activeModelObj.description}</p>
          </div>

          <button
            onClick={handleTestConnection}
            disabled={testingModel}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-cyan-300 bg-cyan-950 border border-cyan-500/50 hover:bg-cyan-900 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {testingModel ? <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" /> : <Play className="w-4 h-4 text-cyan-400" />}
            <span>{testingModel ? 'Testing API...' : 'Test Connection'}</span>
          </button>
        </div>
      )}

      {/* Test Result Display */}
      {testResult && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono space-y-1 ${
            testResult.success
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
          }`}
        >
          <div className="flex items-center justify-between font-bold">
            <span>{testResult.success ? '✓ CONNECTION VERIFIED' : '⚠ MODEL NOTICE / FALLBACK'}</span>
            {testResult.latencyMs && <span>Latency: {testResult.latencyMs}ms</span>}
          </div>
          <p className="text-[11px] leading-relaxed text-gray-300">{testResult.message}</p>
        </div>
      )}

      {/* YAML Editor Block */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
            <FileCode className="w-4 h-4 text-cyan-400" />
            LIVE YAML CONFIGURATION EDITOR (<span className="text-cyan-400">models.yaml</span>)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchModelsAndYaml}
              className="px-2.5 py-1 rounded-lg text-xs font-mono text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reload File
            </button>
            <button
              onClick={handleSaveYaml}
              disabled={savingYaml}
              className="px-3 py-1 rounded-lg text-xs font-mono font-bold text-cyan-300 bg-cyan-950 border border-cyan-500/50 hover:bg-cyan-900 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5 text-cyan-400" />
              <span>{savingYaml ? 'Saving...' : 'Save YAML Config'}</span>
            </button>
          </div>
        </div>

        <div className="relative rounded-xl border border-white/15 bg-black/80 overflow-hidden">
          <textarea
            value={yamlText}
            onChange={(e) => setYamlText(e.target.value)}
            rows={16}
            spellCheck={false}
            className="w-full p-4 font-mono text-xs text-green-400 bg-transparent focus:outline-none leading-relaxed resize-y custom-scrollbar"
          />
        </div>
      </div>

      {/* Open-Source Quick Setup Guide */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs space-y-2 font-sans">
        <h4 className="font-bold text-white font-mono flex items-center gap-1.5">
          <Code className="w-4 h-4 text-cyan-400" />
          How to connect custom Open-Source models:
        </h4>
        <ul className="space-y-1 text-gray-400 list-disc list-inside font-mono text-[11px]">
          <li>
            <strong className="text-gray-200">Local Ollama / vLLM:</strong> Set <code className="text-cyan-300">baseUrl: "http://localhost:11434/v1"</code> and <code className="text-cyan-300">endpointType: "openai_compatible"</code>.
          </li>
          <li>
            <strong className="text-gray-200">Together AI:</strong> Set <code className="text-cyan-300">baseUrl: "https://api.together.xyz/v1"</code> and set <code className="text-amber-300">TOGETHER_API_KEY</code> in secrets.
          </li>
          <li>
            <strong className="text-gray-200">DeepSeek API:</strong> Set <code className="text-cyan-300">baseUrl: "https://api.deepseek.com/v1"</code> and set <code className="text-amber-300">DEEPSEEK_API_KEY</code> in secrets.
          </li>
          <li>
            <strong className="text-gray-200">HuggingFace / OpenRouter:</strong> Add any OpenAI-compatible API base URL to <code className="text-cyan-300">models.yaml</code> above.
          </li>
        </ul>
      </div>
    </div>
  );
};
