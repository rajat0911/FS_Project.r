import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
    });
    console.log(response);
    return res.json({
      reply: response.text || "No response from AI.",
    });

  } catch (error) {
  console.error(error);

return res.status(500).json({
    reply:
      "AI service is temporarily unavailable. Please check API quota or billing.",
    });
  }
});

export default router;