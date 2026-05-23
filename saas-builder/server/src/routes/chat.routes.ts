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

/* -------------------------------- */
/* METRIC STATE */
/* -------------------------------- */

let currentQuestionIndex = 0;

let interviewStarted = false;

const metricKeys = [
  "idea",
  "launch_country",
  "founder_country",
  "target_age_group",
  "tech_stack",
] as const;

let startupMetrics:
  Record<string, string> = {

  idea: "",

  launch_country: "",

  founder_country: "",

  target_age_group: "",

  tech_stack: "",
};

/* -------------------------------- */
/* RESET */
/* -------------------------------- */

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

/* -------------------------------- */
/* CHAT ROUTE */
/* -------------------------------- */

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

      /* ---------------------------- */
      /* FIRST MESSAGE */
      /* ---------------------------- */

      if (!interviewStarted) {

        interviewStarted = true;

        return res.json({
          reply:
            `Hi! I'm your AI SaaS Consultant 🚀

I will analyze your startup idea,
evaluate its market potential,
technical feasibility,
competition level,
scalability,
and business growth opportunities.

Let's begin 👇

${metrics[0]}`
        });
      }

      /* ---------------------------- */
      /* STORE USER ANSWER */
      /* ---------------------------- */

      const currentKey =
        metricKeys[
        currentQuestionIndex
        ];

      startupMetrics[
        currentKey
      ] = message;

      console.log(
        "UPDATED METRICS:"
      );

      console.log(
        startupMetrics
      );

      /* ---------------------------- */
      /* ASK NEXT QUESTION */
      /* ---------------------------- */

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

      /* ---------------------------- */
      /* FINAL AI EVALUATION */
      /* ---------------------------- */

      console.log(
        "GENERATING AI EVALUATION..."
      );

      const response =
        await ai.models.generateContent({

          model:
            "gemini-2.5-flash",

          contents: `
${EVALUATION_PROMPT}

Analyze this SaaS startup deeply.

STARTUP METRICS:

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

      /* ---------------------------- */
      /* CLEAN RESPONSE */
      /* ---------------------------- */

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
          .replace(
            /\n/g,
            ""
          )
          .trim();

      console.log(
        "CLEANED RESPONSE:"
      );

      console.log(
        cleanedText
      );

      /* ---------------------------- */
      /* PARSE JSON */
      /* ---------------------------- */

      let parsedData;

      try {

        parsedData =
          JSON.parse(
            cleanedText
          );
        console.log("PARSED DATA TYPE:");
        console.log(typeof parsedData);

        console.log("PARSED DATA:");
        console.log(parsedData);

      } catch (
      parseError
      ) {

        console.log(
          "TYPE OF PARSED DATA:"
        );

        console.log(typeof parsedData);

        console.log(
          "JSON PARSE ERROR:"
        );

        console.log(
          parseError
        );

        return res.status(500).json({
          reply:
            "Failed to parse AI evaluation JSON.",
        });
      }

      console.log(
        "PARSED JSON:"
      );

      console.log(
        parsedData
      );

      /* ---------------------------- */
      /* RESET SESSION */
      /* ---------------------------- */

      resetConversation();

      /* ---------------------------- */
      /* RETURN RESPONSE */
      /* ---------------------------- */

      return res.json({
        reply: {
          ...parsedData
        },
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

/* -------------------------------- */
/* RESET ROUTE */
/* -------------------------------- */

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