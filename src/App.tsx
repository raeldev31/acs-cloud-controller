
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import DeviceManagement from "@/pages/DeviceManagement";
import TR069Management from "@/pages/TR069Management";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="devices" element={<DeviceManagement />} />
            <Route path="tr069" element={<TR069Management />} />
            {/* As rotas abaixo seriam implementadas conforme a continuação do desenvolvimento */}
            {/*
            <Route path="wifi" element={<WifiMeshManagement />} />
            <Route path="firmware" element={<FirmwareManagement />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="logs" element={<LogsViewer />} />
            <Route path="settings" element={<SystemSettings />} />
            */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
