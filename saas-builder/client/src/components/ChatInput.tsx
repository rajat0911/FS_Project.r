import { useState } from "react";
import { sendMessage } from "../services/chat.service";
import type { Message, ConversationStep, } from "../../../shared/types/message";
import { saveMessage } from "../services/message.service";

type Props = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;

  isLoading: boolean;

  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  chatId: string;

  setIsGeneratingReport: React.Dispatch<React.SetStateAction<boolean>>;

  currentStep?: ConversationStep;

};

function ChatInput({ setMessages, isLoading, setIsLoading, setIsGeneratingReport, chatId, currentStep, }: Props) {

  const [input, setInput] = useState("");

  const [selectedOptions, setSelectedOptions,] = useState<string[]>([]);

  /* OPTION SELECTION */

  const handleOptionSelect = (option: string) => {

    if (currentStep?.inputType === "single_select") {
      setInput(option); setTimeout(() => { handleSendMessage(option); }, 100);
      return;
    }

    if (currentStep?.inputType === "multi_select") {
      setSelectedOptions((prev) => {
        if (prev.includes(option)) { return prev.filter((item) => item !== option); }

        return [...prev, option,];
      }
      );
    }
  };

  /* SEND MESSAGE */

  const handleSendMessage = async (manualInput?: string) => {

    let finalMessage = manualInput || input;

    if (currentStep?.inputType === "multi_select" && selectedOptions.length > 0) {
      finalMessage = selectedOptions.join(", ");
    }

    if (!finalMessage.trim()) { return; }

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", });

    /* USER MESSAGE */

    setMessages((prev) => [...prev,
    {
      role: "user",

      content:
        finalMessage,

      timestamp:
        currentTime,
    },
    ]);

    setInput("");

    setSelectedOptions([]);

    setIsLoading(true);

    if (currentStep?.field === "founder_country") { setIsGeneratingReport(true); }
    try {
      /* SAVE USER */

      await saveMessage({

        chat_id: chatId,
        role: "user",
        content: finalMessage,
        timestamp: currentTime,

      });

      /* AI REQUEST */

      const data = await sendMessage(finalMessage);

      const assistantTime = new Date().toLocaleTimeString([],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );

      /* ASSISTANT MESSAGE */

      setMessages((prev) => [...prev,
      {
        role: "assistant",
        content: data.reply,
        timestamp: assistantTime,
        step: data.step,
      },
      ]);

      /* SAVE ASSISTANT */

      await saveMessage({
        chat_id: chatId,
        role: "assistant",
        content: data.reply,
        timestamp: assistantTime,
      });
    } catch (error) {
      console.error(error);

      setMessages((prev) => [...prev,
      {
        role: "assistant",

        content: "⚠️ AI service temporarily unavailable.",

        timestamp: new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
      },
      ]
      );

    } finally {
      setIsLoading(false);
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="border-t border-slate-800 px-6 py-5 bg-slate-950">
      <div className="max-w-4xl mx-auto w-full">

        {currentStep?.options && (
          <div className=" flex flex-wrap gap-3 mb-4 " >

            {currentStep.options.map((option) => {

              const isSelected = selectedOptions.includes(option);

              return (
                <button key={option} onClick={() => handleOptionSelect(option)}

                  className={` px-4 py-2 rounded-2xl border transition text-sm
                      ${isSelected
                      ? "bg-cyan-500 border-cyan-500 text-black"
                      : "bg-slate-800 border-slate-700 hover:border-cyan-400 hover:bg-slate-700"} `} >
                  {option}
                </button>
              );
            }
            )}
          </div>
        )}

        <div className="flex gap-3">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !isLoading) { handleSendMessage(); } }}
            placeholder={
              currentStep?.placeholder || ( currentStep?.inputType === "text" ? "Type your answer..." : "Or type custom response..." )
            }
            autoFocus
            className=" flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-4 outline-none focus:border-slate-500 " />
          
          <button
            disabled={ ( !input.trim() && selectedOptions.length === 0 ) || isLoading }
            onClick={() => handleSendMessage() }

            className=" bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed px-6 rounded-2xl font-medium hover:bg-slate-200 transition " >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;