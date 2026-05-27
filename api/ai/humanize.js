/**
 * /api/ai/humanize - Serverless Humanize text endpoint
 */

import { validateRequest, streamGroq } from "./_groq.js";
import { HUMANIZE_SYSTEM_PROMPT } from "./_prompts.js";

export default async function handler(req, res) {
  const validation = await validateRequest(req, res);
  if (!validation) return;

  const { body, apiKey } = validation;
  const { text } = body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Missing required 'text' parameter." });
  }

  const messages = [
    { role: "system", content: HUMANIZE_SYSTEM_PROMPT },
    { role: "user", content: text }
  ];

  // Set temperature to 0.7 for high conversational variability and natural flow
  await streamGroq(apiKey, messages, 0.7, res);
}
