/**
 * /api/ai/grammar - Serverless Grammar correction endpoint
 */

import { validateRequest, streamGroq } from "./_groq.js";
import { GRAMMAR_SYSTEM_PROMPT } from "./_prompts.js";

export default async function handler(req, res) {
  const validation = await validateRequest(req, res);
  if (!validation) return;

  const { body, apiKey } = validation;
  const { text } = body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Missing required 'text' parameter." });
  }

  const messages = [
    { role: "system", content: GRAMMAR_SYSTEM_PROMPT },
    { role: "user", content: text }
  ];

  // Set temperature to 0.1 for maximum precision and strict correction focus
  await streamGroq(apiKey, messages, 0.1, res);
}
