export function StatCardSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-4 rounded-xl bg-slate-700/50 p-5">
      <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-600" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-6 w-1/3 rounded bg-slate-600" />
        <div className="h-3.5 w-2/3 rounded bg-slate-600" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-slate-700/50 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
        <Icon className="text-lg" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-2xl font-bold text-white">{value}</p>
        <p className="truncate text-sm text-slate-400">{label}</p>
      </div>
    </div>
  );
}

export default StatCard;
