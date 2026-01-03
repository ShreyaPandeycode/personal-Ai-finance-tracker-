import * as XLSX from "xlsx";

export function generateMonthlyExcel(stats, month) {
  const data = [
    ["Month", month],
    ["Total Income", stats.totalIncome],
    ["Total Expenses", stats.totalExpenses],
    ["Net Savings", stats.totalIncome - stats.totalExpenses],
    [],
    ["Category", "Amount"],
  ];

  Object.entries(stats.byCategory).forEach(([cat, amt]) => {
    data.push([cat, amt]);
  });

  const sheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "Monthly Report");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}
