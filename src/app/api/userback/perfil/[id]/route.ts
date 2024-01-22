import { NextRequest,NextResponse } from "next/server"
import { userInfo } from "@/interfaces/userInterfaces";

import UserServices from "@/services/userServices"
import prisma from '@/libs/prisma'
interface Params{
    params: {id:string}
}


export async function GET(request:NextRequest,{params}:Params){
    // console.log("lllegooo")
    const response= NextResponse.next()
    const id = params.id
    // console.log("id usuario "+id)
    const user= await prisma.user.findFirst({
        where:{
            id:Number(id)
        }
    })
    // console.log(user)
    return new Response(JSON.stringify(user)) 
}