import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params{
    params:{id:string}
}

export async function GET(_request:NextRequest,{params}:Params){
    
    const id = params.id

    console.log(id)

    const recipes= await prisma.scheduledRecipes.findMany({
        where:{
            userID:Number(id)
        },
        include:{
            schBy:true,
            schRecipe:true,
        }
    })
    return new NextResponse(JSON.stringify(recipes)) 
}
export async function DELETE(_request:NextRequest,{params}:Params){
    
    const id = params.id

    console.log(id)

    const deletedRecipe= await prisma.scheduledRecipes.delete(
        {
            where: {id:Number(id)},
        }
    )
    return new NextResponse(JSON.stringify(deletedRecipe)) 
}