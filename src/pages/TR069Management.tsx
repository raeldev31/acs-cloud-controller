
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Settings,
  Server,
  Network,
  Wifi,
  RefreshCw,
  Upload,
  Download,
  FileCode,
  Clock,
  Loader2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { tr069Service, TR069Device } from "@/services/tr069Service";
import { toast } from "@/hooks/use-toast";

const TR069Management = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const deviceIdFromUrl = searchParams.get('device');
  
  const [selectedDevice, setSelectedDevice] = useState<string>(deviceIdFromUrl || "");
  const [deviceDetails, setDeviceDetails] = useState<TR069Device | null>(null);
  const [devices, setDevices] = useState<TR069Device[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceLogs, setDeviceLogs] = useState<string[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [deviceSearch, setDeviceSearch] = useState("");

  // Carregar lista de dispositivos quando o componente montar
  useEffect(() => {
    loadDevices();
  }, []);

  // Carregar detalhes do dispositivo quando selecionar um dispositivo
  useEffect(() => {
    if (selectedDevice) {
      loadDeviceDetails(selectedDevice);
      // Atualizar a URL
      setSearchParams({ device: selectedDevice });
    }
  }, [selectedDevice]);

  // Funções para carregar dados
  const loadDevices = async () => {
    setIsLoading(true);
    try {
      const loadedDevices = await tr069Service.getDevices();
      setDevices(loadedDevices);
      
      // Se tem um dispositivo na URL e ele ainda não foi carregado
      if (deviceIdFromUrl && !deviceDetails) {
        loadDeviceDetails(deviceIdFromUrl);
      }
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

  const loadDeviceDetails = async (deviceId: string) => {
    setIsLoading(true);
    try {
      const device = await tr069Service.getDeviceById(deviceId);
      setDeviceDetails(device);
      
      // Carregar logs do dispositivo
      loadDeviceLogs(deviceId);
    } catch (error) {
      console.error("Erro ao carregar detalhes do dispositivo:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os detalhes do dispositivo",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadDeviceLogs = async (deviceId: string) => {
    setIsLoadingLogs(true);
    try {
      const logs = await tr069Service.getDeviceLogs(deviceId);
      setDeviceLogs(logs);
    } catch (error) {
      console.error("Erro ao carregar logs do dispositivo:", error);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  // Funções para interagir com o dispositivo
  const handleRebootDevice = async () => {
    if (!selectedDevice) return;
    
    try {
      await tr069Service.rebootDevice(selectedDevice);
    } catch (error) {
      console.error("Erro ao reiniciar dispositivo:", error);
    }
  };

  // Função para salvar configurações do dispositivo
  const handleSaveSettings = async (tab: string) => {
    if (!selectedDevice || !deviceDetails) return;
    
    // Simulando salvamento de configurações
    toast({
      title: "Configurações salvas",
      description: `As configurações de ${tab} foram salvas com sucesso`,
    });
  };

  // Filtragem de dispositivos
  const filteredDevices = devices.filter(device => 
    device.id.toLowerCase().includes(deviceSearch.toLowerCase()) || 
    device.name.toLowerCase().includes(deviceSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento TR-069</h1>
          <p className="text-muted-foreground">
            Configure e gerencie dispositivos utilizando o protocolo TR-069
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Dispositivo</CardTitle>
            <CardDescription>
              Selecione o dispositivo para configurar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="device-search">Buscar dispositivo</Label>
                <div className="relative">
                  <Input
                    id="device-search"
                    placeholder="Buscar por ID ou nome..."
                    className="w-full"
                    value={deviceSearch}
                    onChange={(e) => setDeviceSearch(e.target.value)}
                  />
                </div>
              </div>

              <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um dispositivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Dispositivos Online</SelectLabel>
                    {filteredDevices
                      .filter(device => device.status === "online")
                      .map(device => (
                        <SelectItem key={device.id} value={device.id}>
                          {device.id} - {device.name}
                        </SelectItem>
                      ))
                    }
                    
                    <SelectLabel className="mt-2">Outros Dispositivos</SelectLabel>
                    {filteredDevices
                      .filter(device => device.status !== "online")
                      .map(device => (
                        <SelectItem key={device.id} value={device.id}>
                          {device.id} - {device.name}
                        </SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                className="w-full" 
                onClick={loadDevices}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <RefreshCw size={16} className="mr-2" />
                )}
                Atualizar Lista
              </Button>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Server size={16} />
                  <span className="font-medium">Ações do Dispositivo</span>
                </div>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleRebootDevice}
                    disabled={!selectedDevice || isLoading}
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Reiniciar Dispositivo
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled={!selectedDevice || isLoading}
                  >
                    <FileCode size={16} className="mr-2" />
                    Baixar Configuração
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled={!selectedDevice || isLoading}
                  >
                    <Upload size={16} className="mr-2" />
                    Atualizar Firmware
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled={!selectedDevice || isLoading}
                  >
                    <Clock size={16} className="mr-2" />
                    Agendar Tarefas
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Configuração TR-069</CardTitle>
            <CardDescription>
              {deviceDetails
                ? `Configurando dispositivo: ${deviceDetails.id} (${deviceDetails.name})`
                : "Selecione um dispositivo para iniciar a configuração"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-lg">Carregando configurações...</span>
              </div>
            ) : deviceDetails ? (
              <Tabs defaultValue="general">
                <TabsList className="mb-4">
                  <TabsTrigger value="general">
                    <Settings size={16} className="mr-2" />
                    Geral
                  </TabsTrigger>
                  <TabsTrigger value="wan">
                    <Network size={16} className="mr-2" />
                    WAN
                  </TabsTrigger>
                  <TabsTrigger value="wifi">
                    <Wifi size={16} className="mr-2" />
                    WiFi
                  </TabsTrigger>
                  <TabsTrigger value="diagnostics">
                    <Server size={16} className="mr-2" />
                    Diagnósticos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="device-name">Nome do Dispositivo</Label>
                        <Input
                          id="device-name"
                          defaultValue={deviceDetails.name}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="device-location">Localização</Label>
                        <Input
                          id="device-location"
                          defaultValue="Sala de Estar"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="admin-password">
                          Senha de Administrador
                        </Label>
                        <Input
                          id="admin-password"
                          type="password"
                          defaultValue="********"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="access-control">
                          Controle de Acesso
                        </Label>
                        <Select defaultValue="admin-only">
                          <SelectTrigger id="access-control">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin-only">
                              Apenas Administrador
                            </SelectItem>
                            <SelectItem value="user-limited">
                              Usuário Limitado
                            </SelectItem>
                            <SelectItem value="public">Público</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-medium">Servidor ACS</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="acs-url">URL do Servidor ACS</Label>
                          <Input
                            id="acs-url"
                            defaultValue={deviceDetails.parameters?.["Device.ManagementServer.URL"] || "https://acs.varzeainet.com.br:9443/acs"}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="acs-username">
                            Usuário do Servidor ACS
                          </Label>
                          <Input 
                            id="acs-username" 
                            defaultValue={deviceDetails.parameters?.["Device.ManagementServer.Username"] || "varzea-acs"} 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="acs-password">
                            Senha do Servidor ACS
                          </Label>
                          <Input
                            id="acs-password"
                            type="password"
                            defaultValue="********"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="inform-interval">
                            Intervalo de Inform (segundos)
                          </Label>
                          <Input 
                            id="inform-interval" 
                            defaultValue={deviceDetails.parameters?.["Device.ManagementServer.PeriodicInformInterval"] || "300"} 
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <Checkbox id="conn-req" defaultChecked />
                        <Label htmlFor="conn-req">
                          Permitir Conexão Requerida
                        </Label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button onClick={() => handleSaveSettings('geral')}>
                        Salvar Configurações
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="wan">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="wan-mode">Modo de Conexão WAN</Label>
                        <Select defaultValue="pppoe">
                          <SelectTrigger id="wan-mode">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dhcp">DHCP (IPoE)</SelectItem>
                            <SelectItem value="pppoe">PPPoE</SelectItem>
                            <SelectItem value="static">IP Estático</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="wan-vlan">VLAN ID</Label>
                        <Input id="wan-vlan" defaultValue="100" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pppoe-username">Usuário PPPoE</Label>
                        <Input id="pppoe-username" defaultValue="cliente123" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pppoe-password">Senha PPPoE</Label>
                        <Input
                          id="pppoe-password"
                          type="password"
                          defaultValue="********"
                        />
                      </div>
                    </div>

                    <Separator />

                    <h3 className="font-medium">Estatísticas WAN</h3>

                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Parâmetro</TableHead>
                            <TableHead>Valor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              Status da Conexão
                            </TableCell>
                            <TableCell className="text-green-600">
                              Conectado
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Endereço IP
                            </TableCell>
                            <TableCell>{deviceDetails.ip || "N/A"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Máscara de Rede
                            </TableCell>
                            <TableCell>255.255.255.0</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Gateway</TableCell>
                            <TableCell>{deviceDetails.ip?.replace(/\d+$/, '1') || "N/A"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Servidor DNS Primário
                            </TableCell>
                            <TableCell>8.8.8.8</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Tempo de Conexão
                            </TableCell>
                            <TableCell>3 dias, 7 horas, 25 minutos</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button onClick={() => handleSaveSettings('wan')}>
                        Salvar Configurações
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="wifi">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-medium">WiFi 2.4 GHz</h3>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="enabled-2g" defaultChecked />
                            <Label htmlFor="enabled-2g">Ativado</Label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ssid-2g">Nome da Rede (SSID)</Label>
                          <Input id="ssid-2g" defaultValue="VarzeaNet_2G" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="security-2g">Segurança</Label>
                          <Select defaultValue="wpa2">
                            <SelectTrigger id="security-2g">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">Aberta</SelectItem>
                              <SelectItem value="wpa">WPA</SelectItem>
                              <SelectItem value="wpa2">WPA2</SelectItem>
                              <SelectItem value="wpa3">WPA3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password-2g">Senha</Label>
                          <Input
                            id="password-2g"
                            type="password"
                            defaultValue="********"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="channel-2g">Canal</Label>
                          <Select defaultValue="auto">
                            <SelectTrigger id="channel-2g">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Automático</SelectItem>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="6">6</SelectItem>
                              <SelectItem value="11">11</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-medium">WiFi 5 GHz</h3>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="enabled-5g" defaultChecked />
                            <Label htmlFor="enabled-5g">Ativado</Label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ssid-5g">Nome da Rede (SSID)</Label>
                          <Input id="ssid-5g" defaultValue="VarzeaNet_5G" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="security-5g">Segurança</Label>
                          <Select defaultValue="wpa2">
                            <SelectTrigger id="security-5g">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">Aberta</SelectItem>
                              <SelectItem value="wpa">WPA</SelectItem>
                              <SelectItem value="wpa2">WPA2</SelectItem>
                              <SelectItem value="wpa3">WPA3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password-5g">Senha</Label>
                          <Input
                            id="password-5g"
                            type="password"
                            defaultValue="********"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="channel-5g">Canal</Label>
                          <Select defaultValue="auto">
                            <SelectTrigger id="channel-5g">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Automático</SelectItem>
                              <SelectItem value="36">36</SelectItem>
                              <SelectItem value="40">40</SelectItem>
                              <SelectItem value="44">44</SelectItem>
                              <SelectItem value="48">48</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <h3 className="font-medium">Dispositivos Conectados via WiFi</h3>

                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Dispositivo</TableHead>
                            <TableHead>MAC</TableHead>
                            <TableHead>Endereço IP</TableHead>
                            <TableHead>Banda</TableHead>
                            <TableHead>Sinal</TableHead>
                            <TableHead>Tempo de Conexão</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Smartphone Samsung</TableCell>
                            <TableCell>AA:BB:CC:DD:EE:FF</TableCell>
                            <TableCell>192.168.1.101</TableCell>
                            <TableCell>5 GHz</TableCell>
                            <TableCell>Excelente</TableCell>
                            <TableCell>2h 15m</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Notebook Dell</TableCell>
                            <TableCell>11:22:33:44:55:66</TableCell>
                            <TableCell>192.168.1.102</TableCell>
                            <TableCell>5 GHz</TableCell>
                            <TableCell>Bom</TableCell>
                            <TableCell>1h 45m</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>TV Samsung</TableCell>
                            <TableCell>AA:11:BB:22:CC:33</TableCell>
                            <TableCell>192.168.1.103</TableCell>
                            <TableCell>2.4 GHz</TableCell>
                            <TableCell>Médio</TableCell>
                            <TableCell>5h 30m</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button onClick={() => handleSaveSettings('wifi')}>
                        Salvar Configurações
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="diagnostics">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Ping Test</CardTitle>
                          <CardDescription>
                            Verifique a conectividade com um servidor
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="ping-host">Host</Label>
                              <Input id="ping-host" defaultValue="google.com" />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="ping-count">Contagem</Label>
                              <Input id="ping-count" defaultValue="4" />
                            </div>

                            <Button className="w-full">Iniciar Teste</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Traceroute</CardTitle>
                          <CardDescription>
                            Rastreie o caminho até um servidor
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="trace-host">Host</Label>
                              <Input id="trace-host" defaultValue="google.com" />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="trace-hops">Máximo de Hops</Label>
                              <Input id="trace-hops" defaultValue="30" />
                            </div>

                            <Button className="w-full">Iniciar Teste</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="md:col-span-2">
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <div>
                              <CardTitle className="text-base">
                                Logs do Dispositivo
                              </CardTitle>
                              <CardDescription>
                                Visualize os logs do dispositivo para diagnóstico
                              </CardDescription>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => loadDeviceLogs(selectedDevice)}
                              disabled={isLoadingLogs}
                            >
                              <RefreshCw 
                                size={16} 
                                className={`mr-2 ${isLoadingLogs ? 'animate-spin' : ''}`} 
                              />
                              Atualizar
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="bg-muted p-4 rounded-md h-[300px] overflow-y-auto font-mono text-xs">
                              <div className="space-y-1">
                                {isLoadingLogs ? (
                                  <div className="flex justify-center items-center h-full">
                                    <Loader2 className="animate-spin mr-2" />
                                    <span>Carregando logs...</span>
                                  </div>
                                ) : deviceLogs.length > 0 ? (
                                  deviceLogs.map((log, index) => (
                                    <p key={index}>
                                      <span className="text-muted-foreground mr-2">
                                        {log.split(']')[0]}]
                                      </span>
                                      {log.split(']')[1]}
                                    </p>
                                  ))
                                ) : (
                                  <div className="text-center text-muted-foreground">
                                    Nenhum log disponível
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button variant="outline">
                                <Download size={16} className="mr-2" />
                                Baixar Logs
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <Server size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Nenhum dispositivo selecionado
                </h3>
                <p className="text-muted-foreground mb-6">
                  Por favor, selecione um dispositivo para configurar
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TR069Management;
