import { NextResponse } from "next/server";
import {
  GEMINI_ANALYSIS_SCHEMA,
  parseAIAnalysisResponse,
} from "@/lib/ai-analysis";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const REQUEST_TIMEOUT_MS = 12000;

const CLASSIFIER_PROMPT = `
You are EcoPulse, a campus sustainability classification engine.

Analyze the uploaded image and return one JSON object only.
Classify the item for practical sustainability handling, not for generic captioning.

Your task:
- Identify the primary item and material
- Decide the most appropriate next action
- Prefer marketplace reuse only when the item is genuinely reusable
- Use recycle for clean low-reuse recyclable materials
- Use dispose for dirty, contaminated, unsafe, or non-recoverable waste
- Use donate for intact items better suited for donation than direct marketplace exchange
- For electronic waste, recommend recycling through e-waste channels
- If uncertain between reuse and recycle, choose recycle
- If uncertain between recycle and dispose, choose dispose only when contamination is obvious
- Never return uncertainty, manual review, or human-decision states

Allowed recommendedAction values:
- reuse
- recycle
- dispose
- donate

Keep the response concise, specific, and operational.
Do not include markdown fences or extra text.
`;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key is not configured." },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "An image file is required." },
        { status: 400 },
      );
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image uploads are supported." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  inline_data: {
                    mime_type: image.type,
                    data: buffer.toString("base64"),
                  },
                },
                {
                  text: CLASSIFIER_PROMPT,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json",
            responseJsonSchema: GEMINI_ANALYSIS_SCHEMA,
          },
        }),
        signal: controller.signal,
      });

      const payload = (await response.json()) as Record<string, unknown>;

      if (!response.ok) {
        return NextResponse.json(
          { error: "Gemini request failed.", details: payload },
          { status: 502 },
        );
      }

      const text = extractGeminiText(payload);

      if (!text) {
        return NextResponse.json(
          { error: "Gemini returned no usable content." },
          { status: 502 },
        );
      }

      let parsedJson: unknown;

      try {
        parsedJson = JSON.parse(text);
      } catch {
        return NextResponse.json(
          { error: "Gemini returned invalid JSON.", rawText: text },
          { status: 502 },
        );
      }

      const analysis = parseAIAnalysisResponse(parsedJson);

      if (!analysis) {
        return NextResponse.json(
          { error: "Gemini returned JSON that did not match the required schema." },
          { status: 502 },
        );
      }

      return NextResponse.json(analysis);
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.name === "AbortError"
            ? "Gemini request timed out."
            : "Unexpected error during image analysis.",
      },
      { status: 500 },
    );
  }
}

function extractGeminiText(payload: Record<string, unknown>) {
  const candidates = payload.candidates;

  if (!Array.isArray(candidates)) {
    return null;
  }

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object") {
      continue;
    }

    const content = (candidate as Record<string, unknown>).content;

    if (!content || typeof content !== "object") {
      continue;
    }

    const parts = (content as Record<string, unknown>).parts;

    if (!Array.isArray(parts)) {
      continue;
    }

    for (const part of parts) {
      if (!part || typeof part !== "object") {
        continue;
      }

      const text = (part as Record<string, unknown>).text;

      if (typeof text === "string" && text.trim().length > 0) {
        return text;
      }
    }
  }

  return null;
}
