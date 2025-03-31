
import React from "react";
import { useLocation } from "react-router-dom";
import { Bell, Search, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const location = useLocation();
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/") return "Dashboard";
    if (path === "/devices") return "Gerenciamento de Dispositivos";
    if (path === "/tr069") return "Configuração TR-069";
    if (path === "/wifi") return "WiFi Mesh";
    if (path === "/firmware") return "Gerenciamento de Firmware";
    if (path === "/monitoring") return "Monitoramento";
    if (path === "/customers") return "Clientes";
    if (path === "/logs") return "Logs do Sistema";
    if (path === "/settings") return "Configurações";

    return "Várzea Net ACS";
  };

  return (
    <header className="h-16 px-6 border-b flex items-center justify-between bg-background">
      <h1 className="text-xl font-semibold">{getPageTitle()}</h1>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar dispositivos..."
            className="w-64 pl-9 bg-background"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={toggleTheme}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col gap-1">
                <span className="font-medium">Falha de conexão</span>
                <span className="text-sm text-muted-foreground">
                  Dispositivo XBHQU23321002432 offline há 5 minutos
                </span>
                <span className="text-xs text-muted-foreground">
                  5 minutos atrás
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col gap-1">
                <span className="font-medium">Atualização disponível</span>
                <span className="text-sm text-muted-foreground">
                  Nova versão de firmware disponível: v2.3.4
                </span>
                <span className="text-xs text-muted-foreground">
                  1 hora atrás
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                  AD
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
