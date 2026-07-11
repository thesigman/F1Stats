import { NavLink } from "react-router-dom";

import { APP } from "../../lib/config";
import { navigation } from "../../lib/navigation";

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b border-[var(--color-border)] p-6">
        <h1 className="text-xl font-semibold tracking-tight">
          {APP.name}
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Formula One Analytics
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors
                ${
                  isActive
                    ? "bg-[var(--color-accent)] text-white"
                    : "text-[var(--color-text-secondary)] hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--color-border)] p-6 text-sm text-[var(--color-text-secondary)]">
        Version {APP.version}
      </div>
    </div>
  );
}