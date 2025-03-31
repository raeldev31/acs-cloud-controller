
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { ACSConfig, tr069Service } from "@/services/tr069Service";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const acsConfigSchema = z.object({
  url: z.string().url({
    message: "URL inválida. Deve incluir o protocolo (http:// ou https://)",
  }),
  port: z.coerce.number().int().min(1).max(65535),
  username: z.string().min(1, {
    message: "Nome de usuário é obrigatório",
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatória",
  }),
  informInterval: z.coerce.number().int().min(30).max(86400),
  connectionRequestAllowed: z.boolean(),
});

type ACSFormValues = z.infer<typeof acsConfigSchema>;

export function TR069ServerConfig() {
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Carregar configuração do ACS
  const acsConfig = tr069Service.getACSConfig();
  
  const form = useForm<ACSFormValues>({
    resolver: zodResolver(acsConfigSchema),
    defaultValues: {
      url: acsConfig.url,
      port: acsConfig.port,
      username: acsConfig.username,
      password: acsConfig.password,
      informInterval: acsConfig.informInterval,
      connectionRequestAllowed: acsConfig.connectionRequestAllowed,
    },
  });

  async function onSubmit(data: ACSFormValues) {
    setIsSaving(true);
    try {
      await tr069Service.saveACSConfig(data);
      // Não precisamos redefinir o formulário pois queremos manter os valores
    } finally {
      setIsSaving(false);
    }
  }

  async function testConnection() {
    setIsTesting(true);
    try {
      const formData = form.getValues();
      await tr069Service.testConnection(formData);
    } finally {
      setIsTesting(false);
    }
  }

  // Valor completo do endereço ACS para exibição
  const fullACSAddress = `${form.watch('url')}:${form.watch('port')}/acs`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuração do Servidor ACS</CardTitle>
        <CardDescription>
          Configure os parâmetros de conexão com o servidor TR-069 ACS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL do Servidor ACS</FormLabel>
                    <FormControl>
                      <Input placeholder="https://acs.exemplo.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      URL base do servidor ACS (com protocolo)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="port"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Porta do Servidor ACS</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Porta de comunicação do servidor ACS (normalmente 9443)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário do ACS</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Nome de usuário para autenticação no servidor ACS
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha do ACS</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Senha para autenticação no servidor ACS
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="informInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intervalo de Inform (segundos)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Frequência com que os dispositivos se comunicam com o ACS (mínimo 30s)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="connectionRequestAllowed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Permitir Solicitação de Conexão</FormLabel>
                      <FormDescription>
                        Permite que o ACS inicie conexões com os dispositivos
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="p-4 border rounded-md bg-secondary/20">
              <h3 className="font-medium mb-2">Endereço ACS Completo</h3>
              <p className="text-sm font-mono break-all">{fullACSAddress}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Este é o endereço que deve ser configurado nos dispositivos TR-069
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={testConnection}
                disabled={isTesting || isSaving}
              >
                {isTesting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Testar Conexão
              </Button>
              <Button 
                type="submit"
                disabled={isSaving || isTesting}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Configurações
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
