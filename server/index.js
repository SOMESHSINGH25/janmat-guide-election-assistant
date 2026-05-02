import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY in .env file");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Guardrail Keywords (Fallback)
const allowedKeywords = [
  'vote', 'voting', 'election', 'elections', 'register', 'registration', 'form 6', 
  'evm', 'machine', 'vvpat', 'slip', 'nota', 'mcc', 'code of conduct', 'model code', 
  'booth', 'polling', 'station', 'count', 'counting', 'result', 'results', 'first time', 
  'document', 'documents', 'id', 'epic', 'aadhaar', 'pan', 'card', 'nvsp', 'voter'
];

app.post('/api/chat', async (req, res) => {
  const { message, language } = req.body;
  console.log(`\n--- /api/chat request received ---`);
  console.log(`Message length: ${message?.length || 0}, Language: ${language}`);

  if (!message) {
    console.log(`Guardrail: Blocked (Empty message)`);
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!ai) {
    console.error(`Gemini Error: GoogleGenAI instance is undefined.`);
    return res.status(500).json({ error: 'Gemini API is not configured on the server.' });
  }

  const refusalMsgs = {
    en: "I’m Janmat Guide, and I can only help with election process and voter education topics. Please ask me something related to voting, elections, voter registration, EVM/VVPAT, or the election timeline.",
    hi: "मैं जनमत गाइड हूँ, और मैं केवल चुनाव प्रक्रिया और मतदाता शिक्षा विषयों पर मदद कर सकता हूँ। कृपया मुझसे मतदान, चुनाव, मतदाता पंजीकरण, EVM/VVPAT, या चुनाव समयरेखा से संबंधित कुछ पूछें।",
    hinglish: "Main Janmat Guide hoon, aur main sirf election process aur voter education topics par help kar sakta hoon. Please mujhse voting, elections, voter registration, EVM/VVPAT, ya election timeline se related kuch poochhein."
  };
  const langKey = language || 'en';
  const fallbackRefusal = refusalMsgs[langKey] || refusalMsgs['en'];

  let isAllowed = false;

  // 1. Semantic Gemini-based classifier
  try {
    console.log(`Classifier started...`);
    const classifierInstruction = `You are a strict text classification system. Your job is to determine if the user's message is related to Indian elections, the voting process, voter registration, voter rights, EVM/VVPAT, the Election Commission of India, polling booth processes, the Model Code of Conduct, candidate nomination, campaigning rules, vote counting, result declaration, government formation, or basic democratic education related to elections.
If the message is semantically related to ANY of these topics, respond with {"allowed": true, "reason": "<short reason>"}.
If the message is asking for something unrelated (e.g., cooking, programming, sports, predicting the winner, asking who to vote for, writing a campaign speech, doing homework), respond with {"allowed": false, "reason": "<short reason>"}.
You MUST return ONLY valid JSON and nothing else. No markdown formatting.`;

    const classificationResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: classifierInstruction,
        temperature: 0.1,
      }
    });

    let rawOutput = classificationResponse.text.trim();
    
    // Strip markdown code fences if present
    if (rawOutput.startsWith('```')) {
      rawOutput = rawOutput.replace(/^```(json)?/, '').replace(/```$/, '').trim();
    }

    const classificationResult = JSON.parse(rawOutput);
    isAllowed = classificationResult.allowed === true;
    console.log(`Classifier result: allowed ${isAllowed} (${classificationResult.reason})`);

  } catch (error) {
    console.error(`Classifier parsing failed. Falling back to keyword check.`);
    console.error(error.message);
    
    // 6. Keyword pre-check as fallback
    const lowerInput = message.toLowerCase();
    isAllowed = allowedKeywords.some(keyword => lowerInput.includes(keyword));
    console.log(`Fallback keyword check: allowed ${isAllowed}`);
  }

  // 4. Return refusal if not allowed
  if (!isAllowed) {
    return res.json({ reply: fallbackRefusal });
  }

  // 5. Generate actual answer
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
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // Keep it factual and conservative
      }
    });

    console.log(`Answer returned successfully.`);
    const replyText = response.text;
    res.json({ reply: replyText });

  } catch (error) {
    console.error("\n--- Gemini API Error Details ---");
    console.error(error.message || error);
    console.error("--------------------------------\n");
    res.status(500).json({ error: 'Failed to fetch response from Gemini API. Our servers are currently experiencing issues.' });
  }
});

app.listen(port, () => {
  console.log(`Backend started on port ${port}`);
});
