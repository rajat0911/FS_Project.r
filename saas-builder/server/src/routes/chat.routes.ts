import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import generateSummary from "../utils/generateSummary";
const router = Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

import SYSTEM_PROMPT from "../prompts/systemPrompt";

const conversationHistory: {
  role: "user" | "model";
  parts: { text: string }[];
}[] = [];

import questions from "../data/questions";

let currentQuestionIndex = 0;
const userAnswers: string[] = [];
function resetConversation() {
  conversationHistory.length = 0;

  userAnswers.length = 0;

  currentQuestionIndex = 0;
}
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    userAnswers.push(message);
    conversationHistory.push({
      role: "user",
      parts: [{ text: message }],
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        ...conversationHistory,
      ],
    });
    let aiReply =
      response.text ||
      "AI service is temporarily unavailable.";

    if (
      currentQuestionIndex < questions.length
    ) {
      aiReply += `\n\n${questions[currentQuestionIndex]}`;

      currentQuestionIndex++;
    } else {
      aiReply += generateSummary(userAnswers);
    }

    conversationHistory.push({
      role: "model",
      parts: [{ text: aiReply }],
    });
    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );
    return res.json({
      reply: aiReply,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      reply:
        "AI service is temporarily unavailable. Please check API quota or billing.",
    });
  }
});
router.post("/reset", (req, res) => {
  resetConversation();

  return res.json({
    success: true,
  });
});

export default router;