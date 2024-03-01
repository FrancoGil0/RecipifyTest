import { MercadoPagoConfig, Preference} from 'mercadopago'
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]/route';


const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export async function POST (req:Request){
    const data:{id:string,message:string,amount:number}=await req.json()

    const session=await getServerSession(authOptions)

    const id= String(session?.user.id)

    // console.log("SESSION ID TRAIDO DESDE EL SERVER "+id)

    const url=process.env.TUNNEL_URL
    const successURL= id !== "ANON"? url+"/gracias/"+id : url+"/gracias"


    const preference = await new Preference(client).create({
        body: {
          items: [
            {
              id: data.id,
              title: data.message,
              quantity: 1,
              unit_price: Number(data.amount),
            },
          ],
          back_urls:{
            success:successURL,
            failure:url+"/premium",
            pending:url+"/premium"
          },
          auto_return:"approved"
        },
      });

       
      return NextResponse.json({redirectURL:preference.sandbox_init_point!})
}