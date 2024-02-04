"use server"
import { MercadoPagoConfig, Preference} from 'mercadopago'
import { redirect } from 'next/navigation';




export async function donateMP({formData}:{formData: FormData},{client}:{client:MercadoPagoConfig}) {

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: `Donation By: ${formData.get('id')}`,
            title: formData.get("message") as string,
            quantity: 1,
            unit_price: Number(formData.get("amount")),
          },
        ],
      },
    });

    

    redirect(preference.sandbox_init_point!);
  }