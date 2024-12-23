import { NextRequest } from "next/server";
// import { IUserInfo } from "@/interfaces/userInterfaces";

import prisma from "@/libs/prisma";
interface Params {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: Params) {
  // console.log("lllegooo")
  // const response= NextResponse.next()
  const id = params.id;
  // console.log("id usuario "+id)
  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      posts: true,
      reviews: true,
    },
  });
  return new Response(JSON.stringify( user ));
}
