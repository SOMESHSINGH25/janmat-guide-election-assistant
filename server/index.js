import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

console.log("Starting Janmat Guide server...");

const PORT = process.env.PORT || 8080;
const distPath = path.join(process.cwd(), 'dist');

console.log("PORT:", PORT);
console.log("dist path:", distPath);

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini — non-fatal if key is missing (Cloud Run health check must pass)
let ai = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  console.log("Gemini AI initialized successfully.");
} else {
  console.warn("WARNING: GEMINI_API_KEY is not set. /api/chat will return a 503 error.");
}

// ── Guardrail keyword fallback ────────────────────────────────────────────────
const allowedKeywords = [
  'vote', 'voting', 'election', 'elections', 'register', 'registration', 'form 6',
  'evm', 'machine', 'vvpat', 'slip', 'nota', 'mcc', 'code of conduct', 'model code',
  'booth', 'polling', 'station', 'count', 'counting', 'result', 'results', 'first time',
  'document', 'documents', 'id', 'epic', 'aadhaar', 'pan', 'card', 'nvsp', 'voter'
];

// ── /api/chat ─────────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { message, language } = req.body;
  console.log(`\n--- /api/chat request received ---`);
  console.log(`Message length: ${message?.length || 0}, Language: ${language}`);

  if (!message) {
    console.log(`Guardrail: Blocked (Empty message)`);
    return res.status(400).json({ error: 'Message is required' });
  }

  // If Gemini is not configured, return a friendly error instead of crashing
  if (!ai) {
    console.error("Gemini AI not initialized — GEMINI_API_KEY missing.");
    return res.status(503).json({
      error: 'AI service is not configured. Please set GEMINI_API_KEY in Cloud Run environment variables.'
    });
  }

  const refusalMsgs = {
    en: "I'm Janmat Guide, and I can only help with election process and voter education topics. Please ask me something related to voting, elections, voter registration, EVM/VVPAT, or the election timeline.",
    hi: "मैं जनमत गाइड हूँ, और मैं केवल चुनाव प्रक्रिया और मतदाता शिक्षा विषयों पर मदद कर सकता हूँ। कृपया मुझसे मतदान, चुनाव, मतदाता पंजीकरण, EVM/VVPAT, या चुनाव समयरेखा से संबंधित कुछ पूछें।",
    hinglish: "Main Janmat Guide hoon, aur main sirf election process aur voter education topics par help kar sakta hoon. Please mujhse voting, elections, voter registration, EVM/VVPAT, ya election timeline se related kuch poochhein."
  };
  const langKey = language || 'en';
  const fallbackRefusal = refusalMsgs[langKey] || refusalMsgs['en'];

  let isAllowed = false;

  // Stage 1 — Semantic Gemini classifier
  try {
    console.log(`Classifier started...`);
    const classifierInstruction = `You are a strict text classification system. Your job is to determine if the user's message is related to Indian elections, the voting process, voter registration, voter rights, EVM/VVPAT, the Election Commission of India, polling booth processes, the Model Code of Conduct, candidate nomination, campaigning rules, vote counting, result declaration, government formation, or basic democratic education related to elections.
If the message is semantically related to ANY of these topics, respond with {"allowed": true, "reason": "<short reason>"}.
If the message is asking for something unrelated (e.g., cooking, programming, sports, predicting the winner, asking who to vote for, writing a campaign speech, doing homework), respond with {"allowed": false, "reason": "<short reason>"}.
You MUST return ONLY valid JSON and nothing else. No markdown formatting.`;

    const classificationResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: { systemInstruction: classifierInstruction, temperature: 0.1 }
    });

    let rawOutput = classificationResponse.text.trim();
    if (rawOutput.startsWith('```')) {
      rawOutput = rawOutput.replace(/^```(json)?/, '').replace(/```$/, '').trim();
    }

    const classificationResult = JSON.parse(rawOutput);
    isAllowed = classificationResult.allowed === true;
    console.log(`Classifier result: allowed ${isAllowed} (${classificationResult.reason})`);

  } catch (error) {
    console.error(`Classifier failed. Falling back to keyword check.`);
    console.error(error.message);
    const lowerInput = message.toLowerCase();
    isAllowed = allowedKeywords.some(keyword => lowerInput.includes(keyword));
    console.log(`Fallback keyword check: allowed ${isAllowed}`);
  }

  if (!isAllowed) {
    return res.json({ reply: fallbackRefusal });
  }

  // Stage 2 — Answer generation
  try {
    const systemInstruction = `You are Janmat Guide, a neutral Indian election process education assistant.
You only answer questions about Indian election process, voter education,
voter registration, EVM, VVPAT, polling booth, Model Code of Conduct,
candidate nomination, vote counting, result declaration, and basic civic education.
Refuse unrelated questions politely.
Do not support or oppose any political party, candidate, ideology, or campaign.
Keep answers beginner-friendly and factual.
Please reply in the following language code: ${language || 'en'}.
If the language code is 'hi', reply in Hindi. If 'hinglish', reply in Hinglish (Hindi written in English alphabet). If 'en', reply in English.`;

    console.log(`Answer generation started...`);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: { systemInstruction, temperature: 0.2 }
    });

    console.log(`Answer returned successfully.`);
    res.json({ reply: response.text });

  } catch (error) {
    console.error("\n--- Gemini API Error ---");
    console.error(error.message || error);
    console.error("------------------------\n");
    res.status(500).json({ error: 'Failed to fetch response from Gemini API. Please try again later.' });
  }
});

// ── Static frontend (must be BEFORE the SPA fallback) ────────────────────────
app.use(express.static(distPath));

// ── SPA fallback — regex form avoids path-to-regexp crash in Express 5 ────────
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ── Start server bound to 0.0.0.0 so Cloud Run can reach it ─────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Janmat Guide running on port ${PORT}`);
});
