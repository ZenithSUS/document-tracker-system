import { DocumentsData } from "@/pages/dashboard/chart";
import { MonthlyUsage } from "@/pages/dashboard/monthly";
import DashboardBoxes from "@/pages/dashboard/components/dashboard-boxes";
import { useFetchUsers } from "@/hooks/use-users";
import { useFetchDocuments } from "@/hooks/use-documents";

export default function Dashboard() {
  const { isLoading: isLoadingUsers, data: users } = useFetchUsers();
  const { isLoading: isLoadingDocuments, data: documents } =
    useFetchDocuments();

  if (isLoadingUsers || isLoadingDocuments) {
    return <h1 className="text-4xl text-center font-bold p-3">Loading...</h1>;
  }

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      <DashboardBoxes users={users} documents={documents} />
      <div className="grid grid-cols-2 gap-4">
        <DocumentsData />
        <MonthlyUsage />
      </div>
    </div>
  );
}
