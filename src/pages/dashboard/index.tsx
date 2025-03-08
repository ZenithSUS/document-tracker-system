import { DocumentsData } from "@/pages/dashboard/chart";
import { MonthlyUsage } from "@/pages/dashboard/monthly";
import DashboardBoxes from "@/pages/dashboard/components/dashboard-boxes";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      <DashboardBoxes />
      <div className="grid grid-cols-2 gap-4">
        <DocumentsData />
        <MonthlyUsage />
      </div>
    </div>
  );
}
