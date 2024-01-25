import prisma from "@/libs/prisma";
import { iRecipeInfo } from "@/interfaces/recipeInterfaces";

class RecipeServices {

  async getRecipe() {
    const recipe = await prisma.recipe.findMany({
      include: {
        categoria: true
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
        }
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

  async deleteRecipe(id: number) {
    const deletedRecipe = await prisma.recipe.delete({
      where: { id },
    });

    return deletedRecipe;
  };

  async getRecetasConAutor(){

    const recipes = await prisma.recipe.findMany({
      include: {
        author:true,
        categoria:true
      }
    });
    return recipes;
  };

  async parsearData(){
    const data = await this.getRecetasConAutor();
    console.log(data);

    return data;

  }





};

export default RecipeServices;
