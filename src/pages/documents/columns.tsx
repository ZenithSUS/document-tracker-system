import { ColumnDef } from "@tanstack/react-table";
import { Documents } from "@/lib/types";

export const columns: ColumnDef<Documents>[] = [
  {
    accessorKey: "Name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div className="text-center font-medium">{name}</div>;
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
