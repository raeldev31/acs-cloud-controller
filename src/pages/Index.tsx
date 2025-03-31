
import { memo } from "react";
import { Router, Wifi, Box, AlertCircle } from "lucide-react";
import DeviceStatusCard from "@/components/DeviceStatusCard";
import DeviceList from "@/components/DeviceList";
import StatisticsChart from "@/components/StatisticsChart";
import RecentAlerts from "@/components/RecentAlerts";

// Memorizando os componentes para evitar re-renderizações desnecessárias
const MemoizedDeviceList = memo(DeviceList);
const MemoizedStatisticsChart = memo(StatisticsChart);
const MemoizedRecentAlerts = memo(RecentAlerts);

const Index = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DeviceStatusCard
          title="Total de Dispositivos"
          total={325}
          online={289}
          offline={36}
          icon={<Router size={18} className="text-primary" />}
        />
        <DeviceStatusCard
          title="Pontos WiFi"
          total={158}
          online={142}
          offline={10}
          warning={6}
          icon={<Wifi size={18} className="text-primary" />}
        />
        <DeviceStatusCard
          title="Atualizações de Firmware"
          total={48}
          online={48}
          offline={0}
          icon={<Box size={18} className="text-primary" />}
        />
        <DeviceStatusCard
          title="Alertas Ativos"
          total={18}
          online={0}
          offline={18}
          icon={<AlertCircle size={18} className="text-primary" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <MemoizedStatisticsChart title="Estatísticas de Rede" />
        <MemoizedRecentAlerts />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Dispositivos Recentes</h2>
        <MemoizedDeviceList />
      </div>
    </div>
  );
};

export default Index;
