import { NextResponse } from "next/server";

import UserServices from "@/services/userServices";

interface userInfo {
  id: number;
  password: string;
  repeatPassword: string;
}

export interface updateData {
  id: number|string;
  photo?: string;
  name?: string;
  profileDescription?: string;
}

export async function POST(request: Request) {
  const body: userInfo = await request.json();
  const userServicio = new UserServices();
  try {
    await userServicio.changePassword(body);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { user: null, message: error.message },
        { status: 400 }
      );
    }
  }
  return NextResponse.json(
    { message: "Información del usuario actualizada con éxito." },
    { status: 201 }
  );
}

export async function PATCH(req: Request) {
  const body: updateData = await req.json();
  const userServices = new UserServices();
  try {
    await userServices.editarUsuario(body)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { user: null, message: error.message },
        { status: 400 }
      );
    }
  }
  return NextResponse.json(
    { message: "Información del usuario actualizada con éxito." },
    { status: 201 }
  );
}
