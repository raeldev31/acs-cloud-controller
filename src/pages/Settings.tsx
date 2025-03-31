
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { 
  Server, 
  Shield, 
  Globe, 
  Users, 
  Wifi, 
  Clipboard, 
  RefreshCw,
  Save,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Schema de validação para o formulário do servidor ACS
const serverFormSchema = z.object({
  acsUrl: z
    .string()
    .url({ message: "URL do servidor ACS inválida" })
    .min(1, { message: "URL do servidor ACS é obrigatória" }),
  username: z
    .string()
    .min(1, { message: "Nome de usuário é obrigatório" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  port: z
    .string()
    .regex(/^\d+$/, { message: "A porta deve conter apenas números" })
    .refine((val) => {
      const port = parseInt(val);
      return port >= 1 && port <= 65535;
    }, { message: "A porta deve estar entre 1 e 65535" }),
  connectionRequestPath: z
    .string()
    .min(1, { message: "O caminho de requisição é obrigatório" }),
  informInterval: z
    .string()
    .regex(/^\d+$/, { message: "O intervalo deve conter apenas números" })
});

const Settings = () => {
  const [activeTab, setActiveTab] = useState("servidor");
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  // Formulário do servidor ACS
  const serverForm = useForm<z.infer<typeof serverFormSchema>>({
    resolver: zodResolver(serverFormSchema),
    defaultValues: {
      acsUrl: "https://acs.varzeainet.com.br",
      username: "admin",
      password: "",
      port: "9443",
      connectionRequestPath: "/acs",
      informInterval: "300",
    },
  });

  // Função para salvar as configurações do servidor
  const onServerSubmit = async (values: z.infer<typeof serverFormSchema>) => {
    setIsSaving(true);
    
    try {
      // Aqui você implementaria a lógica para salvar as configurações no backend
      console.log("Salvando configurações do servidor:", values);
      
      // Simulando um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Configurações salvas",
        description: "As configurações do servidor ACS foram salvas com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações do servidor.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Função para testar a conexão com o servidor ACS
  const testConnection = async () => {
    setIsTestingConnection(true);
    
    try {
      // Valores atuais do formulário
      const values = serverForm.getValues();
      
      // Aqui você implementaria a lógica para testar a conexão com o servidor ACS
      console.log("Testando conexão com o servidor:", values);
      
      // Simulando um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulando uma conexão bem-sucedida
      toast({
        title: "Conexão bem-sucedida",
        description: "A conexão com o servidor ACS foi estabelecida com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao testar conexão:", error);
      toast({
        variant: "destructive",
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor ACS. Verifique as configurações.",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Configurações do Sistema</h1>
          <p className="text-muted-foreground">
            Configure o servidor TR-069 e outros parâmetros do sistema
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="servidor"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="servidor">
            <Server className="h-4 w-4 mr-2" />
            Servidor ACS
          </TabsTrigger>
          <TabsTrigger value="seguranca">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="rede">
            <Globe className="h-4 w-4 mr-2" />
            Rede
          </TabsTrigger>
          <TabsTrigger value="usuarios">
            <Users className="h-4 w-4 mr-2" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="provisionamento">
            <Wifi className="h-4 w-4 mr-2" />
            Provisionamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="servidor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuração do Servidor TR-069</CardTitle>
              <CardDescription>
                Configure os parâmetros do servidor ACS (Auto Configuration Server) para gerenciar seus dispositivos TR-069.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...serverForm}>
                <form onSubmit={serverForm.handleSubmit(onServerSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={serverForm.control}
                      name="acsUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL do Servidor ACS</FormLabel>
                          <FormControl>
                            <Input placeholder="https://acs.exemplo.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            URL base do servidor ACS, sem porta ou caminho
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={serverForm.control}
                      name="port"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Porta</FormLabel>
                          <FormControl>
                            <Input placeholder="9443" {...field} />
                          </FormControl>
                          <FormDescription>
                            Porta padrão de comunicação do servidor ACS
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={serverForm.control}
                      name="connectionRequestPath"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Caminho de Requisição</FormLabel>
                          <FormControl>
                            <Input placeholder="/acs" {...field} />
                          </FormControl>
                          <FormDescription>
                            Caminho relativo para conexão ao ACS
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={serverForm.control}
                      name="informInterval"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Intervalo de Inform (segundos)</FormLabel>
                          <FormControl>
                            <Input placeholder="300" {...field} />
                          </FormControl>
                          <FormDescription>
                            Intervalo padrão para comunicação periódica entre CPEs e o servidor
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={serverForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome de Usuário</FormLabel>
                          <FormControl>
                            <Input placeholder="admin" {...field} />
                          </FormControl>
                          <FormDescription>
                            Nome de usuário de autenticação no servidor ACS
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={serverForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="********" {...field} />
                          </FormControl>
                          <FormDescription>
                            Senha de autenticação no servidor ACS
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="flex flex-col md:flex-row gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={testConnection}
                      disabled={isTestingConnection}
                    >
                      {isTestingConnection ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Testando conexão...
                        </>
                      ) : (
                        <>
                          <Clipboard className="h-4 w-4 mr-2" />
                          Testar Conexão
                        </>
                      )}
                    </Button>

                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Salvar Configurações
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="mt-4 p-4 border rounded bg-muted">
                    <h3 className="text-sm font-medium mb-2">Endereço ACS completo:</h3>
                    <code className="bg-background p-2 block rounded text-sm">
                      {`${serverForm.watch("acsUrl")}:${serverForm.watch("port")}${serverForm.watch("connectionRequestPath")}`}
                    </code>
                    <p className="text-xs text-muted-foreground mt-2">
                      Este é o endereço completo que deve ser configurado nos seus dispositivos CPE para conexão com o servidor ACS.
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status do Servidor</CardTitle>
              <CardDescription>
                Informações sobre o status atual do servidor ACS.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded">
                  <div className="text-sm font-medium text-muted-foreground">Dispositivos Conectados</div>
                  <div className="text-2xl font-bold">289</div>
                </div>
                
                <div className="p-4 border rounded">
                  <div className="text-sm font-medium text-muted-foreground">Último Backup</div>
                  <div className="text-2xl font-bold">3h atrás</div>
                </div>
                
                <div className="p-4 border rounded">
                  <div className="text-sm font-medium text-muted-foreground">Status do Servidor</div>
                  <div className="text-2xl font-bold text-green-500">Online</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Configure as opções de segurança do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                As configurações de segurança estarão disponíveis em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rede">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Rede</CardTitle>
              <CardDescription>
                Configure as opções de rede do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                As configurações de rede estarão disponíveis em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
              <CardDescription>
                Adicione, edite e remova usuários do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                O gerenciamento de usuários estará disponível em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="provisionamento">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Provisionamento</CardTitle>
              <CardDescription>
                Configure as opções de provisionamento automático de dispositivos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                As configurações de provisionamento estarão disponíveis em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
