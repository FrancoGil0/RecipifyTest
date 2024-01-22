import { NextResponse } from "next/server"
import { userInfo } from "@/interfaces/userInterfaces";

import UserServices from "@/services/userServices"


export async function POST(request:Request){
    const body:userInfo= await request.json()
    const userServicio= new UserServices()
    try {
        await userServicio.updateUser(body)
    } catch (error ) {
        if (error instanceof Error) {
            return NextResponse.json({user: null,message: error.message},{status: 400})
        }
    }
    return  NextResponse.json({user:body.email, message:"usuario modificado con exito"},{status: 201})
    
}