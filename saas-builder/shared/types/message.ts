import type {
  EvaluationReport,
} from "./evaluation";

/* ---------------------------------- */

export type ConversationStep = {

  id: string;

  phase: number;

  field: string;

  goal: string;

  placeholder?: string;

  inputType:
    | "text"
    | "single_select"
    | "multi_select";

  options?: string[];

  required?: boolean;

  condition?: (
    answers: Record<string, any>
  ) => boolean;
};

/* ---------------------------------- */

export type Message = {

  role:
    | "user"
    | "assistant";

  content:
    | string
    | EvaluationReport;

  timestamp?: string;

  step?: ConversationStep;
};