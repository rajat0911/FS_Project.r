import { useEffect, useState } from "react";

import type { Message } from "../../../shared/types/message";

import MainLayout from "../layouts/MainLayout";

function ChatPage() {

  const defaultMessage: Message[] = [

    {
      role: "assistant",
      content:
        "Hi! I'm your AI SaaS consultant 🚀\nHow can I help you today?",
    },
  ];
  const [chatId] = useState(
    crypto.randomUUID()
  );
  const [messages, setMessages] =
    useState<Message[]>(defaultMessage);

  const [isLoading, setIsLoading] =
    useState(false);

  useEffect(() => {

    localStorage.removeItem("saas-chat");

    setMessages(defaultMessage);

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "saas-chat",
      JSON.stringify(messages)
    );

  }, [messages]);

  return (
    <MainLayout
      messages={messages}
      setMessages={setMessages}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      chatId={chatId}
    />
  );
}

export default ChatPage;