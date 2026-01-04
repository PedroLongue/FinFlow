import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Sidebar } from "../components/layout/Sidebar";
import { useAuth } from "../hooks/useAuth";

import Login from "../pages/Login";
import Header from "../components/layout/Header";
import { Loading } from "../components/ui/loading";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <Loading />;

  if (!isAuthenticated) return <Login />;

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
