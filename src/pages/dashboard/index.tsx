import { DocumentsData } from "@/pages/dashboard/chart";
import { MonthlyUsage } from "@/pages/dashboard/monthly";
import DashboardBoxes from "@/pages/dashboard/components/dashboard-boxes";
import { useFetchUsers } from "@/hooks/use-users";

export default function Dashboard() {
  const { isLoading, data } = useFetchUsers();

  if (isLoading) {
    return <h1 className="text-4xl text-center font-bold p-3">Loading...</h1>;
  }

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      <DashboardBoxes users={data} />
      <div className="grid grid-cols-2 gap-4">
        <DocumentsData />
        <MonthlyUsage />
      </div>
    </div>
  );
}
