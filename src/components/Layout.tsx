
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6">
          <Suspense fallback={<div className="p-4">Carregando...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout;
