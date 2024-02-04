import { MercadoPagoConfig, Preference} from 'mercadopago'
import { NextResponse } from 'next/server';

const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export async function POST (req:Request){
    const data:{id:string,message:string,amount:number}=await req.json()
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
        },
      });

       
      return NextResponse.json({redirectURL:preference.sandbox_init_point!})
}