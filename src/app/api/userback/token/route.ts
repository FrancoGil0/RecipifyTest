import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { hash } from "bcryptjs";
import UserServices from "@/services/userServices";

interface userInfo {
  password: string;
  repeatPassword: string;
  tokenUsuario: string;
}

export async function POST(request: Request) {
  const body: userInfo = await request.json();
  const userServicio= new UserServices()
  const samePassword= await userServicio.compararPassword(body.password,body.repeatPassword);
  if(!samePassword){
     return NextResponse.json({user: null,message: "Las contraseñas deben ser iguales"},{status: 400})
  }
  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token: body.tokenUsuario,
      createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 1) },
      resetAt: null,
    },
  });

  if (!passwordResetToken) {
    return NextResponse.json(
      { user: null, message: "Solicitud de restablecimiento de token no válida. Intente restablecer su contraseña nuevamente." },
      { status: 400 }
    );
  }

  const encrypted = await hash(body.password, 12);

  const updateUser = prisma.user.update({
    where: { id: passwordResetToken.userId },
    data: {
      password: encrypted,
    },
  });

  const updateToken = prisma.passwordResetToken.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      resetAt: new Date(),
    },
  });

  try {
    await prisma.$transaction([updateUser, updateToken]);
  } catch (err) {
    return NextResponse.json(
      { user: null, message: "Se produjo un error inesperado. Inténtalo de nuevo y si el problema persiste contacta con soporte." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { user: updateUser, message: "Usuario modificado con exito" },
    { status: 201 }
  );
}