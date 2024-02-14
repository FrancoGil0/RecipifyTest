import prisma from "@/libs/prisma";
import {iRecipeInfo } from "@/interfaces/recipeInterfaces";


class RecipeServices {

  async scheduleRecipe(idReceta: string,idUser:string, date:Date, horario: string){
    const newRecipe = await prisma.scheduledRecipes.create({
      data: {
        userID: Number(idUser),
        recipeID: Number(idReceta),
        schDate: date,
        schTime: horario
      }})
    return newRecipe;
  }

  async getRecipe() {
    const recipe = await prisma.recipe.findMany({
      include: {
        categoria: true
      },
      where:{
        visibility:true
      }
    });
    if (!recipe) {
      throw new Error(
        "Error 404. No se encontraron recetas."
      );
    }
    return recipe;
  }

  async getRecipeByID(id: number) {
    if (!id) {
      throw new Error(
        "Error 409. No se recibe el ID."
      );
    }
    const recipe = await prisma.recipe.findFirst({
      where: {
        id: id,
        visibility:true
      },
    });
    if (!recipe) {
      throw new Error(
        "Error 404. La receta no existe o no está disponible."
      );
    }
    return recipe;
  }

  async searchRecipe(recipeName: string){
    if (!recipeName) {
      throw new Error(
        "Error 409. No se recibe el ID."
      );
    };

    const searchResults=await prisma.recipe.findMany({
      where:{
        title:{
          contains:recipeName as string,
        },
        visibility:true
      },
      include: {
        author: { select: { name: true } },
        categoria: { select: { name: true } },
      },
    });
    if(searchResults) return searchResults
    throw new Error("Error 409. No data provided ahreloco"); //cambiar el error xd

  }

  async addRecipe(title: string,photo:string,description:string,pasos:string,ingredients:string,categoriaID:string,idUsuario:string ) {

    const numberCategoria=Number(categoriaID)
    const numberAuthor=Number(idUsuario)
    const recipeExists = await prisma.recipe.findFirst({
      include: {
        categoria: true
      },
      where: {
        title: title
      },
    });
    if (recipeExists) {
      throw new Error(
        "Error 409. La receta que se intenta registrar, ya existe."
      );
    }
    const newRecipe = await prisma.recipe.create({
      data: {
        title: title,
        photo: photo,
        description:description as string,
        pasos: pasos,
        rating:0,
        ingredients: ingredients,
        categoria: { connect: { id: numberCategoria } },
        author: { connect: { id: numberAuthor } }
      }
    });

    return newRecipe;
  };

  async updateRecipe(id: number, newData: Partial<iRecipeInfo>) {
    const { title, description, ingredients, categoriaID, authorID } = newData;

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        title: title,
        description: description as string,
        ingredients: ingredients,
        categoria: { connect: { id: categoriaID } },
        author: { connect: { id: authorID } }
      },
    });

    return updatedRecipe;
  };

  
  

  async getRecetasConAutor(role:string){
    if(role==="ADMIN"||role==="PREMIUM"){
      const recipes = await prisma.recipe.findMany({
        include: {
          author: true,
          categoria: true
        },
        where: {
          visibility: true
        },
      });
      console.log("ADMIN O PREMIUM")
      return recipes;
    }
    const recipes = await prisma.recipe.findMany({
      include: {
        author: true,
        categoria: true
      },
      where: {
        visibility: true
      },
      take: 2  // Añade esta línea para limitar resultados
    });
    console.log("USER")
    return recipes;
  };

  async deleteRecipe(id: String) {
    const idRecipeNumber=Number(id)
    await prisma.review.deleteMany({
      where: { recipeID: idRecipeNumber },
    });
    
    const updatedRecipe = await prisma.recipe.update({
      where: { id:idRecipeNumber},
      data: {
        visibility:false
      },
    });
  
  };


  async getDeletedRecipes(){
    const deletedRecipes = await prisma.recipe.findMany({
      include: {
        author:true,
        categoria:true
      },
      where:{
        visibility:false
      }
    });
    return deletedRecipes;
  }

  async updateReceta(id:string,title: string,photo:string | null,description:string,pasos:string,ingredients:string,categoriaID:string,idUsuario:string ) {

    const numberCategoria=Number(categoriaID)
    const numberAuthor=Number(idUsuario)
    const recipeExists = await prisma.recipe.findFirst({
      include: {
        categoria: true
      },
      where: {
        id: Number(id)
      },
    });
    if(recipeExists){
    const titleRecipe = title && title != "" && title != " " ? title : recipeExists.title
    const photoRecipe= photo ? photo : recipeExists.photo
    const descriptionRecipe = description && description != "" && description != " "  ? description : recipeExists.description
    const pasosRecipe= pasos && pasos != "" && pasos != " "  ? pasos : recipeExists.pasos
    const ingredientsRecipe = ingredients ? ingredients : recipeExists.ingredients


    const newRecipe = await prisma.recipe.update({
      where:{
        id: recipeExists.id
      },
      data: {
        title: titleRecipe,
        photo: photoRecipe,
        description:descriptionRecipe as string,
        pasos: pasosRecipe,
        rating:0,
        ingredients: ingredientsRecipe,
        categoria: { connect: { id: numberCategoria } },
        author: { connect: { id: numberAuthor } }
      }
    });

    return newRecipe;
  }
  };


};

export default RecipeServices;
