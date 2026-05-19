import { useState } from "react";
import { sendMessage } from "../services/chat.service";

type Props = {
  setMessages: React.Dispatch<
    React.SetStateAction<
      {
        role: string;
        content: string;
      }[]
    >
  >;
};

function ChatInput({ setMessages }: Props) {
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

  try {
    const data = await sendMessage(userMessage);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.reply,
      },
    ]);
  } catch (error) {
    console.error(error);
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
          disabled={!input.trim()}
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