import { DocumentTable } from "./data-table";
import { useFetchUsers } from "@/hooks/use-users";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function Users() {
  const { isLoading, data } = useFetchUsers();

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Users</h1>
        <Button>+ Add Document</Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col p-5">
          <div className="border-b border-black dark:border-white">
            <Table>
              <TableBody>
                <TableRow className="border-b border-black dark:border-white">
                  <TableCell className="border-2 border-black dark:border-white text-center text-3xl">
                    Loading...
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <DocumentTable columns={columns} data={data ?? []} />
      )}
    </div>
  );
}
