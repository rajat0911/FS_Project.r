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
      className={`
      w-full
      flex
      ${isUser
          ? "justify-end"
          : "justify-start"}
      `}
    >

      {/* USER MESSAGE */}

      {isUser && typeof message.content === "string" && (

        <div
          className="
          max-w-2xl
          bg-white
          text-black
          rounded-3xl
          px-6
          py-4
          shadow-sm
          "
        >

          <p
            className="
            leading-7
            whitespace-pre-wrap
            "
          >
            {message.content}
          </p>

        </div>

      )}

      {/* AI MESSAGE */}

      {!isUser && typeof message.content === "string" && (

        <div
          className="
          max-w-4xl
          "
        >

          <div
            className="
            flex
            items-center
            gap-2
            mb-3
            "
          >

            <div
              className="
              h-7
              w-7
              rounded-full
              bg-cyan-500/20
              flex
              items-center
              justify-center
              text-cyan-400
              text-sm
              "
            >
              ✦
            </div>

            <span
              className="
              text-sm
              font-medium
              text-slate-400
              "
            >
              Spark
            </span>

          </div>

          <div
            className="
            text-slate-100
            leading-8
            whitespace-pre-wrap
            "
          >
            {message.content}
          </div>

        </div>

      )}

      {/* REPORT */}

      {isReport && (

        <div className="w-full">

          <EvaluationDashboard
            report={
              message.content as EvaluationReport
            }
          />

        </div>

      )}

    </div>

  );
}

export default ChatBubble;