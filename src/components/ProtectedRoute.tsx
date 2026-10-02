import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth";

export function ProtectedRoute({ admin = false }: { admin?: boolean }) {
  const { user, profile, loading } = useAuth();
  if (loading) return <div className="min-h-screen grid place-items-center bg-sand text-ink">Loading secure session…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.status === "suspended") return <div className="min-h-screen grid place-items-center bg-sand p-6"><div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-soft"><h1 className="text-xl font-semibold">Access suspended</h1><p className="mt-2 text-slate-500">This fictional account is currently suspended.</p></div></div>;
  if (admin && profile?.role !== "admin") return <Navigate to="/app" replace />;
  return <Outlet />;
}
