
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wifi, Loader2 } from "lucide-react";
import { TR069Device, tr069Service } from "@/services/tr069Service";
import { toast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const deviceSchema = z.object({
  serialNumber: z.string().min(5, {
    message: "O número de série deve ter pelo menos 5 caracteres",
  }),
  macAddress: z.string().regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, {
    message: "Endereço MAC inválido. Formato: XX:XX:XX:XX:XX:XX",
  }),
  model: z.string().min(2, {
    message: "O modelo deve ter pelo menos 2 caracteres",
  }),
});

type DeviceFormValues = z.infer<typeof deviceSchema>;

interface AddDeviceDialogProps {
  onDeviceAdded?: (device: TR069Device) => void;
}

export function AddDeviceDialog({ onDeviceAdded }: AddDeviceDialogProps) {
  const [open, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const form = useForm<DeviceFormValues>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      serialNumber: "",
      macAddress: "",
      model: "ZTE F670L",
    },
  });

  async function onSubmit(data: DeviceFormValues) {
    setIsAdding(true);
    try {
      const device = await tr069Service.addDevice(
        data.serialNumber,
        data.macAddress,
        data.model
      );
      
      if (device) {
        if (onDeviceAdded) onDeviceAdded(device);
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      console.error("Erro ao adicionar dispositivo:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o dispositivo",
        variant: "destructive"
      });
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9">
          <Wifi size={16} className="mr-2" />
          <span>Adicionar Dispositivo</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Dispositivo</DialogTitle>
          <DialogDescription>
            Insira os detalhes do dispositivo TR-069 para adicioná-lo ao servidor ACS.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Série</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: ZTE12345678" {...field} />
                  </FormControl>
                  <FormDescription>
                    Número de série único do dispositivo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="macAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço MAC</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: AA:BB:CC:DD:EE:FF" {...field} />
                  </FormControl>
                  <FormDescription>
                    Endereço MAC do dispositivo no formato XX:XX:XX:XX:XX:XX.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o modelo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ZTE F670L">ZTE F670L</SelectItem>
                      <SelectItem value="Huawei HG8245H">Huawei HG8245H</SelectItem>
                      <SelectItem value="TP-Link AC1200">TP-Link AC1200</SelectItem>
                      <SelectItem value="Intelbras W5S">Intelbras W5S</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecione o modelo do dispositivo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isAdding}>
                {isAdding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Adicionar Dispositivo
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
