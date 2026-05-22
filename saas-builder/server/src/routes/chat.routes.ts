import { Router } from "express";

import { GoogleGenAI }
from "@google/genai";

import metrics
from "../data/metrics";

import EVALUATION_PROMPT
from "../prompts/evaluationPrompt";

const router = Router();

const ai = new GoogleGenAI({
  apiKey:
    process.env.GEMINI_API_KEY!,
});

let currentQuestionIndex = 0;

let interviewStarted = false;

let startupMetrics = {
  idea: "",
  launch_country: "",
  founder_country: "",
  target_age_group: "",
  tech_stack: "",
};

function resetConversation() {

  currentQuestionIndex = 0;

  interviewStarted = false;

  startupMetrics = {
    idea: "",
    launch_country: "",
    founder_country: "",
    target_age_group: "",
    tech_stack: "",
  };
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

      // FIRST MESSAGE
      if (!interviewStarted) {

        interviewStarted = true;

        return res.json({
          reply:
            `That's great to hear 🚀\n\n${metrics[0]}`,
        });
      }

      // STORE ANSWERS
      switch (
        currentQuestionIndex
      ) {

        case 0:
          startupMetrics.idea =
            message;
          break;

        case 1:
          startupMetrics.launch_country =
            message;
          break;

        case 2:
          startupMetrics.founder_country =
            message;
          break;

        case 3:
          startupMetrics.target_age_group =
            message;
          break;

        case 4:
          startupMetrics.tech_stack =
            message;
          break;
      }

      // ASK NEXT QUESTION
      if (
        currentQuestionIndex <
        metrics.length - 1
      ) {

        currentQuestionIndex++;

        return res.json({
          reply:
            metrics[
              currentQuestionIndex
            ],
        });
      }

      console.log(
        "STARTUP METRICS:"
      );

      console.log(
        startupMetrics
      );

      // FINAL AI EVALUATION
      const response =
        await ai.models.generateContent({

          model:
            "gemini-2.5-flash",

          contents: `
${EVALUATION_PROMPT}

Analyze this startup:

${JSON.stringify(
  startupMetrics,
  null,
  2
)}
          `,
        });

      const rawText =
        response.text || "{}";

      console.log(
        "RAW AI RESPONSE:"
      );

      console.log(rawText);

      // CLEAN JSON
      const cleanedText =
        rawText
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      let parsedData;

      try {

        parsedData =
          JSON.parse(
            cleanedText
          );

      } catch (
        parseError
      ) {

        console.log(
          "JSON PARSE ERROR:"
        );

        console.log(
          parseError
        );

        return res.status(500).json({
          reply:
            "Failed to parse AI evaluation.",
        });
      }

      console.log(
        "PARSED JSON:"
      );

      console.log(
        parsedData
      );

      resetConversation();

      return res.json({
        reply: parsedData,
      });

    } catch (error: any) {

      console.log(
        "FULL ERROR:"
      );

      console.log(error);

      return res.status(500).json({
        reply:
          "Failed to generate SaaS evaluation.",
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