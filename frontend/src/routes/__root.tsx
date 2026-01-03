import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Sidebar } from "../components/layout/Sidebar";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
import Login from "../pages/Login";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-zinc-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-zinc-950 text-zinc-100 min-h-screen">
        <Login />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
