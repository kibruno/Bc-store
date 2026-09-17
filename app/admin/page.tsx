import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminProducts from "./products";

export const dynamic="force-dynamic";

export default async function Admin() {
  if(!await isAdmin()) redirect("/login");
  const products=await prisma.product.findMany({orderBy:{createdAt:"desc"}});
  return <main className="admin"><div className="admin-top"><div><div className="eyebrow">BC STORE</div><h1>Painel de produtos</h1><p>Cadastre foto, nome, preço, tamanhos, cores e estoque sem mexer no código.</p></div><a className="btn gold" href="/">VER LOJA</a></div><AdminProducts initial={products.map(p=>({...p,price:p.priceCents/100}))}/></main>;
}