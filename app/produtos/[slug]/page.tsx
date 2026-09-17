import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

function money(cents: number) { return (cents/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}); }

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({ where: { slug } });
  if (!p || !p.active) notFound();

  const wa = process.env.WHATSAPP_NUMBER || "5588999999999";
  const text = `Olá, BC STORE! Tenho interesse neste produto:\\n\\nProduto: ${p.name}\\nMarca: ${p.brand}\\nValor: ${money(p.priceCents)}\\n\\nGostaria de finalizar meu pedido.`;
  return <main className="detail">
    <img src={p.imageUrl} alt={p.name}/>
    <div><div className="eyebrow">{p.brand}</div><h1>{p.name}</h1><p>{p.description}</p><div className="price">{money(p.priceCents)}</div>
      <label>Tamanho<select id="size">{p.sizes.split(",").map(s=><option key={s}>{s.trim()}</option>)}</select></label>
      <label>Cor<select id="color">{p.colors.split(",").map(c=><option key={c}>{c.trim()}</option>)}</select></label>
      <label>Quantidade<input id="qty" type="number" min="1" defaultValue="1"/></label>
      <a className="btn" style={{background:"#22c55e",color:"#071007",width:"100%",textAlign:"center"}} href={`https://wa.me/${wa}?text=${encodeURIComponent(text)}`} target="_blank">COMPRAR PELO WHATSAPP</a>
    </div>
  </main>;
}