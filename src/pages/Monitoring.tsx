
import { useState } from "react";
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
  Activity,
  AlertTriangle,
  BarChart3,
  Clock,
  Download,
  FileText,
  Network,
  Pencil,
  RefreshCw,
  Router,
  Search,
  Server,
  Settings,
  Wifi,
} from "lucide-react";
import { Label } from "@/components/ui/label";

const Monitoring = () => {
  const [selectedDevice, setSelectedDevice] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Monitoramento de Rede</h1>
          <p className="text-muted-foreground">
            Monitore dispositivos e desempenho da rede em tempo real
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Settings size={16} className="mr-2" />
            Configurações
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Dispositivos Offline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold mr-2">12</div>
              <div className="text-xs text-red-500 flex items-center">
                <AlertTriangle size={14} className="mr-1" />
                +3 desde ontem
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Última verificação: 2 minutos atrás
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Utilização média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold mr-2">45%</div>
              <div className="text-xs text-green-500 flex items-center">
                <Activity size={14} className="mr-1" />
                Estável
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Em 325 dispositivos ativos
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Velocidade média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold mr-2">98.2</div>
              <div className="text-2xl font-normal">Mbps</div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Download: 98.2 Mbps / Upload: 45.3 Mbps
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Alertas ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold mr-2">18</div>
              <div className="text-xs text-amber-500 flex items-center">
                <AlertTriangle size={14} className="mr-1" />
                4 críticos
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Última atualização: há 5 minutos
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Desempenho da Rede</CardTitle>
            <CardDescription>
              Visualização das métricas de desempenho das últimas 24 horas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-md p-6 bg-muted/20">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart3 size={48} className="mb-2" />
                <p>Gráfico de métricas de rede</p>
                <p className="text-sm">Dados de tráfego, latência e perda de pacotes</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="p-3 border rounded-md text-center">
                <div className="text-xl font-bold">245GB</div>
                <div className="text-xs text-muted-foreground">Tráfego Total</div>
              </div>
              <div className="p-3 border rounded-md text-center">
                <div className="text-xl font-bold">15ms</div>
                <div className="text-xs text-muted-foreground">Latência Média</div>
              </div>
              <div className="p-3 border rounded-md text-center">
                <div className="text-xl font-bold">0.2%</div>
                <div className="text-xs text-muted-foreground">Perda de Pacotes</div>
              </div>
              <div className="p-3 border rounded-md text-center">
                <div className="text-xl font-bold">3.2k</div>
                <div className="text-xs text-muted-foreground">Conexões Ativas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Alertas Recentes</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-3 pb-3">
                <div className="flex justify-between items-start">
                  <div className="font-medium">Dispositivo offline</div>
                  <div className="text-xs text-muted-foreground">5min atrás</div>
                </div>
                <div className="text-sm mt-1">
                  XBHQU23321002432 - Sem resposta há 5 minutos
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Verificar
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Ignorar
                  </Button>
                </div>
              </div>

              <div className="border-l-4 border-amber-500 pl-3 pb-3">
                <div className="flex justify-between items-start">
                  <div className="font-medium">CPU alta</div>
                  <div className="text-xs text-muted-foreground">18min atrás</div>
                </div>
                <div className="text-sm mt-1">
                  Servidor ACS com utilização de CPU acima de 85%
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Verificar
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Ignorar
                  </Button>
                </div>
              </div>

              <div className="border-l-4 border-amber-500 pl-3 pb-3">
                <div className="flex justify-between items-start">
                  <div className="font-medium">Falha de autenticação</div>
                  <div className="text-xs text-muted-foreground">32min atrás</div>
                </div>
                <div className="text-sm mt-1">
                  Múltiplas tentativas de login malsucedidas (10+)
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Verificar
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Ignorar
                  </Button>
                </div>
              </div>

              <Button variant="ghost" size="sm" className="w-full text-xs">
                Ver todos os alertas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <CardTitle>Dispositivos Monitorados</CardTitle>
                <CardDescription>
                  Status de todos os dispositivos na rede
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar dispositivos..."
                    className="pl-9 h-9"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      <SelectItem value="router">Roteadores</SelectItem>
                      <SelectItem value="ont">ONTs</SelectItem>
                      <SelectItem value="wifi">Access Points</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Tabs defaultValue="all" className="mt-2">
              <TabsList>
                <TabsTrigger value="all">Todos (325)</TabsTrigger>
                <TabsTrigger value="online">Online (289)</TabsTrigger>
                <TabsTrigger value="warning">Atenção (18)</TabsTrigger>
                <TabsTrigger value="offline">Offline (18)</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dispositivo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>CPU</TableHead>
                    <TableHead>RAM</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      XBHQU23321002432
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Router size={14} className="mr-2" />
                        Roteador
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-online mr-2" />
                        Online
                      </div>
                    </TableCell>
                    <TableCell>192.168.1.1</TableCell>
                    <TableCell>3d 7h 15m</TableCell>
                    <TableCell>23%</TableCell>
                    <TableCell>45%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      XBHQU23321002435
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Server size={14} className="mr-2" />
                        ONT
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-online mr-2" />
                        Online
                      </div>
                    </TableCell>
                    <TableCell>192.168.1.2</TableCell>
                    <TableCell>5d 12h 32m</TableCell>
                    <TableCell>18%</TableCell>
                    <TableCell>32%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      XBHQU23321002436
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Wifi size={14} className="mr-2" />
                        Access Point
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-warning mr-2" />
                        Atenção
                      </div>
                    </TableCell>
                    <TableCell>192.168.1.3</TableCell>
                    <TableCell>1d 3h 45m</TableCell>
                    <TableCell>72%</TableCell>
                    <TableCell>65%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      XBHQU23321002437
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Router size={14} className="mr-2" />
                        Roteador
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-offline mr-2" />
                        Offline
                      </div>
                    </TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      XBHQU23321002438
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Network size={14} className="mr-2" />
                        Switch
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-online mr-2" />
                        Online
                      </div>
                    </TableCell>
                    <TableCell>192.168.1.5</TableCell>
                    <TableCell>12d 4h 18m</TableCell>
                    <TableCell>12%</TableCell>
                    <TableCell>28%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Mostrando 5 de 325 dispositivos
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Monitoring;
