import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  Shield,
  Network,
  Users,
  FileCode,
  Server
} from "lucide-react";
import { TR069ServerConfig } from "@/components/TR069ServerConfig";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("tr069");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Configure o sistema de acordo com suas necessidades
          </p>
        </div>
      </div>

      <Tabs defaultValue="tr069" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="tr069">
            <Server size={16} className="mr-2" />
            TR-069
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield size={16} className="mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="network">
            <Network size={16} className="mr-2" />
            Rede
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users size={16} className="mr-2" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="provisioning">
            <FileCode size={16} className="mr-2" />
            Provisionamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tr069" className="space-y-6">
          <TR069ServerConfig />
          
          {/* Outras seções de configuração do TR-069 poderiam ser adicionadas aqui */}
        </TabsContent>

        <TabsContent value="security">
          <div className="text-center py-12">
            <Shield size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Configurações de Segurança
            </h3>
            <p className="text-muted-foreground mb-6">
              Esta seção será implementada em breve
            </p>
          </div>
        </TabsContent>

        <TabsContent value="network">
          <div className="text-center py-12">
            <Network size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Configurações de Rede
            </h3>
            <p className="text-muted-foreground mb-6">
              Esta seção será implementada em breve
            </p>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Gerenciamento de Usuários
            </h3>
            <p className="text-muted-foreground mb-6">
              Esta seção será implementada em breve
            </p>
          </div>
        </TabsContent>

        <TabsContent value="provisioning">
          <div className="text-center py-12">
            <FileCode size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Configurações de Provisionamento
            </h3>
            <p className="text-muted-foreground mb-6">
              Esta seção será implementada em breve
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
