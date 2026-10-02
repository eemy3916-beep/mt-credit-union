import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppLayout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Overview } from "./pages/Overview";
import { Transactions } from "./pages/Transactions";
import { Transfer } from "./pages/Transfer";
import { Cards } from "./pages/Cards";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Accounts } from "./pages/Accounts";
import { Admin } from "./pages/Admin";
import { Simple } from "./pages/Simple";

export default function App(){return <AuthProvider><BrowserRouter><Routes>
<Route path="/" element={<Landing/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/forgot-password" element={<ForgotPassword/>}/>
<Route element={<ProtectedRoute/>}><Route path="/app" element={<AppLayout/>}><Route index element={<Overview/>}/><Route path="accounts" element={<Accounts/>}/><Route path="transactions" element={<Transactions/>}/><Route path="transfers" element={<Transfer/>}/><Route path="deposit" element={<Transfer kind="deposit"/>}/><Route path="withdraw" element={<Transfer kind="withdrawal"/>}/><Route path="cards" element={<Cards/>}/><Route path="profile" element={<Profile/>}/><Route path="settings" element={<Settings/>}/><Route path="help" element={<Simple title="Help & Support">Support resources for the fictional NONa+ environment. No real banking services are provided.</Simple>}/></Route></Route>
<Route element={<ProtectedRoute admin/>}><Route path="/admin" element={<AppLayout/>}><Route index element={<Admin/>}/></Route></Route>
<Route path="*" element={<Simple title="Page not found">The page you requested does not exist.</Simple>}/>
</Routes></BrowserRouter></AuthProvider>}
