import path from "path";
import PDFDocument from "pdfkit";

export async function generateMonthlyPDF({
  userName,
  month,
  stats,
  insights,
}) {
  const doc = new PDFDocument({
    margin: 50,
    font: path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf"),
  });

  const chunks = [];
  doc.on("data", (c) => chunks.push(c));

  doc.fontSize(18).text("Monthly Financial Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Name: ${userName}`);
  doc.text(`Month: ${month}`);
  doc.moveDown();

  doc.text(`Total Income: $${stats.totalIncome}`);
  doc.text(`Total Expenses: $${stats.totalExpenses}`);
  doc.text(`Net Savings: $${stats.totalIncome - stats.totalExpenses}`);

  doc.moveDown();
  doc.text("Expenses by Category:");
  Object.entries(stats.byCategory).forEach(([cat, amt]) => {
    doc.text(`- ${cat}: $${amt}`);
  });

  doc.moveDown();
  doc.text("Wealth Insights:");
  insights.forEach((i) => doc.text(`• ${i}`));

  doc.end();

  return await new Promise((resolve) =>
    doc.on("end", () => resolve(Buffer.concat(chunks)))
  );
}
