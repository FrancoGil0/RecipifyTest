import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface User {
  id: string;
  visibility:string
}
export async function PATCH(request: Request) {
  const body: User = await request.json();
  let visibility= body.visibility === "true"? true: false
  const user = await prisma.user.findFirst({
    where: {
      id: Number(body.id),
    },
  });
  const userUpdate = await prisma.user.update({
    where: { id: Number(body.id) },
    data: {
      visibility: visibility
    },
  });
  return NextResponse.json({user:userUpdate, message:"visibilidad del usuario cambiada con éxito"},{status: 201})
}