/**
 * /api/ai/optimize - Serverless AI Optimizer endpoint
 */

import { validateRequest, streamGroq } from "./_groq.js";
import { OPTIMIZATION_SYSTEM_PROMPT, STYLE_PRESETS } from "./_prompts.js";

export default async function handler(req, res) {
  const validation = await validateRequest(req, res);
  if (!validation) return;

  const { body, apiKey } = validation;
  const { text, style, customInstructions } = body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Missing required 'text' parameter." });
  }

  const selectedStyle = style || "Simpler";
  const styleDescription = STYLE_PRESETS[selectedStyle] || STYLE_PRESETS.Simpler;
  
  let systemPrompt = OPTIMIZATION_SYSTEM_PROMPT.replace(
    "{stylePresetDescription}",
    `Style Preset: ${selectedStyle}\nGuideline: ${styleDescription}`
  );

  if (customInstructions && customInstructions.trim()) {
    systemPrompt += `\n\nCRITICAL USER DIRECTION:\nApply these custom rules: "${customInstructions.trim()}"\nIncorporate this seamlessly while staying true to the preset and core message.`;
  }

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: text }
  ];

  // Set temperature to 0.5 for a high-quality balance of creative wording and original intent preservation
  await streamGroq(apiKey, messages, 0.5, res);
}
