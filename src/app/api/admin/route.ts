import AdminServices from "@/services/adminServices";
import { NextRequest, NextResponse } from "next/server";

export interface AdminInterface{
    idRecipe?: string | number;
    idUser?: string;
    idReporte?: string|number;
    action?:"deleteAllReportes"|"deleteReporte"
}
export async function GET(_request: NextRequest) {
  const adminServices = new AdminServices();
  const reportes = await adminServices.todosLosReportes();
  return new NextResponse(JSON.stringify(reportes));
}
export async function DELETE(request: Request) {
  const adminServices = new AdminServices();
  const body:AdminInterface= await request.json()


  if(body.action==="deleteAllReportes"){
    adminServices.borrarTodosReportes();
  return NextResponse.json(
    { message: "Borrado exitosamente todos los reportes" },
    { status: 200 }
  );
  }
  
  else if(body.action==="deleteReporte"){
    const respuesta=adminServices.borrarReporteEspecifico(body.idReporte as string);
    console.log(respuesta);
    return NextResponse.json(respuesta);
  }
  
  
  else{
    return NextResponse.json({
      "message":"Hubo un error con el tipo de la Request.",
      "status": 505
    })
  }
}
export async function POST (request:Request){
    const body:AdminInterface= await request.json()
    const adminServices= new AdminServices()
    const reported=adminServices.crearReported(body.idRecipe as string,body.idUser as string)
    return  NextResponse.json({reporte:reported, message:"reporte creado con éxito"},{status: 201})
}


export async function PATCH (request:Request){
  const body:AdminInterface= await request.json()
  const adminServices= new AdminServices()
  console.log(body.idRecipe , typeof body.idRecipe)
  const updatedRecipe=await adminServices.resetReceta(body.idRecipe as string)
  return NextResponse.json({message:updatedRecipe.message,status:updatedRecipe.status})
}