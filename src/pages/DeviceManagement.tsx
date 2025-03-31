
import DeviceList from "@/components/DeviceList";

const DeviceManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Dispositivos</h1>
          <p className="text-muted-foreground">
            Adicione, monitore e configure os dispositivos da sua rede
          </p>
        </div>
      </div>

      <DeviceList />
    </div>
  );
};

export default DeviceManagement;
