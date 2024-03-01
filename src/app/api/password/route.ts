import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import TokenService from "@/services/tokenService";

interface userInfo {
  email: string;
}

export async function POST(request: Request) {
  try {
    const body: userInfo = await request.json();

    const bandera = !body.email || body.email==="" ? false : true
    if(!bandera){
      return NextResponse.json({user: null,message: "No pude dejar el campo vacio"},{status: 400})
  }
  //   const bandera2 =  body.email.includes("@")
  //     if(!bandera2){
  //       return NextResponse.json({user: null,message: "El email debe tener una @"},{status: 400})
  //   }
  //   if (!body.email.endsWith('.com')){
  //     return NextResponse.json({user: null,message: "El email debe tener .com"},{status: 400})
  //   }
  //   if (!body.email.includes('@gmail')){
  //     return NextResponse.json({user: null,message: "El correo ingresado no es válido"},{status: 400})
  //   }

    const tokenServicio= new TokenService()
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });
     if(user){
      const token=tokenServicio.crearToken(user)
      tokenServicio.enviarEmail(user.email, user.name, (await token).token)
    }

    return NextResponse.json({user:body.email, message:"Mensaje enviado con exito"},{status: 201});
  } catch (error) {
    return NextResponse.json({ error });
  }
}