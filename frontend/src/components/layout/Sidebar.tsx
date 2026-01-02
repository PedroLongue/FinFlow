import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

const menu = [
  { label: "Dashboard", to: "/" },
  { label: "Boletos", to: "/bills" },
  { label: "Insights", to: "/insights" },
  { label: "Notificações", to: "/notifications" },
  { label: "Configurações", to: "/configurations" },
];

export const Sidebar = () => {
  return (
    <aside className="fixed lg:static inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 -translate-x-full lg:translate-x-0">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">
            FinFlow
          </span>
        </div>
      </div>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="block rounded-md px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            activeProps={{
              className: "bg-zinc-800 text-white",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
