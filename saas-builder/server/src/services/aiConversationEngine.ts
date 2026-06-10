// import { ConversationStep } from "../../../shared/types/message";

// export async function generateConversationalQuestion(
//   step: ConversationStep
// ) {
//   return step.goal;
// }

import { ConversationStep } from "../../../shared/types/message";

export async function generateConversationalQuestion(
  step: ConversationStep,
  _answers?: any,
  _latestAnswer?: string
) {

  const reactions = [
    "Interesting idea.",
    "That makes sense.",
    "Good insight.",
    "Interesting approach.",
    "That's a valuable observation.",
    "I can see the opportunity there.",
    "That's a common challenge founders face."
  ];

  const reaction =
    reactions[
      Math.floor(
        Math.random() *
        reactions.length
      )
    ];

  return `${reaction}\n\n${step.goal}`;
}