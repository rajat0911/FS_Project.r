import { Router } from "express";

import {
  getCurrentStep,
  saveAnswer,
  getNextStep,
} from "../services/conversationEngine";

import {
  clearSession,
} from "../services/sessionManager";

import { GoogleGenAI }
  from "@google/genai";


import EVALUATION_PROMPT
  from "../prompts/evaluationPrompt";

import {
  generateConversationalQuestion,
} from "../services/aiConversationEngine";

const router = Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY!, });



/* RESET */


/* CHAT ROUTE */

router.post(
  "/",
  async (req, res) => {

    try {

      const {
        message,
        sessionId,
      } = req.body;

      if (!sessionId) {

        return res.status(400).json({
          reply:
            "Missing sessionId",
        });
      }

      /* FIRST MESSAGE */

      if (
        !message ||
        message.trim() === ""
      ) {

        const firstStep =
          getCurrentStep(
            sessionId
          );

        return res.json({

          reply:
            firstStep.goal,

          step:
            firstStep,
        });
      }

      /* SAVE ANSWER */

      const result =
        saveAnswer(
          sessionId,
          message
        );

      if (!result) {

        return res.status(500).json({
          reply:
            "Failed to save answer.",
        });
      }

      /* FLOW COMPLETED */

      if (result.completed) {

        console.log(
          "GENERATING AI EVALUATION..."
        );

        const response =
          await ai.models.generateContent({

            model:
              "gemini-2.5-flash",

            contents: `

${EVALUATION_PROMPT}

Analyze this startup deeply.

FOUNDER SESSION DATA:

${JSON.stringify(
              result.answers,
              null,
              2
            )}

`,
          });

        const rawText =
          response.text || "{}";

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
            parseError
          );

          return res.status(500).json({
            reply:
              "Failed to parse AI JSON.",
          });
        }

        clearSession(
          sessionId
        );

        return res.json({
          reply:
            parsedData,
        });
      }

      /* NEXT QUESTION */

      const nextStep =
        getNextStep(
          sessionId
        );

      const aiQuestion =
        await generateConversationalQuestion(

          nextStep,

          result.answers,

          message
        );

      return res.json({

        reply:
          aiQuestion,

        step:
          nextStep,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        reply:
          "Failed to process conversation.",
      });
    }
  }
);

/* RESET ROUTE */

router.post(
  "/reset",
  (req, res) => {

    const {
      sessionId,
    } = req.body;

    if (sessionId) {

      clearSession(
        sessionId
      );
    }

    return res.json({
      success: true,
    });
  }
);

export default router;