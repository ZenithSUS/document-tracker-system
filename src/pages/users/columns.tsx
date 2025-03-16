import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/lib/types";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
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
