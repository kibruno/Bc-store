import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "BC STORE | Moda Masculina",
  description: "BC STORE - catálogo de moda masculina com pedidos pelo WhatsApp."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="header">
          <Link href="/" className="logo"><b>BC</b> STORE</Link>
          <nav>
            <Link href="/">Início</Link>
            <Link href="/#produtos">Produtos</Link>
            <Link href="/#categorias">Categorias</Link>
          </nav>
          <a className="header-wa" href={`https://wa.me/${process.env.WHATSAPP_NUMBER || "5588999999999"}`} target="_blank">WhatsApp</a>
        </header>
        {children}
        <footer>
          <div><div className="logo"><b>BC</b> STORE</div><p>Estilo • Qualidade • Você</p></div>
          <div><p>Instagram: @{process.env.NEXT_PUBLIC_INSTAGRAM || "bcstore.01"}</p><p>Pedidos pelo WhatsApp</p></div>
        </footer>
      </body>
    </html>
  );
}