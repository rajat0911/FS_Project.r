import type { Message }
    from "../../../shared/types/message";

import ReactMarkdown
    from "react-markdown";

import type {
    EvaluationReport,
} from "../../../shared/types/evaluation";

import remarkGfm
    from "remark-gfm";

import EvaluationDashboard
    from "./EvaluationDashboard";

function ChatBubble({
    message,
}: {
    message: Message;
}) {

    const isUser =
        message.role === "user";

    const isEvaluationReport =
        typeof message.content === "object";

    return (

        <div
            className={`flex ${isUser
                ? "justify-end"
                : "justify-start"
                }`}
        >

            <div
                className={`max-w-5xl rounded-3xl ${isUser
                    ? "bg-white text-black px-6 py-4"
                    : "text-white"
                    }`}
            >

                {/* USER MESSAGE */}
                {isUser && (
                    <p className="leading-7">
                        {message.content as string}
                    </p>
                )}

                {/* NORMAL AI MESSAGE */}
                {!isUser &&
                    !isEvaluationReport && (

                        <div className="bg-slate-950 border border-slate-800 px-6 py-5 rounded-3xl">

                            <ReactMarkdown
                                remarkPlugins={[
                                    remarkGfm,
                                ]}
                            >

                                {message.content as string}

                            </ReactMarkdown>

                        </div>
                    )}

                {/* AI DASHBOARD */}
                {!isUser &&
                    isEvaluationReport && (

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