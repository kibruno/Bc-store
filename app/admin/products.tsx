"use client";
import { useState } from "react";

type P={id:string,name:string,brand:string,category:string,description:string,price:number,imageUrl:string,sizes:string,colors:string,stock:number,active:boolean};

const empty={name:"",brand:"BC STORE",category:"Camisetas",description:"",price:0,imageUrl:"/placeholder.svg",sizes:"P,M,G,GG",colors:"Preto",stock:0,active:true};

export default function AdminProducts({initial}:{initial:P[]}) {
  const [items,setItems]=useState<P[]>(initial); const [form,setForm]=useState<any>(empty); const [editing,setEditing]=useState<string|null>(null); const [busy,setBusy]=useState(false); const [msg,setMsg]=useState("");
  function change(k:string,v:any){setForm((x:any)=>({...x,[k]:v}))}
  async function upload(file:File){const fd=new FormData();fd.append("file",file);const r=await fetch("/api/upload",{method:"POST",body:fd});const j=await r.json();if(!r.ok)throw new Error(j.error||"Erro no upload");change("imageUrl",j.url)}
  async function save(e:any){e.preventDefault();setBusy(true);setMsg("");try{const url=editing?`/api/admin/products/${editing}`:"/api/admin/products";const r=await fetch(url,{method:editing?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});const j=await r.json();if(!r.ok)throw new Error(j.error||"Erro");if(editing)setItems(items.map(x=>x.id===editing?j:x));else setItems([j,...items]);setForm(empty);setEditing(null);setMsg("Produto salvo com sucesso.");}catch(e:any){setMsg(e.message)}finally{setBusy(false)}}
  function edit(p:P){setEditing(p.id);setForm(p)}
  async function remove(id:string){if(!confirm("Excluir este produto?"))return;const r=await fetch(`/api/admin/products/${id}`,{method:"DELETE"});if(r.ok)setItems(items.filter(x=>x.id!==id))}
  return <div>
    <form className="admin-form" onSubmit={save}>
      <h2>{editing?"Editar produto":"Novo produto"}</h2>
      <label>Nome<input required value={form.name} onChange={e=>change("name",e.target.value)}/></label>
      <label>Marca<input value={form.brand} onChange={e=>change("brand",e.target.value)}/></label>
      <label>Categoria<select value={form.category} onChange={e=>change("category",e.target.value)}>{["Camisas","Camisetas","Polos","Calças","Bermudas","Kits","Promoções"].map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Preço (R$)<input required type="number" step="0.01" min="0" value={form.price} onChange={e=>change("price",e.target.value)}/></label>
      <label>Estoque<input type="number" min="0" value={form.stock} onChange={e=>change("stock",e.target.value)}/></label>
      <label>Tamanhos<input value={form.sizes} onChange={e=>change("sizes",e.target.value)} placeholder="P,M,G,GG"/></label>
      <label>Cores<input value={form.colors} onChange={e=>change("colors",e.target.value)} placeholder="Preto,Branco"/></label>
      <label>Descrição<textarea rows={3} value={form.description} onChange={e=>change("description",e.target.value)}/></label>
      <label>Foto do produto<input type="file" accept="image/*" onChange={async e=>{if(e.target.files?.[0]){setBusy(true);try{await upload(e.target.files[0]);setMsg("Foto enviada.");}catch(err:any){setMsg(err.message)}finally{setBusy(false)}}}}/></label>
      {form.imageUrl&&<img src={form.imageUrl} style={{width:130,height:130,objectFit:"cover",marginTop:10,borderRadius:8}}/>}
      <div className="admin-actions"><button className="btn gold" disabled={busy}>{busy?"SALVANDO...":editing?"ATUALIZAR PRODUTO":"CADASTRAR PRODUTO"}</button>{editing&&<button type="button" className="btn" onClick={()=>{setEditing(null);setForm(empty)}}>CANCELAR</button>}</div>
      {msg&&<p>{msg}</p>}
    </form>
    <div className="admin-grid">{items.map(p=><article className="admin-card" key={p.id}><img src={p.imageUrl} alt={p.name}/><div className="brand">{p.brand}</div><h3>{p.name}</h3><p>R$ {p.price.toFixed(2).replace(".",",")} • Estoque: {p.stock}</p><div className="admin-actions"><button className="btn gold" onClick={()=>edit(p)}>EDITAR</button><button className="danger" onClick={()=>remove(p.id)}>EXCLUIR</button></div></article>)}</div>
  </div>;
}