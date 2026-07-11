import { Search, Settings } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex h-full items-center justify-between px-8">
      <div>
        <h2 className="text-lg font-semibold">
          Overview
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="rounded-lg p-2 text-[var(--color-text-secondary)] transition hover:bg-slate-800 hover:text-white"
        >
          <Search size={20} />
        </button>

        <button
          className="rounded-lg p-2 text-[var(--color-text-secondary)] transition hover:bg-slate-800 hover:text-white"
        >
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}