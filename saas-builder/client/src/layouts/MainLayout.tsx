import Sidebar from "../components/Sidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

type Props = {
  messages: {
    role: string;
    content: string;
  }[];

  setMessages: React.Dispatch<
    React.SetStateAction<
      {
        role: string;
        content: string;
      }[]
    >
  >;
};

function MainLayout({
  messages,
  setMessages,
}: Props) {
  return (
    <div className="h-screen bg-slate-950 text-white flex">

      <Sidebar />

      <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
        <div className="border-b border-slate-800 px-6 py-4">
          <h2 className="text-lg font-semibold">
             AI SaaS Consultant
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Build, validate, and plan your SaaS idea with AI.
          </p>
        </div>
        
        <ChatMessages messages={messages} />

        <ChatInput
          setMessages={setMessages}
        />

      </div>
    </div>
  );
}

export default MainLayout;