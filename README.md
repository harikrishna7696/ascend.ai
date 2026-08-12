# AETHER — AI Career Intelligence Command Center

AETHER is a high-stakes AI-powered career intelligence and transition platform designed to guide engineers through structured 180-day career shifts into specialized domains such as **Defense AI**, **Computer Vision**, **Autonomous Systems**, **Low-Latency CUDA/C++**, **ROS2 Payload Engineering**, and **SLAM**.

---

## 🚀 Purpose & Core Capabilities

AETHER acts as an end-to-end tactical command center for candidates undergoing technical career transitions:

- **180-Day Structured Roadmap Generation**: Automatically builds an actionable, day-by-day protocol divided into 6 strategic monthly phases (Fundamentals, Core Engineering, Advanced Systems, High-Impact Projects, Interview Readiness, and Target Offer Acquisition).
- **Resume Parsing & Skill Gap Analysis**: Upload a resume (PDF/TXT) to instantly extract core skills, quantify domain alignment, and identify skill vectors against real-time job market demand.
- **Job Market Intelligence Analyzer**: Analyzes live or local job postings to extract high-frequency technical keywords (CUDA, TensorRT, ROS2, ByteTrack, PyTorch, C++20).
- **Daily Execution Protocol**: Complete daily micro-tasks, track estimated study hours, measure real-time readiness index (%), and log streak progression.
- **Portfolio & Content Calendar Manager**: Plan and publish technical engineering video breakdowns (e.g., *ROS2 Zero-Copy Stream Benchmarks*) to establish technical authority for target recruiters.
- **Multi-Model AI Engine Integration**: Supports configurable open-source LLMs (Llama 3.3 70B, DeepSeek R1, Qwen 2.5 Coder, Mistral Large 2), local Ollama/vLLM servers, Google Gemini 3.6 Flash, and a zero-latency offline fallback engine.
- **AI Career Intelligence Coach**: Interactive AI coach for real-time guidance on technical problems (CUDA streams, ROS2 QoS, SLAM profiling) and career strategy.
- **SQLite Database Persistence & Versioning**: Built-in local SQLite database via `sql.js` with full versioning support for plan updates, resets, and state restoration.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Particle Physics
- **Backend**: Express.js server, Node.js, `sql.js` (SQLite in-memory/file storage)
- **AI Engine**: `@google/genai` SDK + Universal OpenAI-compatible Fetch Proxy (`yaml` configuration registry)

---

## 📋 Local Setup Instructions

Follow these steps to run AETHER locally on your machine.

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- *(Optional)* **Ollama**: If running open-source models locally (e.g. `llama3` or `qwen2.5-coder`).

---

### Step 1: Clone & Navigate to Project

```bash
git clone <your-repository-url>
cd aether-career-intelligence
```

---

### Step 2: Install Dependencies

Install all node dependencies declared in `package.json`:

```bash
npm install
```

---

### Step 3: Configure Environment Variables

1. Copy `.env.example` to create `.env`:

```bash
cp .env.example .env
```

2. Open `.env` and configure your API keys (optional depending on your model choice):

```env
# Optional API Keys
GEMINI_API_KEY="your-gemini-api-key"
TOGETHER_API_KEY="your-together-ai-api-key"
DEEPSEEK_API_KEY="your-deepseek-api-key"
MISTRAL_API_KEY="your-mistral-api-key"

# Local Ollama URL (Default: http://localhost:11434/v1)
LOCAL_OLLAMA_URL="http://localhost:11434/v1"
```

> **Note**: Even without API keys, AETHER includes an offline WebAssembly fallback engine to ensure all features work out-of-the-box.

---

### Step 4: Open-Source AI Model Registry (`models.yaml`)

AETHER allows configuring and switching between open-source models directly via `models.yaml` in the project root:

```yaml
active_model: "llama-3.3-70b"

default_temperature: 0.7
max_tokens: 4096

models:
  - id: "llama-3.3-70b"
    name: "Llama 3.3 70B Instruct"
    provider: "Meta (Open-Source)"
    type: "opensource"
    description: "Meta's flagship open-source 70B parameter model."
    baseUrl: "https://api.together.xyz/v1"
    endpointType: "openai_compatible"
    apiKeyEnvVar: "TOGETHER_API_KEY"
    modelName: "meta-llama/Llama-3.3-70B-Instruct-Turbo"

  - id: "deepseek-r1"
    name: "DeepSeek R1 Reasoning"
    provider: "DeepSeek (Open-Source)"
    type: "opensource"
    description: "Open-weights reasoning model with chain-of-thought capability."
    baseUrl: "https://api.deepseek.com/v1"
    endpointType: "openai_compatible"
    apiKeyEnvVar: "DEEPSEEK_API_KEY"
    modelName: "deepseek-reasoner"

  - id: "ollama-local-llama3"
    name: "Ollama Local (Llama 3)"
    provider: "Local Machine / vLLM"
    type: "local_ollama"
    description: "Self-hosted local open-source server at localhost:11434."
    baseUrl: "http://localhost:11434/v1"
    endpointType: "openai_compatible"
    apiKeyEnvVar: "LOCAL_OLLAMA_KEY"
    modelName: "llama3:latest"
```

You can switch models:
1. **Via the UI**: Click the model selector dropdown in the top header bar.
2. **Via Settings**: Edit the live `models.yaml` directly in the Command Center Settings tab.

---

### Step 5: Start Local Development Server

Run the unified dev server (Express + Vite on Port 3000):

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

### Step 6: Building for Production

To create a production build and test the standalone server:

```bash
# Build Vite client & compile Express server
npm run build

# Launch standalone node server
npm run start
```

---

## 🛠️ Running Local Open-Source Models via Ollama

To run fully local AI models on your machine without external API calls:

1. Install [Ollama](https://ollama.com/).
2. Pull your desired model:
   ```bash
   ollama pull llama3:latest
   ```
3. Ensure Ollama is running (`ollama serve`).
4. In AETHER's header dropdown or Settings, select **Ollama Local (Llama 3)**.

---

## 📜 License

Distributed under the MIT License.
