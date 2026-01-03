import { generateMonthlyExcel } from "@/lib/reports/generateMonthlyExcel";

export const runtime = "nodejs";

export async function GET() {
  const stats = {
    totalIncome: 40000,
    totalExpenses: 20000,
    byCategory: { entertainment: 20000 },
  };

  const excel = generateMonthlyExcel(stats, "October");

  return new Response(excel, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=Monthly_Report.xlsx",
    },
  });
}
