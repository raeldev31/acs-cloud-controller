
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import DeviceList from "@/components/DeviceList";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Filter, 
  ListFilter, 
  Router, 
  Wifi, 
  MonitorSmartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DeviceManagement = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Dispositivos</h1>
          <p className="text-muted-foreground">
            Gerencie e configure todos os dispositivos da rede
          </p>
        </div>
        <Button>
          <Filter size={16} className="mr-2" />
          Filtros Avançados
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all" className="relative">
              Todos
              <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 rounded-full">
                325
              </span>
            </TabsTrigger>
            <TabsTrigger value="routers">
              <Router size={16} className="mr-1" />
              Roteadores
              <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 rounded-full">
                156
              </span>
            </TabsTrigger>
            <TabsTrigger value="wifi">
              <Wifi size={16} className="mr-1" />
              Mesh WiFi
              <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 rounded-full">
                94
              </span>
            </TabsTrigger>
            <TabsTrigger value="other">
              <MonitorSmartphone size={16} className="mr-1" />
              Outros
              <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 rounded-full">
                75
              </span>
            </TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm">
            <ListFilter size={16} className="mr-2" />
            Agrupar por Cliente
          </Button>
        </div>

        <TabsContent value="all" className="mt-6">
          <DeviceList />
        </TabsContent>

        <TabsContent value="routers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Roteadores</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os roteadores da rede.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeviceList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wifi" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mesh WiFi</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os dispositivos Mesh WiFi da rede.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeviceList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Outros Dispositivos</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os outros tipos de dispositivos da rede.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeviceList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeviceManagement;
