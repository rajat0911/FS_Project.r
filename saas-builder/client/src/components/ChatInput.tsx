import { useState, useRef, useEffect } from "react";
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {

    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    textarea.style.height =
      `${Math.min(textarea.scrollHeight, 180)}px`;

  }, [input]);

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

      content: finalMessage,
      timestamp: currentTime,
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

    } finally { setIsLoading(false); setIsGeneratingReport(false); }
  };

  return (
    <div className="px-6 py-5">
      <div className="max-w-4xl mx-auto w-full">

        {currentStep?.options && (
          <div className="flex flex-wrap gap-3 mb-4 " >

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
          <div className=" flex items-center w-full bg-slate-900/80 border border-slate-700 rounded-3xl px-5 py-3 backdrop-blur-sm " >

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              autoFocus
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !isLoading
                ) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                currentStep?.placeholder ||
                (
                  currentStep?.inputType === "text"
                    ? "Describe your startup idea..."
                    : "Type your response..."
                )
              }
              className="
  flex-1
  resize-none
  min-h-[28px]
  bg-transparent
  outline-none
  text-white
  placeholder:text-slate-500
  px-2
  max-h-[220px]
  overflow-y-auto
  leading-6
"
            />

            <button
              disabled={(!input.trim() && selectedOptions.length === 0) || isLoading}
              onClick={() => handleSendMessage()}
              className=" h-11 w-11 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center " >
              {isLoading ? "..." : "➜"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;