import { useState } from "react";
import { sendMessage } from "../services/chat.service";
import type { Message } from "../../../shared/types/message";

type Props = {
  setMessages: React.Dispatch<
    React.SetStateAction<Message[]>
  >;

  isLoading: boolean;

  setIsLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

function ChatInput({ setMessages, isLoading, setIsLoading }: Props) {
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");
    setIsLoading(true);
    try {
      const data = await sendMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ AI service is temporarily unavailable. Please try again later.",
        },
      ]);

      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-slate-800 px-6 py-5 bg-slate-950">

      <div className="max-w-4xl mx-auto flex gap-3">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Describe your SaaS idea..."
          autoFocus
          className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-4 outline-none focus:border-slate-500"
        />

        <button
          disabled={!input.trim() || isLoading}
          onClick={handleSendMessage}
          className="bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed
                     px-6 rounded-2xl font-medium hover:bg-slate-200 transition"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatInput;