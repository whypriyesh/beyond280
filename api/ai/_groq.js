/**
 * Secure Groq API Connection Handler for Vercel Serverless
 */

export const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
export const DEFAULT_MODEL = "llama-3.3-70b-versatile";

/**
 * Validates request method and gets body
 */
export async function validateRequest(req, res, allowedMethods = ["POST"]) {
  if (!allowedMethods.includes(req.method)) {
    res.setHeader("Allow", allowedMethods);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return null;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY is missing from environment variables.");
    res.status(500).json({ error: "AI Service configuration error: API key missing." });
    return null;
  }

  try {
    const body = req.body;
    return { body, apiKey };
  } catch (error) {
    res.status(400).json({ error: "Malformed request body." });
    return null;
  }
}

/**
 * Directly pipes the Groq SSE stream to the client
 */
export async function streamGroq(apiKey, messages, temperature = 0.5, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Encoding", "none");
  res.setHeader("X-Accel-Buffering", "no"); // Disable buffering on Nginx/Vercel

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: messages,
        temperature: temperature,
        max_tokens: 1024,
        stream: true
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      res.write(`data: ${JSON.stringify({ error: `Groq stream error: ${response.statusText}` })}\n\n`);
      res.end();
      return;
    }

    const reader = response.body;
    if (!reader) {
      res.write(`data: ${JSON.stringify({ error: "Response body is not readable." })}\n\n`);
      res.end();
      return;
    }

    // Node.js fetch returns a standard readable stream or a Node stream
    // On Vercel, we can read chunks using standard async iteration
    for await (const chunk of reader) {
      const chunkStr = chunk.toString();
      // Split by lines to parse SSE blocks
      const lines = chunkStr.split("\n");
      for (const line of lines) {
        if (line.startsWith("data:")) {
          const rawData = line.substring(5).trim();
          if (rawData === "[DONE]") {
            res.write("data: [DONE]\n\n");
            continue;
          }

          try {
            const parsed = JSON.parse(rawData);
            const text = parsed.choices[0]?.delta?.content || "";
            if (text) {
              res.write(`data: ${JSON.stringify({ text })}\n\n`);
            }
          } catch (e) {
            // Ignore incomplete chunks or parse errors
          }
        }
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Streaming error:", error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
}
