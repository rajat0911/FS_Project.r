import html2canvas from "html2canvas";

import jsPDF from "jspdf";

export async function exportReport() {

  const report =
    document.getElementById(
      "saas-report-dashboard"
    );

  if (!report) return;

  const canvas =
    await html2canvas(report, {
      scale: 2,
      useCORS: true,
    });

  const imgData =
    canvas.toDataURL("image/png");

  const pdf =
    new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

  const pdfWidth =
    pdf.internal.pageSize.getWidth();

  const pdfHeight =
    (canvas.height * pdfWidth) /
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
}