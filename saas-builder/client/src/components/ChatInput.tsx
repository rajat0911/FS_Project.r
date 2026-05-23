import { useState } from "react";

import { sendMessage }
  from "../services/chat.service";

import type { Message }
  from "../../../shared/types/message";

import { saveMessage }
  from "../services/message.service";

type Props = {
  setMessages: React.Dispatch<
    React.SetStateAction<Message[]>
  >;

  isLoading: boolean;

  setIsLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  chatId: string;
};

function ChatInput({
  setMessages,
  isLoading,
  setIsLoading,
  chatId,
}: Props) {

  const [input, setInput] =
    useState("");

  const handleSendMessage =
    async () => {

      if (!input.trim()) return;

      const userMessage = input;

      const currentTime =
        new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: userMessage,
          timestamp: currentTime,
        },
      ]);

      setInput("");

      setIsLoading(true);

      try {

        await saveMessage({
          chat_id: chatId,

          role: "user",

          content: userMessage,

          timestamp: currentTime,
        });

        const data =
          await sendMessage(userMessage);
        console.log("FRONTEND DATA:");
        console.log(data);

        console.log("REPLY TYPE:");
        console.log(typeof data.reply);

        console.log("REPLY:");
        console.log(data.reply);

        console.log(data.reply);

        console.log(
          typeof data.reply
        );

        const assistantTime =
          new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          );

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            timestamp: assistantTime,
          },
        ]);

        await saveMessage({
          chat_id: chatId,

          role: "assistant",

          content: data.reply,

          timestamp: assistantTime,
        });

      } catch (error) {

        console.error(error);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "⚠️ AI service is temporarily unavailable.",

            timestamp:
              new Date().toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              ),
          },
        ]);

      } finally {

        setIsLoading(false);
      }
    };

  return (
    <div className="border-t border-slate-800 px-6 py-5 bg-slate-950">

      <div className="max-w-4xl mx-auto flex gap-3">

        <input
          type="text"

          value={input}

          onChange={(e) =>
            setInput(e.target.value)
          }

          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !isLoading
            ) {
              handleSendMessage();
            }
          }}

          placeholder="Describe your SaaS idea..."

          autoFocus

          className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-4 outline-none focus:border-slate-500"
        />

        <button
          disabled={
            !input.trim() || isLoading
          }

          onClick={handleSendMessage}

          className="bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed px-6 rounded-2xl font-medium hover:bg-slate-200 transition"
        >
          {isLoading
            ? "Thinking..."
            : "Send"}
        </button>

      </div>

    </div>
  );
}

export default ChatInput;