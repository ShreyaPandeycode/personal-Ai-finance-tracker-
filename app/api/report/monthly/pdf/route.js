import { NextResponse } from "next/server";
import { generateMonthlyPDF } from "@/lib/reports/generateMonthlyPDF";
import { db } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const userName = "Shreya Pandey"; // later from Clerk
  const month = new Date();

  const stats = {
    totalIncome: 40000,
    totalExpenses: 20000,
    byCategory: { entertainment: 20000 },
  };

  const pdf = await generateMonthlyPDF({
    userName,
    month: month.toLocaleString("default", { month: "long" }),
    stats,
    insights: [
      "Track expenses carefully",
      "Reduce unnecessary spending",
      "Set a monthly budget",
    ],
  });

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Monthly_Report.pdf",
    },
  });
}
