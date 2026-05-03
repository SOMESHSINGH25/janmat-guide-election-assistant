# Janmat Guide 🗳️

> 🚀 Built for **PromptWars Virtual Hackathon** using Google Cloud & Gemini AI

An interactive, AI-powered web application that helps Indian citizens understand the election process, their voting rights, and how democracy works — in English, Hindi, and Hinglish.

---

## 🎯 Chosen Vertical

**Civic Education / Election Process Education**

Janmat Guide addresses the gap in accessible, multilingual, and AI-assisted voter awareness. Many first-time voters and rural citizens struggle to understand how Indian elections work — this app simplifies that journey in a beginner-friendly, politically neutral way.

---

## 🧠 Approach & Logic

Janmat Guide uses a **two-stage AI pipeline** powered by Gemini to ensure both safety and quality:

### Stage 1 — Semantic Classifier (Gemini)
Before generating any answer, every user query is first sent to a Gemini-powered classifier with a strict instruction to judge whether the question is genuinely related to Indian elections, voting, voter registration, EVM/VVPAT, the Election Commission, or civic education.

- Returns `{ "allowed": true/false, "reason": "..." }` as structured JSON
- Strips markdown code fences from the response before parsing
- Falls back to keyword matching if the classifier response cannot be parsed

### Stage 2 — Answer Generator (Gemini)
If and only if the classifier approves the query, a second Gemini call generates the actual answer using a strict system instruction:

- Neutral, non-partisan, factual, beginner-friendly
- Responds in the user's selected language (English / Hindi / Hinglish)
- Refuses to predict election outcomes or recommend parties

### Guardrails & Safety
- Off-topic queries (cooking, coding, sports, etc.) are **rejected before touching the generator**
- Political bias, campaign support, and winner predictions are explicitly blocked
- API key is never exposed to the frontend — all Gemini calls happen server-side
- Fallback mock responses exist for network/API failures

---

## ⚙️ How the Solution Works

```
User types a question
      ↓
React frontend (Chatbot.jsx)
      ↓
POST /api/chat  { message, language }
      ↓
Express backend (server/index.js)
      ↓
┌─────────────────────────────────┐
│  Stage 1: Gemini Classifier     │
│  → Is this election-related?    │
│  → Returns { allowed: true/false }│
└─────────────────────────────────┘
      ↓ allowed: false → return polite refusal
      ↓ allowed: true
┌─────────────────────────────────┐
│  Stage 2: Gemini Answer Gen     │
│  → System instruction applied   │
│  → Language-aware response      │
└─────────────────────────────────┘
      ↓
JSON { reply: "..." }
      ↓
Displayed in chat UI
```

---

## 📌 Assumptions

- **Scope**: The assistant focuses exclusively on Indian election process education — not global elections or general political science.
- **No political bias**: The assistant does not predict outcomes, endorse parties, candidates, or ideologies.
- **Not a legal authority**: Information is educational and beginner-friendly. Users should verify critical details with official sources such as the [Election Commission of India](https://eci.gov.in) or [NVSP](https://www.nvsp.in).
- **Demo authentication**: User accounts are stored in `localStorage` for demonstration purposes. A production deployment would require a proper backend database and hashed passwords.
- **Language support**: Hinglish responses are best-effort — Gemini produces transliterated Hindi which may vary in quality.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Gemini AI Chatbot** | Two-stage pipeline: semantic classifier + neutral answer generator. Blocks off-topic queries. |
| 📅 **Interactive Timeline** | 10-step, India-specific election journey with expandable detail cards in 3 languages. |
| 🧠 **Civic Quiz** | 20-question bank; each attempt randomly selects 5, shuffles options, and shows explanations. |
| 🌐 **Multi-Language** | Full English / Hindi / Hinglish support across every UI section via React Context. |
| 📱 **Responsive Design** | Mobile-first glassmorphism layout with micro-animations. |
| 🔐 **Auth Flow** | Demo login/signup with localStorage, email validation, duplicate prevention, and session persistence. |

---

## ☁️ Google Services Used

| Service | Purpose |
|---|---|
| **Gemini API** (`gemini-2.5-flash`) | Powers the semantic classifier and answer generator |
| **Google Cloud Run** | Hosts the containerised Express + React app; auto-scales to zero |
| **Google Cloud Build** | Builds the Docker image from source during `gcloud run deploy --source` |

---

## 🏆 Evaluation Alignment

| Criterion | How Janmat Guide addresses it |
|---|---|
| **Code Quality** | Modular React components, centralized context (Auth, Language), separated data files, consistent CSS variables |
| **Security** | API key in Cloud Run env vars only; never in frontend bundle; `.env` git-ignored; semantic guardrails prevent misuse |
| **Efficiency** | Classifier uses low-temperature Gemini call first; generator only called on pass; Vite production bundle ~248 KB |
| **Testing** | Manual test table for chatbot guardrails; `npm run build` validates full production build; endpoint tested with `curl`/`fetch` |
| **Accessibility** | Semantic HTML (`<section>`, `<nav>`, `<form>`), `role="alert"` on errors, `aria` labels, keyboard-navigable quiz |
| **Google Services** | Gemini API (two-stage), Cloud Run (production hosting), Cloud Build (CI/CD image build) |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Vanilla CSS
- **Backend**: Node.js, Express (secure Gemini proxy)
- **AI**: Google Gemini API (`@google/genai`)
- **Deployment**: Docker (multi-stage), Google Cloud Run

---

## 🔐 Security

API keys are stored in environment variables and not committed to the repository.

- The `GEMINI_API_KEY` is read **only** by the Express backend (`server/index.js`).
- It is **never** exposed to the React frontend or shipped inside the browser bundle.
- The `.env` file is git-ignored. Copy `.env.example` to `.env` and fill in your key.

---

## 🚀 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/janmat-guide-election-assistant.git
cd janmat-guide-election-assistant
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Open `.env` and replace `your_api_key_here` with your actual [Google Gemini API key](https://aistudio.google.com/app/apikey).

### 4. Run the backend (Terminal 1)
```bash
npm run server
```
Server starts at **http://localhost:3000** (local dev) / port **8080** (production / Cloud Run)

### 5. Run the frontend (Terminal 2)
```bash
npm run dev
```
App opens at **http://localhost:5173** — Vite proxies `/api` requests to the backend automatically.

---

## 💬 Testing the Chatbot

| Query | Expected Behaviour |
|---|---|
| `"What is an EVM?"` | Gemini answers with a factual explanation |
| `"How do I register to vote?"` | Gemini walks through Form 6 / NVSP process |
| `"Who makes sure elections are fair?"` | Gemini explains Election Commission of India |
| `"What happens after people cast their vote?"` | Classifier passes (semantic match), answer generated |
| `"Write Python code"` | Classifier blocks — returns polite refusal |
| `"Which party should I vote for?"` | Classifier blocks — neutral refusal |
| `"Tell me a biryani recipe"` | Classifier blocks — off-topic refusal |

---

## 🐳 Docker & Cloud Run

### Build the image
```bash
docker build -t janmat-guide .
```

### Run locally with Docker
```bash
docker run -p 8080:8080 -e GEMINI_API_KEY=your_key janmat-guide
```
Visit **http://localhost:8080**

### Deploy to Cloud Run
```bash
gcloud run deploy janmat-guide \
  --source . \
  --region asia-south1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "GEMINI_API_KEY=your_key"
```
Set the `GEMINI_API_KEY` environment variable in Cloud Run — **no key is baked into the image**.

---

## 📁 Project Structure

```
janmat-guide-election-assistant/
├── server/
│   └── index.js          # Express API — Gemini proxy, classifier, guardrails, static serving
├── src/
│   ├── components/       # React UI components (Auth, Chatbot, Header, Hero, Quiz, Timeline)
│   ├── contexts/         # AuthContext, LanguageContext
│   └── data/             # Timeline, quiz, chatbot, translations data
├── .env.example          # Environment variable template (safe to commit)
├── Dockerfile            # Multi-stage build: Vite → Express on port 8080
├── vite.config.js        # Vite dev server + /api proxy to Express
└── package.json
```

---

## 📄 License

MIT — free to use for civic education purposes.
