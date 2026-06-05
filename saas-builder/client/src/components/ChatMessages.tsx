import useAutoScroll from "./useAutoScroll";

import type { Message, } from "../../../shared/types/message";

import ChatBubble from "./ChatBubble";

type Props = {
  messages: Message[];
  isLoading: boolean;
  isGeneratingReport?: boolean;
};

import { useEffect, useState } from "react";

function ReportGenerationProgress() {

  const steps = [

    "Analyzing startup idea",

    "Evaluating target audience",

    "Calculating revenue potential",

    "Researching competitors",

    "Estimating scalability",

    "Generating investor insights",

    "Preparing final report"
  ];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer =
      setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) { return 100; }
          return prev + 2;
        });
      }, 150);

    return () => clearInterval(timer);
  }, []);

  const currentStep = Math.min(Math.floor(progress / 15), steps.length - 1);

  return (
    <div className="flex">

      <div className=" w-full max-w-2xl bg-slate-900 border border-cyan-500/20 rounded-3xl p-6 " >

        <h3 className=" text-cyan-400 text-xl font-semibold mb-6 " >
          Generating Startup Report
        </h3>

        <div className=" h-3 bg-slate-800 rounded-full overflow-hidden mb-3 " >
          <div className=" h-full bg-cyan-400 transition-all duration-500 " style={{ width: `${progress}%` }} />
        </div>

        <div className="text-right text-sm text-slate-400 mb-6">
          {progress}%
        </div>

        <div className="space-y-3">

          {steps.map((step, index) => {
            if (index < currentStep) {

              return (
                <div key={step} className=" text-green-400 flex items-center gap-2 " >
                  <span>✓</span>
                  <span>{step}</span>
                </div>
              );
            }

            if (index === currentStep) {
              return (

                <div key={step} className=" text-cyan-400 flex items-center gap-2 " >
                  <span className=" animate-spin " > ⟳ </span>
                  <span>{step}</span>
                </div>
              );
            }

            return (
              <div key={step} className="text-slate-600" > {step} </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ChatMessages({ messages, isLoading, isGeneratingReport, }: Props) {

  const bottomRef = useAutoScroll(messages);
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">

      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message, index) => (<ChatBubble key={index} message={message}
        />)
        )}

        {isGeneratingReport && ( <ReportGenerationProgress /> )}

        {isLoading && !isGeneratingReport && (
          <div className="flex">

            <div className="bg-slate-800 rounded-2xl px-5 py-4">

              <div className="flex gap-1">

                <span className="animate-bounce">
                  •
                </span>

                <span className="animate-bounce delay-100">
                  •
                </span>

                <span className="animate-bounce delay-200">
                  •
                </span>

              </div>

            </div>

          </div>

        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default ChatMessages;