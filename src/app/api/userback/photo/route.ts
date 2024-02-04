import UserServices from "@/services/userServices";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const userServicio = new UserServices();
    const data:{id:number}=await req.json()
    const  userWithPhoto:{id:number,photo:string}|null= await userServicio.getPhoto(data.id)
    const photo = userWithPhoto? userWithPhoto?.photo : "https://w7.pngwing.com/pngs/285/84/png-transparent-computer-icons-error-super-8-film-angle-triangle-computer-icons.png"
    // console.log({photo});
    return NextResponse.json({photo});
}