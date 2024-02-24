"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { titleFont } from '../layout';
import { CheckBen } from '@/components/icons';

export default function VistaPagar() {
  const session = useSession()
  const router = useRouter()

  const donante = session.data ? session.data.user.id : "ANON"

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const id = ((event.currentTarget.elements.namedItem("id_pago") as HTMLInputElement).value)
    const amount = ((event.currentTarget.elements.namedItem("amount") as HTMLInputElement).value)
    const message = ((event.currentTarget.elements.namedItem("message") as HTMLInputElement).value)
    const sessionId = ((event.currentTarget.elements.namedItem("sessionId") as HTMLInputElement).value)
    const response = await fetch('/api/premium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        amount,
        message,
        sessionId,
      }),
    });

    if (response.ok) {
      const data: { redirectURL: string } = await response.json();
      router.push(data.redirectURL!)
    }
  };
  // const idret=1321012783
  return (
    <div className='min-h-screen pb-8'>
      <div className='mx-auto mt-10  min-w-[300px] w-fit max-w-[800px] h-screen  px-8 pt-5 pb-8 rounded-xl'>

        <div className={'text-center bg-green-50 flex flex-col justify-between gap-10 p-5 rounded-xl ' + titleFont.className}>
          <div>
            <p className='text-[50px] text-zinc-700 '>¡Convertite en Premium!</p>
            <p className='text-3xl hyphens-auto '>Para disfrutar de todo nuestro contenido sín limites</p>
          </div>
          <p className='text-[18px]'>Si querés saber más sobre los beneficios de tu suscripción, <Link href={"/beneficios"} className='text-sky-700'>hace click acá</Link>.</p>
        </div>

        <div className='w-full mx-auto flex flex-col sm:flex-row p-2 gap-3 h-[350px] '>

          <div className='cursor-default flex flex-col justify-between w-1/2 min-h-[400px] h-fit  max-h-[450px] border-[1.5px] border-transparent hover:border-[#333] hover:shadow-[#333] shadow-md py-6 rounded-lg bg-neutral-100'>
            <div className='flex justify-between items-center px-5'>
              <p className={"text-xl text-blue-600 " + titleFont.className}>Plan Mensual</p>
              <p className={"text-3xl " + titleFont.className}>$1.500</p>
            </div>
            <p className={'font-sans text-lg mt-3  text-center px-5 hyphens-auto text-green-400  ' + titleFont.className}>Pensado para quienes quieren disfrutar al máximo.</p>
            <p className='font-sans text-sm mt-3 text-zinc-500 text-center px-5 hyphens-auto'>El plan mensual de Recipify te ofrece todos los beneficios Premium durante los 30 días posteriores a la acreditación del pago.</p>
            <ul className='hyphens-auto text-md w-9/12 mx-auto py-3'>
              <li className='flex'><span className='text-green-500'><CheckBen></CheckBen></span>Acceso sin restricciones a todas las Recetas</li>
              <li className='flex'><span className='text-green-500'><CheckBen></CheckBen></span>Lista de Favoritos sin límites</li>
              <li className='flex'><span className='text-green-500'><CheckBen></CheckBen></span>¡Ayudás a mantener a Recipify en linea!</li>
            </ul>
            <form onSubmit={handleSubmit} className="text-xl mx-auto text-center bg-amber-400 rounded-xl px-2 py-2 w-1/2">
              <input hidden readOnly value={1500} name="amount" type="number" />
              {/* <input hidden readOnly value={session.data? `User${session.data?.user.id}-${session.data.user.name}`:"ANON"} name="description" type="text" /> */}
              <input hidden defaultValue={"donation_premium"} name="id_pago" type="text" />
              <textarea hidden readOnly value={`Recipify Premium.|${donante}`} name="message" />
              <textarea hidden readOnly value={`${donante}`} name="sessionId" />
              <button type='submit' className=''>¡Suscribite Ahora!</button>
            </form>
          </div>


          <div className='cursor-default flex flex-col justify-between w-1/2 min-h-[400px] h-fit  max-h-[450px] border-[1.5px] border-transparent hover:border-[#333] hover:shadow-[#333] shadow-md py-6 rounded-lg bg-neutral-100'>
            <div className='flex justify-between items-center px-5'>
              <p className={"text-xl text-orange-600 " + titleFont.className}>Plan Anual</p>
              <p className={"text-3xl " + titleFont.className}>$12.000</p>
            </div>
            <p className={'font-sans text-lg mt-3  text-center px-5 hyphens-auto text-green-400  ' + titleFont.className}>¡Ideál para los amantes de Recipfy!</p>
            <p className='font-sans text-sm mt-3 text-zinc-500 text-center px-5 hyphens-auto'>El plan anual te otorgará todos los beneficios de Recipify Premium durante 365 días, además de un importante ahorro para tu bolsillo!</p>
            <ul className='hyphens-auto text-md w-9/12 mx-auto py-3'>
              <li className='flex'><span className='text-green-500'><CheckBen></CheckBen></span>Acceso sin restricciones a todas las Recetas</li>
              <li className='flex'><span className='text-green-500'><CheckBen></CheckBen></span>Lista de Favoritos sin límites</li>
              <li className='flex'><span className='text-green-500'><CheckBen></CheckBen></span><p>¡Ayudás a Recipify y ahorrás <span className='font-bold'>$6000</span>!</p></li>
            </ul>
            <form onSubmit={handleSubmit} className="text-xl mx-auto text-center bg-amber-400 rounded-xl px-2 py-2 w-1/2">
              <input hidden readOnly value={12000} name="amount" type="number" />
              {/* <input hidden readOnly value={session.data? `User${session.data?.user.id}-${session.data.user.name}`:"ANON"} name="description" type="text" /> */}
              <input hidden defaultValue={"donation_premium"} name="id_pago" type="text" />
              <textarea hidden readOnly value={`Recipify Premium.|${donante}`} name="message" />
              <textarea hidden readOnly value={`${donante}`} name="sessionId" />
              <button type='submit' className=''>¡Suscribite Ahora!</button>
            </form>

          </div>





        </div>



      </div>
    </div>
  )
}


