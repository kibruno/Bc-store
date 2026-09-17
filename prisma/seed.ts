import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Camisa KM3 Premium",
      slug: "camisa-km3-premium",
      brand: "KM3",
      category: "Camisas",
      description: "Camisa masculina premium com acabamento moderno.",
      priceCents: 12990,
      imageUrl: "/placeholder.svg",
      sizes: "P,M,G,GG",
      colors: "Preto,Branco",
      stock: 20,
      active: true
    },
    {
      name: "Camiseta Essential Preta",
      slug: "camiseta-essential-preta",
      brand: "BC STORE",
      category: "Camisetas",
      description: "Camiseta masculina básica e versátil.",
      priceCents: 8990,
      imageUrl: "/placeholder.svg",
      sizes: "P,M,G,GG",
      colors: "Preto",
      stock: 20,
      active: true
    },
    {
      name: "Polo Premium",
      slug: "polo-premium",
      brand: "BC STORE",
      category: "Polos",
      description: "Polo masculina com visual sofisticado.",
      priceCents: 11990,
      imageUrl: "/placeholder.svg",
      sizes: "P,M,G,GG",
      colors: "Preto,Branco",
      stock: 15,
      active: true
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
  }

  console.log("Produtos iniciais criados/atualizados.");
}

main().finally(() => prisma.$disconnect());