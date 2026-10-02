import { ShieldCheck } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-sand shadow-soft">
        <span className="text-lg font-black tracking-tight">M.</span>
      </div>
      {!compact && <div><div className="font-semibold tracking-tight">M.&T Credit Union</div><div className="text-[10px] uppercase tracking-[.22em] text-slate-500">NONa+ Environment</div></div>}
    </div>
  );
}
export function TestBadge() {
  return <div className="inline-flex items-center gap-1.5 rounded-full border border-moss/15 bg-mint px-2.5 py-1 text-[11px] font-semibold text-moss"><ShieldCheck size={13}/> NONa+</div>;
}
