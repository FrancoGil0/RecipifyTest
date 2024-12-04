import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  const id = params.id;
  const idUsuario = request.headers.get("idUsuario");
  //cantidad de recetas que tiene una receta
  const reviewsCount = await prisma.review.count({
    where: {
      recipeID: Number(id),
    },
  });
  let sumaRating = 0;
  let newRating = 0;
  //si tiene 3 valoraciones la receta actulizamos el rating de la receta
  if (reviewsCount == 3) {
    const reviewRecipe = await prisma.review.findMany({
      where: {
        recipeID: Number(id),
      },
      include:{
        author:true
      }
    });
    reviewRecipe.forEach((review) => {
      sumaRating += review.rating;
    });
    newRating = Math.min(sumaRating / reviewRecipe.length, 5);

    await prisma.recipe.update({
      where: { id:Number(id)},
      data: {
        rating: Math.round(newRating),
      },
      include:{
        author:true
      }
    });
  ///aca termina
  }
// buscamos la receta 
  const recipe = await prisma.recipe.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      author:  true ,
      categoria: true,
    },
  });
// buscamos la valoracion de la receta según el usuario
  const hasRating = await prisma.review.findFirst({
    where: {
      authorID: Number(idUsuario),
    },
    include: {
      author: { select: { name: true } },
    },
  });
/// devolvemos la receta con la valoracion pero ojo xq sino tiene devuelve false
  const response = {
    ...recipe,
    hasRating: hasRating ? hasRating : false,
  };
  return new NextResponse(JSON.stringify(response));
}