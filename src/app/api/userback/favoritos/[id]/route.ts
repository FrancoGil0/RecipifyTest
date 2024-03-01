import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: { id: string };
  }
  


export async function GET(_request: NextRequest, { params }: Params) {
    const id = params.id;
    const favoriteRecipes =await prisma.favorite.findMany({
        where: {
          userID: Number(id),
        },
        include: {
            likedRecipe: true,
        },
      });


    return new NextResponse(JSON.stringify(favoriteRecipes));
  }

