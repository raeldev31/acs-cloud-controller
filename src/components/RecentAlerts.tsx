
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  WifiOff,
  Thermometer,
  RefreshCw,
  PackageMinus,
} from "lucide-react";

// Mock data para alertas recentes
const recentAlerts = [
  {
    id: 1,
    device: "XBHQU23321002432",
    description: "Dispositivo offline",
    time: "5 minutos atrás",
    severity: "high",
    icon: <WifiOff size={16} />,
  },
  {
    id: 2,
    device: "XBHQU23321002433",
    description: "Temperatura elevada",
    time: "23 minutos atrás",
    severity: "medium",
    icon: <Thermometer size={16} />,
  },
  {
    id: 3,
    device: "XBHQU23321002435",
    description: "Reinício inesperado",
    time: "1 hora atrás",
    severity: "medium",
    icon: <RefreshCw size={16} />,
  },
  {
    id: 4,
    device: "XBHQU23321002436",
    description: "Perda de pacotes > 5%",
    time: "2 horas atrás",
    severity: "low",
    icon: <PackageMinus size={16} />,
  },
];

const RecentAlerts = () => {
  const renderSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
            Alta
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
            Média
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
            Baixa
          </Badge>
        );
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Alertas Recentes</CardTitle>
        <div className="bg-primary/10 p-2 rounded-full">
          <AlertCircle size={18} className="text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3">
              <div className="mt-1">
                <div className="bg-muted p-1.5 rounded-full">
                  {alert.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm">{alert.description}</p>
                  {renderSeverityBadge(alert.severity)}
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-muted-foreground">
                    {alert.device}
                  </p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAlerts;
