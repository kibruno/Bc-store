import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}) {
  if(!await isAdmin()) return NextResponse.json({error:"unauthorized"},{status:401});
  const {id}=await params; const b=await req.json();
  const p=await prisma.product.update({where:{id},data:{name:b.name,brand:b.brand,category:b.category,description:b.description,priceCents:Math.round(Number(b.price)*100),imageUrl:b.imageUrl,sizes:b.sizes,colors:b.colors,stock:Number(b.stock),active:Boolean(b.active)}});
  return NextResponse.json(p);
}
export async function DELETE(_req:Request,{params}:{params:Promise<{id:string}>}) {
  if(!await isAdmin()) return NextResponse.json({error:"unauthorized"},{status:401});
  const {id}=await params; await prisma.product.delete({where:{id}}); return NextResponse.json({ok:true});
}