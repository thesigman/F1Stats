import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[var(--sidebar-width)_1fr] grid-rows-[var(--topbar-height)_1fr] bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="row-span-2 border-r border-slate-800 bg-slate-900">
        <Sidebar />
      </aside>

      {/* Topbar */}
      <header className="border-b border-slate-800 bg-slate-900">
        <Topbar />
      </header>

      {/* Main Content */}
      <main className="overflow-auto bg-slate-950 p-8">
        <Outlet />
      </main>
    </div>
  );
}