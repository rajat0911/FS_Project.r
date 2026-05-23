import { resetChat }
from "../services/chat.service";

import jsPDF from "jspdf";

import html2canvas
from "html2canvas";

const exportReport =
  async () => {

  const report =
    document.getElementById(
      "saas-report-dashboard"
    );

  if (!report) {

    alert(
      "No SaaS report found."
    );

    return;
  }

  try {

    const canvas =
      await html2canvas(
        report,
        {
          scale: 2,
          useCORS: true,
          backgroundColor:
            "#020617",
        }
      );

    const imgData =
      canvas.toDataURL(
        "image/png"
      );

    const pdf =
      new jsPDF({
        orientation:
          "portrait",

        unit: "px",

        format: "a4",
      });

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height *
        pdfWidth) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      "saas-evaluation-report.pdf"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to export report."
    );
  }
};

function Sidebar() {

  const handleNewChat =
    async () => {

    await resetChat();

    window.location.reload();
  };

  return (

    <div className="w-72 border-r border-slate-800 p-4 flex flex-col">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-2xl font-bold">

          AI SaaS Consultant

        </h1>

        <p className="text-sm text-slate-400 mt-2">

          Build smarter SaaS ideas with AI guidance.

        </p>

      </div>

      {/* NEW CHAT */}
      <button
        onClick={
          handleNewChat
        }
        className="bg-white text-black rounded-xl px-4 py-3 font-medium hover:bg-slate-200 transition mb-4"
      >

        + New Chat

      </button>

      {/* EXPORT REPORT */}
      <button
        onClick={
          exportReport
        }
        className="w-full bg-slate-800 hover:bg-slate-700 transition rounded-xl px-4 py-3"
      >

        Export SaaS Report

      </button>

      {/* HISTORY */}
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