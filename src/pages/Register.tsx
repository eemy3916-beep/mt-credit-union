import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Brand } from "../components/Brand";

const valid=(p:string)=>p.length>=8&&/[A-Z]/.test(p)&&/[a-z]/.test(p)&&/\d/.test(p);
export function Register(){
 const nav=useNavigate(); const [f,setF]=useState({first:"",last:"",email:"",password:"",confirm:""}); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
 async function submit(e:FormEvent){e.preventDefault();setError("");if(!valid(f.password))return setError("Password must be at least 8 characters and include uppercase, lowercase, and a number.");if(f.password!==f.confirm)return setError("Passwords do not match.");setLoading(true);const {data,error}=await supabase.auth.signUp({email:f.email,password:f.password,options:{data:{first_name:f.first,last_name:f.last}}});setLoading(false);if(error)return setError("We couldn't create the account. Please review your details.");if(data.session)nav("/app");else nav("/login?registered=1");}
 const input=(key:keyof typeof f,label:string,type="text")=><label className="block text-sm font-medium">{label}<input required type={type} value={f[key]} onChange={e=>setF({...f,[key]:e.target.value})} className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-3.5 outline-none focus:border-moss"/></label>;
 return <div className="min-h-screen bg-sand px-5 py-8"><div className="mx-auto max-w-md"><Link to="/login" className="mb-12 inline-flex items-center gap-2 text-sm text-slate-500"><ArrowLeft size={16}/>Back to sign in</Link><Brand/><div className="mt-10 rounded-[2rem] bg-white p-6 shadow-soft sm:p-8"><h1 className="text-2xl font-semibold">Create account</h1><p className="mt-2 text-sm text-slate-500">Create a fictional NONa+ profile.</p><form onSubmit={submit} className="mt-7 space-y-4">{input("first","First name")}{input("last","Last name")}{input("email","Email","email")}{input("password","Password","password")}{input("confirm","Confirm password","password")}{error&&<div role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}<button disabled={loading} className="w-full rounded-xl bg-ink py-3.5 text-sm font-semibold text-white">{loading?"Creating…":"Create Account"}</button></form></div></div></div>
}
