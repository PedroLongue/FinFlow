// src/routes/__root.tsx
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Sidebar } from "../components/layout/Sidebar";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
