import { UserTable } from "./data-table";
import { useFetchUsers } from "@/hooks/use-users";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";

export default function Users() {
  const { isLoading, data } = useFetchUsers();

  if (isLoading) {
    return <h1 className="font-bold text-4xl text-center p-5">Loading...</h1>;
  }

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Users</h1>
        <Button>+ Add User</Button>
      </div>
      <UserTable columns={columns} data={data ?? []} />
    </div>
  );
}
