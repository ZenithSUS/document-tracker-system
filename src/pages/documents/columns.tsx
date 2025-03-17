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
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div
          className={
            status === "Active"
              ? "text-green-800 bg-green-100"
              : status === "Inactive" && "text-red-800 bg-red-100"
              ? "text-red-800 bg-red-100"
              : "text-yellow-800 bg-yellow-100"
          }
        >
          {status}
        </div>
      );
    },
  },
];
