
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Search,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { tr069Service, TR069Device } from "@/services/tr069Service";
import { toast } from "@/hooks/use-toast";
import { AddDeviceDialog } from "./AddDeviceDialog";

const DeviceList = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [devices, setDevices] = useState<TR069Device[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar dispositivos quando o componente montar
  useEffect(() => {
    loadDevices();
  }, []);

  // Função para carregar dispositivos do serviço TR-069
  const loadDevices = async () => {
    setIsLoading(true);
    try {
      const loadedDevices = await tr069Service.getDevices();
      setDevices(loadedDevices);
    } catch (error) {
      console.error("Erro ao carregar dispositivos:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de dispositivos",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const filteredDevices = devices.filter(
    (device) =>
      device.id.toLowerCase().includes(search.toLowerCase()) ||
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      (device.customer && device.customer.toLowerCase().includes(search.toLowerCase())) ||
      device.ip.includes(search)
  );

  const sortedDevices = [...filteredDevices].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];

    if (!aValue || !bValue) return 0;

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Função para lidar com a reinicialização do dispositivo
  const handleRebootDevice = async (deviceId: string) => {
    try {
      await tr069Service.rebootDevice(deviceId);
    } catch (error) {
      console.error("Erro ao reiniciar dispositivo:", error);
    }
  };

  // Função para adicionar um novo dispositivo
  const handleDeviceAdded = (device: TR069Device) => {
    setDevices((prev) => [...prev, device]);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="outline" className="bg-online/10 text-online border-online">
            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-online"></span>
            Online
          </Badge>
        );
      case "offline":
        return (
          <Badge variant="outline" className="bg-offline/10 text-offline border-offline">
            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-offline"></span>
            Offline
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning">
            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-warning"></span>
            Atenção
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar dispositivo..."
              className="w-[300px] pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="h-9" 
            onClick={loadDevices}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? "Carregando..." : "Atualizar"}</span>
          </Button>
          <AddDeviceDialog onDeviceAdded={handleDeviceAdded} />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[200px] cursor-pointer"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  ID do Dispositivo
                  {sortBy === "id" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )
                  ) : null}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Nome
                  {sortBy === "name" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )
                  ) : null}
                </div>
              </TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status
                  {sortBy === "status" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )
                  ) : null}
                </div>
              </TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDevices.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="font-medium">
                  <Link
                    to={`/tr069?device=${device.id}`}
                    className="text-primary hover:underline"
                  >
                    {device.id}
                  </Link>
                </TableCell>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.ip}</TableCell>
                <TableCell>{device.model}</TableCell>
                <TableCell>{renderStatusBadge(device.status)}</TableCell>
                <TableCell>{device.customer || "-"}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => window.location.href = `/tr069?device=${device.id}`}>
                        Configurar
                      </DropdownMenuItem>
                      <DropdownMenuItem>Atualizar Firmware</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRebootDevice(device.id)}>
                        Reiniciar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredDevices.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-muted-foreground" />
                    <p className="text-lg font-medium">
                      {isLoading 
                        ? "Carregando dispositivos..." 
                        : "Nenhum dispositivo encontrado"
                      }
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {!isLoading && (
                        "Tente ajustar os filtros ou adicionar novos dispositivos."
                      )}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DeviceList;
