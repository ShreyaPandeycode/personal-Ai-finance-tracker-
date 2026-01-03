"use client";

import { Button } from "@/components/ui/button";

export function ReportDownloadButtons() {
  return (
    <div className="flex gap-4 mt-6">
      <Button
        variant="outline"
        onClick={() => window.open("/api/report/monthly/pdf")}
      >
        Download PDF
      </Button>

      <Button
        variant="outline"
        onClick={() => window.open("/api/report/monthly/excel")}
      >
        Download Excel
      </Button>
    </div>
  );
}
