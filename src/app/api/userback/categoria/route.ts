import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface Categoria {
    name: string;
}

export async function GET (_request:Request,_response:NextResponse){
   const categorias=await prisma.categoria.findMany()
   return NextResponse.json(categorias)
}

export async function POST (request:Request){
    const body:Categoria = await request.json()

    if(body.name == ""){
        return NextResponse.json({user: null,message: "Debes ingresar un nombre"},{status: 400})
     }
     const existCategoria =  await prisma.categoria.findFirst({
        where: {name : body.name}
     })
     if (existCategoria){
        return NextResponse.json({user: null,message: "El nombre ingresado ya existe en la base de datos"},{status: 400})
     }

     const newCategoria = await prisma.categoria.create({
        data: {
          name: body.name
        },
      });

     return  NextResponse.json({user:newCategoria, message:"categoria creada con éxito"},{status: 201})
}