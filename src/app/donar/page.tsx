"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { titleFont } from '../layout';
import { CheckBen } from '@/components/icons';

const DonationPage = () => {

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

    return (
        <div className="min-h-screen">

            <div className='mx-auto  mt-10 cursor-default flex flex-col justify-between w-1/2 min-h-[400px] h-fit border-[1.5px] border-transparent hover:border-[#333] hover:shadow-[#333] shadow-md py-6 rounded-lg bg-neutral-100'>
                <div className={'text-center w-fit mx-auto  flex flex-col justify-between gap-10 p-5 rounded-xl ' + titleFont.className}>
                    <p className='text-[50px] text-zinc-700 '>¡Convertite en un Mecenas!
                    <br /><span className='text-3xl'>Ayudá a Recipify a seguir con vida</span>
                    </p>
                </div>
                <p className='text-[18px] text-center pb-10'>También podes acceder a una suscripción <Link href={"/premium"} className='text-sky-700'>haciendo click acá</Link>.</p>
                <div className='flex justify-evenly items-center px-5'>
                    <p className={"text-xl text-orange-600 " + titleFont.className}>Donación Anónima</p>
                    <p className={"text-3xl " + titleFont.className}>$1000</p>
                </div>
                <p className={'font-sans text-lg mt-3  text-center px-5 hyphens-auto text-green-400  ' + titleFont.className}>¡Tu donación nos ayuda a seguir en linea!</p>
                <form onSubmit={handleSubmit} className="text-xl mt-3 mx-auto text-center bg-amber-400 rounded-xl px-2 py-2 w-1/2">
                    <input hidden readOnly value={1000} name="amount" type="number" />
                    {/* <input hidden readOnly value={session.data? `User${session.data?.user.id}-${session.data.user.name}`:"ANON"} name="description" type="text" /> */}
                    <input hidden defaultValue={"donation_premium"} name="id_pago" type="text" />
                    <textarea hidden readOnly value={`Donación a Recipify.|${donante}`} name="message" />
                    <textarea hidden readOnly value={`${donante}`} name="sessionId" />
                    <button type='submit' className={''+titleFont.className}>¡Doná Ahora!</button>
                </form>

            </div>




        </div>
    )
}

export default DonationPage