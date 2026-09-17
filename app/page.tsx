import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

function money(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function Home() {
  const products = await prisma.product.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } });
  const categories = [...new Set(products.map(p => p.category))];

  return <main>
    <section className="hero" id="inicio"><div><small>BC STORE • MODA MASCULINA</small><h1>Estilo que<br/><strong>combina com você.</strong></h1><p>Escolha suas peças, veja os valores e finalize seu pedido diretamente pelo WhatsApp.</p><a className="btn gold" href="#produtos">VER PRODUTOS</a></div></section>
    <section className="promo"><div><small>SEMANA DO CLIENTE</small><h2>Quanto mais você leva, mais você economiza.</h2></div><div className="discounts"><div><b>5%</b><span>1ª peça</span></div><div><b>10%</b><span>2ª peça</span></div><div><b>15%</b><span>3ª peça</span></div></div></section>
    <section className="section" id="categorias"><div className="eyebrow">ESCOLHA SEU ESTILO</div><h2>Categorias</h2><div className="cats">{categories.map(c => <a key={c} href={`#${encodeURIComponent(c)}`}><button>{c}</button></a>)}</div></section>
    <section className="section" id="produtos"><div className="eyebrow">COLEÇÃO BC STORE</div><h2>Produtos</h2><div className="products">
      {products.map(p => <article className="product" id={encodeURIComponent(p.category)} key={p.id}><Link href={`/produtos/${p.slug}`}><img src={p.imageUrl} alt={p.name}/></Link><div className="body"><div className="brand">{p.brand}</div><h3>{p.name}</h3><div className="price">{money(p.priceCents)}</div><Link className="buy" href={`/produtos/${p.slug}`}>VER PRODUTO</Link></div></article>)}
      {!products.length && <p className="empty">Nenhum produto cadastrado.</p>}
    </div></section>
  </main>;
}