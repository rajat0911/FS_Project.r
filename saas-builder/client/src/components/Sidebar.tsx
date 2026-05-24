import { useState } from "react";

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
  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const handleNewChat =
    async () => {

      await resetChat();

      window.location.reload();
    };

  return (

    <div
      className={`border-r border-slate-800 p-4 flex flex-col transition-all duration-200 ${isCollapsed ? "w-20" : "w-72"
        }`}
    >
      <div className="flex justify-end mb-3">
        <button
          onClick={() =>
            setIsCollapsed((prev) => !prev)
          }
          aria-label={
            isCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          className="bg-slate-800 hover:bg-slate-700 rounded-lg px-3 py-1 text-sm"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* HEADER */}
      <div className="mb-5">

        <div className="flex items-center gap-3 mb-3">
          <img
            src="/cloudtrains_logo.png"
            alt="CloudTrains logo"
            className="h-10 w-10 rounded-lg object-contain bg-white p-1"
          />

          {!isCollapsed && (
            <h1 className="text-2xl font-bold leading-none">
              AI SaaS Consultant
            </h1>
          )}
        </div>

        {!isCollapsed && (
          <p className="text-sm text-slate-400 mt-2">
            Build smarter SaaS ideas with AI guidance.
          </p>
        )}

      </div>

      {/* NEW CHAT */}
      <button
        onClick={
          handleNewChat
        }
        className="bg-white text-black rounded-xl px-4 py-3 font-medium hover:bg-slate-200 transition mb-4"
      >

        {isCollapsed ? "+" : "+ New Chat"}

      </button>

      {/* EXPORT REPORT */}
      <button
        onClick={
          exportReport
        }
        className="w-full bg-slate-800 hover:bg-slate-700 transition rounded-xl px-1 py-3"
      >

        {isCollapsed ? "Save" : "Export SaaS Report"}

      </button>
    </div>
  );
}

export default Sidebar;