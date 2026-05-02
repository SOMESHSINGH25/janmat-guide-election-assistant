# Janmat Guide 🗳️

An interactive, AI-powered web application that helps Indian citizens understand the election process, their voting rights, and how democracy works — in English, Hindi, and Hinglish.

---

## 🔐 Security

API keys are stored in environment variables and not committed to the repository.

- The `GEMINI_API_KEY` is read **only** by the Express backend (`server/index.js`).
- It is **never** exposed to the React frontend or shipped inside the browser bundle.
- The `.env` file is git-ignored. Copy `.env.example` to `.env` and fill in your key.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Gemini AI Chatbot** | Answers election & voter education questions via Gemini API. Semantic guardrail blocks off-topic queries. |
| 📅 **Interactive Timeline** | 10-step, India-specific election journey with expandable detail cards. |
| 🧠 **Civic Quiz** | 20-question bank; each attempt randomly selects 5, shuffles options, and shows explanations. |
| 🌐 **Multi-Language** | Full English / Hindi / Hinglish support across every section. |
| 📱 **Responsive Design** | Mobile-first layout with glassmorphism cards and micro-animations. |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Vanilla CSS
- **Backend**: Node.js, Express (secure Gemini proxy)
- **AI**: Google Gemini API (`@google/genai`)
- **Deployment**: Docker, Google Cloud Run

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
Server starts at **http://localhost:3000**

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
| `"Write Python code"` | Guardrail blocks — returns polite refusal |
| `"Which party should I vote for?"` | Guardrail blocks — neutral refusal |

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
Set the `GEMINI_API_KEY` environment variable in your Cloud Run service settings. The app reads it automatically — **no key is baked into the image**.

---

## 📁 Project Structure

```
janmat-guide-election-assistant/
├── server/
│   └── index.js          # Express API server (Gemini proxy + guardrails)
├── src/
│   ├── components/       # React UI components
│   ├── contexts/         # LanguageContext
│   └── data/             # Timeline, quiz, chatbot data
├── .env.example          # Environment variable template
├── Dockerfile            # Multi-stage build for Cloud Run
├── vite.config.js        # Vite + API proxy config
└── package.json
```

---

## 📄 License

MIT — free to use for civic education purposes.
