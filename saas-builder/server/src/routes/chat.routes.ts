import { Router } from "express";

import { GoogleGenAI }
from "@google/genai";

import questions
from "../data/questions";

import REPORT_PROMPT
from "../prompts/reportPrompt";

const router = Router();

const ai = new GoogleGenAI({
  apiKey:
    process.env.GEMINI_API_KEY!,
});

let currentQuestionIndex = 0;

const userAnswers: string[] = [];

// NEW
let interviewStarted = false;

function resetConversation() {

  userAnswers.length = 0;

  currentQuestionIndex = 0;

  interviewStarted = false;
}

router.post(
  "/",
  async (req, res) => {

    try {

      const { message } =
        req.body;

      console.log(
        "User Message:"
      );

      console.log(message);

      // FIRST MESSAGE FLOW
      if (!interviewStarted) {

        interviewStarted = true;

        return res.json({
          reply:
            `That's great to hear 🚀\n\n${questions[0]}`,
        });
      }

      // STORE ANSWERS
      userAnswers.push(message);

      // ASK NEXT QUESTION
      if (
        currentQuestionIndex <
        questions.length - 1
      ) {

        currentQuestionIndex++;

        return res.json({
          reply:
            questions[
              currentQuestionIndex
            ],
        });
      }

      // GENERATE FINAL REPORT
      const formattedAnswers =
        userAnswers
          .map(
            (
              answer,
              index
            ) => `
${questions[index]}:
${answer}
`
          )
          .join("\n");

      console.log(
        "Generating SaaS Report..."
      );

      const response =
        await ai.models.generateContent({

          model:
            "gemini-2.5-flash",

          contents: `
${REPORT_PROMPT}

USER ANSWERS:

${formattedAnswers}
          `,
        });

      const report =
        response.text ||
        "Failed to generate report.";

      console.log(
        "REPORT GENERATED ✅"
      );

      resetConversation();

      return res.json({
        reply: report,
      });

    } catch (error: any) {

      console.log(
        "FULL ERROR:"
      );

      console.log(error);

      return res.status(500).json({
        reply:
          "Failed to generate SaaS report.",
      });
    }
  }
);

router.post(
  "/reset",
  (req, res) => {

    resetConversation();

    return res.json({
      success: true,
    });
  }
);

export default router;