import RecipeServices from "@/services/recipeServices";
import { NextResponse } from "next/server";


const recipeServicio=new RecipeServices()

export async function GET(){

    const deletedRecipes = await recipeServicio.getDeletedRecipes();

    return NextResponse.json(deletedRecipes) 
}