// src/app/api/recetas/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  const id = params.id;
  const idUsuario = request.headers.get("idUsuario");

  // lógica para obtener la receta, calcular el rating y devolver la respuesta
  const reviewsCount = await prisma.review.count({
    where: { recipeID: Number(id) },
  });

  let sumaRating = 0;
  let newRating = 0;

  if (reviewsCount == 3) {
    const reviewRecipe = await prisma.review.findMany({
      where: { recipeID: Number(id) },
    });
    reviewRecipe.forEach((review) => {
      sumaRating += review.rating;
    });
    newRating = Math.min(sumaRating / reviewRecipe.length, 5);

    await prisma.recipe.update({
      where: { id: Number(id) },
      data: { rating: Math.round(newRating) },
    });
  }

  const recipe = await prisma.recipe.findFirst({
    where: { id: Number(id) },
    include: { author: true, categoria: true },
  });

  const hasRating = await prisma.review.findFirst({
    where: { authorID: Number(idUsuario) },
  });

  const response = {
    ...recipe,
    hasRating: hasRating ? hasRating : false,
  };

  return NextResponse.json(response);
}
