import RecipeServices from "@/services/recipeServices"
import { NextResponse } from "next/server"

interface RequestBody{
    titulo:string,
    descripcion:string,
    ingredientes:string,
    categoria:string,
    idUsuario:string
}

export async function POST(request:Request){
    const response= NextResponse.next()
    const body:RequestBody= await request.json()
    const titulo=body.titulo
    const descripcion=body.descripcion
    const ingredientes=body.ingredientes
    const categoria=body.categoria
    const idUsuario=body.idUsuario
    const photo="imagen"
    const recipeServicio= new RecipeServices()

    recipeServicio.addRecipe(titulo,descripcion,ingredientes,categoria,idUsuario,photo)

    return NextResponse.json(
            {message:"bieeen"},
            { status: 200 }
          );
}