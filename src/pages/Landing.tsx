import { Link } from "react-router-dom";
import { ArrowRight, LockKeyhole, Smartphone, Sparkles } from "lucide-react";
import { Brand, TestBadge } from "../components/Brand";

export function Landing(){
 return <div className="min-h-screen bg-sand text-ink">
  <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8"><Brand/><Link to="/login" className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">Sign In</Link></header>
  <main>
   <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:pb-28 lg:pt-20">
    <div><TestBadge/><h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-.04em] sm:text-7xl">Banking,<br/><span className="text-moss">simplified.</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">A modern financial experience powered by secure digital technology.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3.5 text-sm font-semibold text-white">Sign In <ArrowRight size={17}/></Link><a href="#nona" className="rounded-xl border border-ink/10 bg-white px-5 py-3.5 text-sm font-semibold">Explore NONa+</a></div><p className="mt-6 max-w-lg text-xs leading-5 text-slate-400">M.&T Credit Union is a fictional/test financial experience. It does not connect to real banking networks, payment processors, financial institutions, or real money.</p></div>
    <div className="rounded-[2rem] bg-ink p-5 text-white shadow-2xl sm:p-7"><div className="flex justify-between"><div><div className="text-sm text-white/55">M.&T Everyday Checking</div><div className="mt-2 text-3xl font-semibold">$2,500,000.50</div></div><Sparkles className="text-gold"/></div><div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-white/45">NONa+ Activity</div><div className="mt-3 flex justify-between"><span>Transfer Received</span><span className="text-emerald-300">+$2,500,000.50</span></div></div></div>
   </section>
   <section id="nona" className="border-y border-black/5 bg-white/70"><div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-8 md:grid-cols-3">{[[LockKeyhole,"Secure by design","Supabase Auth, protected routes, RLS, and server-side authorization."],[Smartphone,"Built for mobile","Responsive layouts and a PWA manifest ready for app packaging."],[Sparkles,"Fictional by design","Every account, balance, card, and transaction is simulated test data."]].map(([I,t,d]:any)=><div key={t} className="rounded-3xl p-5"><I size={21}/><h2 className="mt-5 font-semibold">{t}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{d}</p></div>)}</div></section>
  </main>
  <footer className="mx-auto max-w-7xl px-5 py-8 text-xs text-slate-400 sm:px-8">© M.&T Credit Union · Fictional NONa+ environment</footer>
 </div>
}
