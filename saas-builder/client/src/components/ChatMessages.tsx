import useAutoScroll from "./useAutoScroll";
import type { Message } from "../../../shared/types/message";
import ChatBubble from "./ChatBubble";

type Props = {
  messages: Message[];

  isLoading: boolean;
};

function ChatMessages({ messages, isLoading }: Props) {
  const bottomRef = useAutoScroll(messages);
  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">

      <div className="max-w-4xl mx-auto space-y-6">

        {messages.map((message, index) => (
  <ChatBubble
    key={index}
    message={message}
  />
))}
        {isLoading && (
          <div className="flex">
            <div className="bg-slate-800 rounded-2xl px-5 py-4">
              <div className="flex gap-1">
                <span className="animate-bounce">•</span>
                <span className="animate-bounce delay-100">•</span>
                <span className="animate-bounce delay-200">•</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
  <div ref={bottomRef} />
}

export default ChatMessages;