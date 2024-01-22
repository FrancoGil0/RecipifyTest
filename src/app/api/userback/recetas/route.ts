import { NextRequest, NextResponse } from "next/server";
import RecipeServices from "@/services/recipeServices";
import { iSearchedRecipe } from "@/interfaces/recipeInterfaces";

const recipeServices=new RecipeServices();

export async function GET(_request:NextRequest,_response:NextResponse,params:iSearchedRecipe) {

    const searchedWords = params.searchedWords
    const searchResults=await recipeServices.searchRecipe(searchedWords);
    return new Response(JSON.stringify(searchResults));
}
