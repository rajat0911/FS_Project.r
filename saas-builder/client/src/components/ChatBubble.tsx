import type { Message } from "../../../shared/types/message";
import ReactMarkdown from "react-markdown";

type Props = {
    message: Message;
};

function ChatBubble({ message }: Props) {
    const isUser = message.role === "user";

    return (
        <div
            className={`flex animate-fade-in ${isUser
                ? "justify-end"
                : "justify-start"
                }`}
        >
            <div
                className={`max-w-3xl px-5 py-4 rounded-2xl ${isUser
                    ? "bg-white text-black"
                    : "bg-slate-800 text-white"
                    }`}
            >
                <div className="flex items-center justify-between gap-4 mb-3">
                    <p className="text-sm opacity-70">
                        {isUser ? "You" : "AI Consultant"}
                    </p>

                    <span className="text-xs text-slate-400 whitespace-nowrap">
                        {message.timestamp}
                    </span>
                </div>

                <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default ChatBubble;