import { Users, BookA, BookCopy, Activity } from "lucide-react";
import DashboardBox from "./dashboard-box";

type BoxData = {
  id: string;
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
};

export default function DashboardBoxes() {
  const boxesData: BoxData[] = [
    {
      id: "users",
      title: "Total Users",
      value: 10542,
      icon: <Users className="h-4 w-4" />,
      description: "Active users on your platform",
    },
    {
      id: "documents",
      title: "Total Documents",
      value: 3245,
      icon: <BookA className="h-4 w-4" />,
      description: "Documents Monitored",
    },
    {
      id: "types",
      title: "Total Types",
      value: 53,
      icon: <BookCopy className="h-4 w-4" />,
      description: "Total Document Types",
    },
    {
      id: "active",
      title: "Active Now",
      value: 573,
      icon: <Activity className="h-4 w-4" />,
      description: "Users currently online",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {boxesData.map((box) => (
        <DashboardBox
          key={box.id}
          title={box.title}
          value={box.value}
          icon={box.icon}
          description={box.description}
        />
      ))}
    </div>
  );
}
