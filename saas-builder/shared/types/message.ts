import type {
  EvaluationReport
}
from "./evaluation";

export type Message = {

  role:
    | "user"
    | "assistant";

  content:
    | string
    | EvaluationReport;

  timestamp?: string;
};