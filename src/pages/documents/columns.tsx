import { ColumnDef } from "@tanstack/react-table";
import { Documents } from "@/lib/types";

export const columns: ColumnDef<Documents>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div className="text-center font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "document-reference",
    header: "Document Reference",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
