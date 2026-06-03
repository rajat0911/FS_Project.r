import { conversationFlow, } from "../data/conversationFlow";

import { getSession, updateSession, } from "./sessionManager";

/* ---- */

export function getCurrentStep( sessionId: string ) {
  const session = getSession(sessionId);
  return conversationFlow[ session.currentStepIndex ];
}

/* -------- */

function getNextValidIndex( startIndex: number, answers: Record<string, any> ) {
  let index = startIndex;
  while ( index < conversationFlow.length ) 
    {
    const step = conversationFlow[index];

    if ( !step.condition || step.condition(answers) ) {
      return index;
    }
    index++;
  }
  return index;
}

/* ----- */

export function saveAnswer( sessionId: string, answer: any ) {
  const session = getSession(sessionId);

  const currentStep = conversationFlow[ session.currentStepIndex ];
  
  if (!currentStep) return null;
  
  const updatedAnswers = { ...session.answers,
  
    [currentStep.field]: answer,
  };

  const nextIndex = getNextValidIndex( session.currentStepIndex + 1, updatedAnswers );

  const completed = nextIndex >= conversationFlow.length;

  updateSession( sessionId,
    {
      answers: updatedAnswers,

      currentStepIndex: nextIndex,

      completed,
    }
  );

  return { completed, answers: updatedAnswers, };
}

/* ----------- */

export function getNextStep( sessionId: string ) {
  const session = getSession(sessionId);
  const currentIndex = getNextValidIndex( session.currentStepIndex, session.answers );

  if ( currentIndex >= conversationFlow.length ) { return null; }

  return conversationFlow[ currentIndex ];
}