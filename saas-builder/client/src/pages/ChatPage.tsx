import { useEffect, useState } from "react";
import type { Message } from "../../../shared/types/message";
import MainLayout from "../layouts/MainLayout";

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
  const savedMessages =
    localStorage.getItem("saas-chat");

  return savedMessages
    ? JSON.parse(savedMessages)
    : [
        {
          role: "assistant",
          content:
            "Hello! Tell me about your SaaS idea and what problem you want to solve.",
        },
      ];
});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainLayout
      messages={messages}
      setMessages={setMessages}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );

  useEffect(() => {
  localStorage.setItem(
    "saas-chat",
    JSON.stringify(messages)
  );
}, [messages]);
}

export default ChatPage;