
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DeviceStatusCardProps {
  title: string;
  total: number;
  online: number;
  offline: number;
  warning?: number;
  icon: React.ReactNode;
}

const DeviceStatusCard = ({
  title,
  total,
  online,
  offline,
  warning = 0,
  icon,
}: DeviceStatusCardProps) => {
  const onlinePercentage = total > 0 ? (online / total) * 100 : 0;
  const offlinePercentage = total > 0 ? (offline / total) * 100 : 0;
  const warningPercentage = total > 0 ? (warning / total) * 100 : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
        <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
          {total > 0 && (
            <>
              <div
                className="h-full bg-online"
                style={{ width: `${onlinePercentage}%`, float: "left" }}
              />
              <div
                className="h-full bg-warning"
                style={{ width: `${warningPercentage}%`, float: "left" }}
              />
              <div
                className="h-full bg-offline"
                style={{ width: `${offlinePercentage}%`, float: "left" }}
              />
            </>
          )}
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-online"></span>
            <span>{online} online</span>
          </div>
          {warning > 0 && (
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-warning"></span>
              <span>{warning} atenção</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-offline"></span>
            <span>{offline} offline</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceStatusCard;
