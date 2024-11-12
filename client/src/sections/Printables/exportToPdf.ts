import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (elementIds: string | string[]) => {
  // Upewniamy się, że elementIds jest tablicą
  const ids = Array.isArray(elementIds) ? elementIds : [elementIds];

  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210; // Szerokość strony A4 w mm
  const pageHeight = pdf.internal.pageSize.height;

  for (let i = 0; i < ids.length; i++) {
    const elementId = ids[i];
    const input = document.getElementById(elementId);

    if (!input) continue;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Dodaj pierwszą stronę z bieżącym zaproszeniem
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Jeśli obraz jest większy niż jedna strona, dodaj kolejne strony
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Dodaj stronę tylko, jeśli jest kolejne zaproszenie
    if (i < ids.length - 1) {
      pdf.addPage();
    }
  }

  pdf.save("invitations.pdf");
};
