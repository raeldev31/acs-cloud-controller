
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Cpu,
  LayoutDashboard,
  Router,
  Wifi,
  Box,
  Activity,
  Settings,
  FileCode,
  Users,
  HardDrive,
  BadgeHelp,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  isActive: boolean;
}

const SidebarItem = ({ icon, text, to, isActive }: SidebarItemProps) => {
  return (
    <Link to={to}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        size="sm"
        className={cn(
          "w-full justify-start gap-2 mb-1",
          isActive ? "bg-primary/10" : "hover:bg-primary/5"
        )}
      >
        {icon}
        <span>{text}</span>
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, text: "Dashboard", to: "/" },
    { icon: <Cpu size={18} />, text: "Dispositivos", to: "/devices" },
    { icon: <Router size={18} />, text: "Gerenciamento TR-069", to: "/tr069" },
    { icon: <Wifi size={18} />, text: "WiFi Mesh", to: "/wifi" },
    { icon: <Box size={18} />, text: "Firmware", to: "/firmware" },
    { icon: <Activity size={18} />, text: "Monitoramento", to: "/monitoring" },
    { icon: <Users size={18} />, text: "Clientes", to: "/customers" },
    { icon: <FileCode size={18} />, text: "Logs", to: "/logs" },
    { icon: <Settings size={18} />, text: "Configurações", to: "/settings" },
  ];

  return (
    <div className="min-h-screen w-64 bg-background border-r p-4 flex flex-col">
      <div className="flex items-center justify-center py-6">
        <h1 className="text-2xl font-bold text-primary">
          Várzea Net <span className="text-sm font-normal">ACS</span>
        </h1>
      </div>

      <div className="mt-4 flex flex-col flex-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            icon={item.icon}
            text={item.text}
            to={item.to}
            isActive={
              currentPath === item.to ||
              (item.to !== "/" && currentPath.startsWith(item.to))
            }
          />
        ))}
      </div>

      <div className="mt-auto pt-4 border-t">
        <div className="flex items-center gap-3 mb-4 px-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <HardDrive size={16} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Servidor</p>
            <p className="text-sm font-medium">Operacional</p>
          </div>
          <div className="ml-auto">
            <span className="flex h-2 w-2 rounded-full bg-online animate-pulse"></span>
          </div>
        </div>

        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="flex-1">
            <BadgeHelp size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="flex-1">
            <Settings size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="flex-1">
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
