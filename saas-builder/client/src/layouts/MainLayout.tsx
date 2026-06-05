import Sidebar from "../components/Sidebar";

import ChatMessages from "../components/ChatMessages";

import ChatInput from "../components/ChatInput";

import type { Message, } from "../../../shared/types/message";

type Props = {
  messages: Message[];

  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;

  isLoading: boolean;

  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  isGeneratingReport: boolean;

  setIsGeneratingReport: React.Dispatch<React.SetStateAction<boolean>>;

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

    <div className="h-screen text-white flex">

      <Sidebar />

      <div className=" flex-1 flex flex-col overflow-hidden relative " >

        <div className=" absolute inset-0 pointer-events-none overflow-hidden " >

          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-cyan-500/5 blur-[180px] " />
        </div>

        {/* HEADER */}

        <div className=" px-6 py-4 flex items-start justify-between " >
          <div>

            <h2 className=" text-lg font-semibold " >
              SparkAI 
            </h2>

          </div>

          <div className=" flex items-center gap-6 text-sm text-slate-400 " >

            <button onClick={() => window.location.href = "/" } className=" hover:text-white transition " >
              Home
            </button>

            <button className=" hover:text-white transition " > Contact </button>
          </div>

        </div>

        {/* CHAT */}

        <ChatMessages messages={messages} isLoading={isLoading} isGeneratingReport={isGeneratingReport} />

        {/* INPUT */}

        <ChatInput 
        setMessages={setMessages} 
        setIsLoading={setIsLoading} 
        isLoading={isLoading} chatId={chatId} 
        setIsGeneratingReport={ setIsGeneratingReport }
        currentStep={messages[messages.length - 1]?.step}
        />
      </div>
    </div>
  );
}

export default MainLayout;