import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Bell, CreditCard, Home, LogOut, Menu, Settings, Shield, UserRound, Wallet, X, ArrowLeftRight, Receipt, LifeBuoy, Search } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../lib/auth";
import { Brand, TestBadge } from "./Brand";

const links = [
  ["/app", "Overview", Home],
  ["/app/accounts", "Accounts", Wallet],
  ["/app/transactions", "Transactions", Receipt],
  ["/app/transfers", "Transfers", ArrowLeftRight],
  ["/app/cards", "Cards", CreditCard],
  ["/app/profile", "Profile", UserRound],
  ["/app/settings", "Settings", Settings],
  ["/app/help", "Help & Support", LifeBuoy]
] as const;

export function AppLayout() {
  const [open, setOpen] = useState(false);
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const initials = `${profile?.first_name?.[0] ?? ""}${profile?.last_name?.[0] ?? ""}` || "U";
  const logout = async () => { await signOut(); navigate("/login"); };

  return <div className="min-h-screen bg-sand text-ink dark:bg-[#0b1110] dark:text-sand">
    <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-black/5 bg-white/95 p-5 shadow-soft transition-transform dark:border-white/10 dark:bg-[#111a17] lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between"><Brand/><button className="lg:hidden" onClick={()=>setOpen(false)} aria-label="Close menu"><X/></button></div>
      <div className="mt-8 space-y-1">
        {links.map(([to,label,Icon]) => <NavLink key={to} to={to} end={to==="/app"} onClick={()=>setOpen(false)} className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? "bg-ink text-sand" : "text-slate-500 hover:bg-sand hover:text-ink dark:hover:bg-white/5 dark:hover:text-sand"}`}><Icon size={18}/>{label}</NavLink>)}
        {profile?.role === "admin" && <NavLink to="/admin" onClick={()=>setOpen(false)} className={({isActive})=>`mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isActive ? "bg-ink text-sand" : "text-slate-500 hover:bg-sand"}`}><Shield size={18}/>Admin</NavLink>}
      </div>
      <button onClick={logout} className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-700"><LogOut size={18}/>Sign out</button>
    </aside>
    <main className="lg:pl-72">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-sand/85 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1110]/85 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button className="lg:hidden" onClick={()=>setOpen(true)} aria-label="Open menu"><Menu/></button>
          <div className="hidden items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-slate-400 shadow-sm sm:flex"><Search size={16}/>Search</div>
          <div className="ml-auto flex items-center gap-3"><TestBadge/><button className="rounded-xl p-2 hover:bg-white" aria-label="Notifications"><Bell size={19}/></button><div className="grid h-9 w-9 place-items-center rounded-full bg-moss text-xs font-bold text-white">{initials}</div></div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-7 pb-24 sm:px-8 lg:pb-10"><Outlet/></div>
    </main>
    <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-black/5 bg-white/95 px-2 py-2 backdrop-blur-xl lg:hidden">
      {links.slice(0,5).map(([to,label,Icon])=><Link key={to} to={to} className="flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1 text-[10px] text-slate-500"><Icon size={18}/>{label}</Link>)}
    </nav>
  </div>;
}
