import type { Message }
from "../../../shared/types/message";

import type { EvaluationReport }
from "../../../shared/types/evaluation";

import EvaluationDashboard
from "./EvaluationDashboard";

type Props = {
  message: Message;
};

function ChatBubble({
  message,
}: Props) {

  const isUser =
    message.role === "user";

  const isReport =
    typeof message.content === "object";

  return (

    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`max-w-6xl rounded-3xl px-6 py-5 ${
          isUser
            ? "bg-white text-black"
            : "bg-slate-900 text-white"
        }`}
      >

        {/* USER MESSAGE */}
        {typeof message.content === "string" && (

          <p className="leading-8 whitespace-pre-wrap">

            {message.content}

          </p>

        )}

        {/* AI REPORT */}
        {isReport && (

          <EvaluationDashboard
            report={
              message.content as EvaluationReport
            }
          />

        )}

      </div>

    </div>
  );
}

export default ChatBubble;