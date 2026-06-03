import { useEffect, useState, } from "react";

import type { Message, } from "../../../shared/types/message";

import MainLayout from "../layouts/MainLayout";

import { resetAndStartConversation, } from "../services/chat.service";

function ChatPage() {
  const [chatId] = useState(crypto.randomUUID());

  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isGeneratingReport, setIsGeneratingReport,] = useState(false);


  /* START CONVERSATION */

  useEffect(() => {

    async function initChat() {

      try {
        setIsLoading(true); const response = await resetAndStartConversation();

        setMessages([{ role: "assistant", content: response.reply, step: response.step, },]);
      }
      catch (error) {
        console.log(error);

        setMessages([
          {
            role: "assistant",
            content: "Failed to start conversation.",
          },
        ]);
      }
      finally { setIsLoading(false); }
    }
    initChat();
  }, []);

  /* SAVE CHAT */

  useEffect(() => {
    localStorage.setItem("saas-chat", JSON.stringify(messages));
  }, [messages]);

  return (
    <MainLayout
      messages={messages}
      setMessages={setMessages}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      isGeneratingReport={ isGeneratingReport }
      setIsGeneratingReport={ setIsGeneratingReport }
      chatId={chatId}
    />
  );
}

export default ChatPage;