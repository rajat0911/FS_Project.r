import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! Tell me about your SaaS idea and what problem you want to solve.",
    },
  ]);

  return (
    <MainLayout
      messages={messages}
      setMessages={setMessages}
    />
  );
}

export default ChatPage;