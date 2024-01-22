import prisma from "@/libs/prisma";
import {  NextResponse } from "next/server";

export async function GET() {
    const recipes = await prisma.recipe.findMany({
      include: {
        author: true,
        categoria:true
      },
    });
    return NextResponse.json(recipes);
  } 