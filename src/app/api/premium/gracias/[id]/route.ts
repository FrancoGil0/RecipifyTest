import { ParamsId } from "@/app/api/userback/recetas/[id]/route";
import UserServices from "@/services/userServices"

import { NextRequest, NextResponse } from "next/server";

const userServices = new UserServices();



// const idUsuario = request.headers.get("idUsuario");

export async function GET(request:NextRequest,{ params }:ParamsId){
    const idUsuario = params.id
    console.log(idUsuario, typeof idUsuario, "");
    const user= await userServices.getUserId(Number(idUsuario));
    console.log(user)
    const newPremiumUser= await userServices.giveRole({
        id:Number(idUsuario),
        role: "PREMIUM"
    });    
    if(!newPremiumUser) return NextResponse.json({"error":"El Rol de usuario no pudo ser actualizado. Pongase en contacto con el administrador."})
    return NextResponse.json({...newPremiumUser})
}   