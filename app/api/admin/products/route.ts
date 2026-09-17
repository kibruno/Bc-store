import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({error:"unauthorized"},{status:401});
  const b=await req.json();
  const slug=(b.slug || b.name).toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  const p=await prisma.product.create({data:{name:b.name,slug,brand:b.brand||"BC STORE",category:b.category||"Camisetas",description:b.description||"",priceCents:Math.round(Number(b.price)*100),imageUrl:b.imageUrl||"/placeholder.svg",sizes:b.sizes||"P,M,G,GG",colors:b.colors||"Preto",stock:Number(b.stock)||0,active:b.active!==false}});
  return NextResponse.json(p);
}