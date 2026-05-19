import useAutoScroll from "./useAutoScroll";

type Props = {
  messages: {
    role: string;
    content: string;
  }[];
};

function ChatMessages({ messages }: Props) {
    const bottomRef = useAutoScroll(messages);
  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      
      <div className="max-w-4xl mx-auto space-y-6">
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`rounded-2xl px-5 py-4 max-w-3xl ${
                message.role === "user"
                  ? "bg-white text-black"
                  : "bg-slate-800 text-white"
              }`}
            >
              {message.role === "assistant" && (
                <p className="text-sm text-slate-300 mb-2">
                  AI Consultant
                </p>
              )}

              <p className="leading-7 whitespace-pre-wrap">
                  {message.content}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
  <div ref={bottomRef} />
}

export default ChatMessages;