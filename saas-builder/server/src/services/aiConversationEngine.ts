import { ConversationStep, } from "../../../shared/types/message";

/* ------------------ */
export async function generateConversationalQuestion(
  step: ConversationStep
) {
  return step.goal;
}