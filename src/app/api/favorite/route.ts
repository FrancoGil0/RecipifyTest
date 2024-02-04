import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  
  const values = await request.json()
  
  const UserID=values?.userID
  const RecipeID=values?.recipeID   
  
  
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



