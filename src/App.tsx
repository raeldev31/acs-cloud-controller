
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";

// Importação lazy dos componentes de página para carregar apenas quando necessário
const Index = lazy(() => import("@/pages/Index"));
const DeviceManagement = lazy(() => import("@/pages/DeviceManagement"));
const TR069Management = lazy(() => import("@/pages/TR069Management"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Desabilita refetch automático ao focar a janela
      staleTime: 1000 * 60 * 5, // 5 minutos
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Carregando...</div>}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
