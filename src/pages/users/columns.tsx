import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return <div className="text-center font-medium">{email}</div>;
    },
  },
  {
    accessorKey: "firstName",
    header: "FirstName",
  },
  {
    accessorKey: "middleName",
    header: "MiddleName",
  },
  {
    accessorKey: "lastName",
    header: "LastName",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
