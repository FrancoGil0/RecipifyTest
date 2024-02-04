import { MercadoPagoConfig, Payment } from "mercadopago";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import UserServices from "@/services/userServices";

const userServices = new UserServices();
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});



// export async function GET(request: Request) {
//   return NextResponse.json({ message: "ola k ase" });
// }

export async function POST(request: NextRequest) {
  const body = await request.json().then((data) => data as {data: {id: string}});

  const payment = await new Payment(client).get({id: body.data.id});

  // console.log(payment)

  const paymentData = {
    id: payment.id,
    amount: payment.transaction_amount,
    by: payment.description,
  };

  // console.log("New Payment Data \n"+ paymentData);

    const newPayment = await prisma.payment.create({
      data:{
          id: paymentData.id,
          amount: paymentData.amount as number,
          by: paymentData.by as string
      }
    })
    if (newPayment) return NextResponse.json({success: true});
    

  return NextResponse.json({ success: false });
}
