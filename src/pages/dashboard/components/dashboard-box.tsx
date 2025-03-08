import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardBoxProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
}

export default function DashboardBox({
  title,
  value,
  icon,
  description,
}: DashboardBoxProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
