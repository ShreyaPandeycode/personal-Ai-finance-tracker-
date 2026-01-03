import { db } from "@/lib/prisma";

export async function getMonthlyReportData(userId, monthDate) {
  // 1️⃣ Date range for the month
  const startDate = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth(),
    1
  );
  const endDate = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0
  );

  // 2️⃣ Fetch transactions ONCE
  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  // 3️⃣ Calculate totals
  let totalIncome = 0;
  let totalExpense = 0;
  const categoryBreakdown = {};

  for (const t of transactions) {
    const amount = t.amount.toNumber();

    if (t.type === "EXPENSE") {
      totalExpense += amount;
      categoryBreakdown[t.category] =
        (categoryBreakdown[t.category] || 0) + amount;
    } else {
      totalIncome += amount;
    }
  }

  // 4️⃣ Savings
  const savings = totalIncome - totalExpense;

  // 5️⃣ Top 5 transactions (optional but useful)
  const topTransactions = [...transactions]
    .sort((a, b) => b.amount.toNumber() - a.amount.toNumber())
    .slice(0, 5);

  // 6️⃣ Final structured report
  return {
    month: monthDate.toLocaleString("default", { month: "long" }),
    totalIncome,
    totalExpense,
    savings,
    categoryBreakdown,
    topTransactions,
    transactions,
  };
}
