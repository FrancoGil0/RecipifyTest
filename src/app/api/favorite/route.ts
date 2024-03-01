import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  
  const values = await request.json()
  
  const UserID=values?.userID
  const RecipeID=values?.recipeID   
  
  
  const user=await prisma.user.findFirst({
    where:{
      id: UserID,
    },
    include:{
      favorites:true
    }
  })
  const userFavorites=user?.favorites.length as number

  if(userFavorites>=3 && user?.role==="USER"){
    return NextResponse.json({message: "El usuario excede la cantidad de favoritos"}, {status:400})
  }

  const favorited = await prisma.favorite.findFirst({
      include:{
        likedBy:{select:{id:true,name:true}},
        likedRecipe:{select:{id:true,title:true}},
      },
      where:{
        userID: UserID,
        recipeID: RecipeID,
      }
    })
    
    if(!favorited){
      const newFavorite = await prisma.favorite.create({
        data: {
        userID: Number(values.userID),
        recipeID: Number(values.recipeID),
      },
    });
    console.log("Creado")
    
    return Response.json({ newFavorite });
    
  }
  
  // sino actulizamos la valoracion del usuario
  const favoriteUpdated = await prisma.favorite.delete({
    where:{
        id:favorited.id
    }
  });
  console.log("BORRADO")
  return Response.json({favoriteUpdated});

}



