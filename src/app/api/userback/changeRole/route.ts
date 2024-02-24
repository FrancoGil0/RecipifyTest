import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface User {
  id: string;
  rol:string
}
export async function PATCH(request: Request) {
  const body: User = await request.json();
  const user = await prisma.user.findFirst({
    where: {
      id: Number(body.id),
    },
  });
  const userUpdate = await prisma.user.update({
    where: { id: Number(body.id) },
    data: {
      role: body.rol
    },
  });
  return NextResponse.json({user:userUpdate, message:"usuario cambiado a rol ADMIN"},{status: 201})
}