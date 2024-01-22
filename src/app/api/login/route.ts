
import { signJwtAccessToken } from "@/libs/jwt"
import prisma from "@/libs/prisma"
import * as bcrypt from "bcryptjs"
// import cookie from "cookie";
//creamos una interfaz para el cuerpo de la api de inicio de sesión
interface RequestBody{
    email:string,
    password: string
}

export async function POST(request:Request){
    const body:RequestBody= await request.json()
    const user= await prisma.user.findFirst({
        where:{
            email:body.email
        }
    })
    if(user && ( await bcrypt.compare(body.password,user.password))){
        const {password, ...userWithoutPass}=user
        const accessToken= signJwtAccessToken(userWithoutPass)
        const result={
            ...userWithoutPass,
            accessToken
        }

//esto el cliente lo recibiria sin embargo al enviarlo al cuerpo de la petición significa que el frontend va a tener que almacenarlo el mismo  
    // const response = NextResponse.json(
    //     {result},
    //     { status: 200, statusText: "Set cookie successfully" }
    //   );
    
    //   response.cookies.set({
    //     name: "jwt",
    //     value: accessToken,
    //     sameSite: "strict",
    //     maxAge: 60*60*24,
    //     httpOnly: true,
    //   });
    //   return response
    return new Response(JSON.stringify(result))
    
    }else{
        return new Response(JSON.stringify(null))
    }
}