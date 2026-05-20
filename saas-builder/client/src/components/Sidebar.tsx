import { resetChat } from "../services/chat.service";
import jsPDF from "jspdf";

const exportChat = () => {

  const savedMessages =
    localStorage.getItem("saas-chat");

  if (!savedMessages) {
    alert("No chat found.");
    return;
  }

  const messages =
    JSON.parse(savedMessages);

  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);

  doc.text(
    "AI SaaS Consultation Report",
    20,
    y
  );

  y += 20;

  messages.forEach(
    (
      message: {
        role: string;
        content: string;
      }
    ) => {

      const role =
        message.role === "user"
          ? "User"
          : "AI Consultant";

      doc.setFontSize(14);

      doc.text(role, 20, y);

      y += 8;

      doc.setFontSize(11);

      const lines =
        doc.splitTextToSize(
          message.content,
          170
        );

      doc.text(lines, 20, y);

      y += lines.length * 7 + 12;

      if (y > 260) {
        doc.addPage();

        y = 20;
      }
    }
  );

  doc.save("consultation-report.pdf");
};

function Sidebar() {
  const handleNewChat = async () => {
    await resetChat();

    window.location.reload();
  };
  return (
    <div className="w-72 border-r border-slate-800 p-4 flex flex-col">

      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          AI SaaS Consultant
        </h1>

        <p className="text-sm text-slate-400 mt-2">
          Build smarter SaaS ideas with AI guidance.
        </p>
      </div>

      <button
        onClick={handleNewChat}
        className="bg-white text-black rounded-lg px-4 py-3 font-medium hover:bg-slate-200 transition">
        + New Chat
      </button>

      <button
        onClick={exportChat}
        className="w-full bg-slate-800 hover:bg-slate-700 transition rounded-xl px-4 py-3"
      >
        Export Conversation
      </button>

      <div className="mt-6 space-y-2">

        <div className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 cursor-pointer transition">
          SaaS Idea Discussion
        </div>

        <div className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition">
          AI Startup Planning
        </div>

      </div>

    </div>
  );
}

export default Sidebar;