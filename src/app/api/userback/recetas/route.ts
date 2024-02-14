import { NextRequest, NextResponse } from "next/server";
import RecipeServices from "@/services/recipeServices";
import {iSearchedRecipe } from "@/interfaces/recipeInterfaces";

interface ICalendar {
    idReceta: string,
    idUser:string,
    date:Date,
    horario: string
  }
   

const recipeServices=new RecipeServices();

export async function GET(_request:NextRequest,_response:NextResponse,params:iSearchedRecipe) {

    const searchedWords = params.searchedWords
    const searchResults=await recipeServices.searchRecipe(searchedWords);
    return new Response(JSON.stringify(searchResults));
}

export async function POST(request: Request) {
    const body: ICalendar = await request.json();
    const date=new Date(body.date);
    const scheduleRecipe= recipeServices.scheduleRecipe(body.idReceta,body.idUser,date,body.horario)
    return NextResponse.json({scheduleRecipe},{status:200})
  }

  export async function DELETE(request: Request) {
    const body: {id:string} = await request.json();
    const deleteRecipe= recipeServices.deleteRecipe(body.id);
    return NextResponse.json({deleteRecipe},{status:200})
 }