 "use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const router=useRouter();
  async function submit(e:FormEvent){e.preventDefault();setError("");const r=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});if(r.ok)router.push("/admin");else setError("E-mail ou senha inválidos.");}
  return <main className="login"><form className="login-box" onSubmit={submit}><div className="logo"><b>BC</b> STORE</div><h1>Painel administrativo</h1>{error&&<div className="error">{error}</div>}<label>E-mail<input value={email} onChange={e=>setEmail(e.target.value)} type="email" required/></label><label>Senha<input value={password} onChange={e=>setPassword(e.target.value)} type="password" required/></label><button className="btn gold" style={{width:"100%"}}>ENTRAR</button></form></main>;
}