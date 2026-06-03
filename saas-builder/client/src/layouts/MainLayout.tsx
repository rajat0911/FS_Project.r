import Sidebar from "../components/Sidebar";

import ChatMessages from "../components/ChatMessages";

import ChatInput from "../components/ChatInput";

import type { Message, } from "../../../shared/types/message";

type Props = {
  messages: Message[];

  setMessages: React.Dispatch< React.SetStateAction<Message[]> >;

  isLoading: boolean;

  setIsLoading: React.Dispatch< React.SetStateAction<boolean> >;

  isGeneratingReport: boolean;

  setIsGeneratingReport: React.Dispatch< React.SetStateAction<boolean> >;

  chatId: string;
};

function MainLayout({
  messages,
  setMessages,
  isLoading,
  setIsLoading,
  chatId,
  isGeneratingReport,
  setIsGeneratingReport,
}: Props) {

  return (

    <div className="h-screen bg-slate-950 text-white flex">

      <Sidebar />

      <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">

        {/* HEADER */}

        <div className="border-b border-slate-800 px-6 py-4">

          <h2 className="text-lg font-semibold">
            AI SaaS Consultant
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Build, validate, and plan your SaaS idea with AI.
          </p>

        </div>

        {/* CHAT */}

        <ChatMessages messages={messages} isLoading={isLoading} isGeneratingReport={ isGeneratingReport } />

        {/* INPUT */}

        <ChatInput
          setMessages={setMessages}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          chatId={chatId}
          setIsGeneratingReport={
            setIsGeneratingReport
          }
          currentStep={ messages[ messages.length - 1 ]?.step }
        />

      </div>
    </div>
  );
}

export default MainLayout;