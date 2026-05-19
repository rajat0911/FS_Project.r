import type { Message } from "../../../shared/types/message";
import ReactMarkdown from "react-markdown";

type Props = {
    message: Message;
};

function ChatBubble({ message }: Props) {
    const isUser = message.role === "user";

    return (
        <div
            className={`flex ${isUser
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
                <p className="text-sm mb-2 opacity-70">
                    {isUser ? "You" : "AI Consultant"}
                </p>

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