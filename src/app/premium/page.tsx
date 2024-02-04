"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function VistaPagar(){
  const session=useSession()
  const router=useRouter()

  const donante=session.data? session.data.user.id : "ANON"

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const id = ((event.currentTarget.elements.namedItem("id_pago") as HTMLInputElement).value)
    const amount = ((event.currentTarget.elements.namedItem("amount") as HTMLInputElement).value)
    const message = ((event.currentTarget.elements.namedItem("message") as HTMLInputElement).value)
    console.log(id + " ID DESDE EL FORM")
    const response = await fetch('/api/premium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        amount,
        message,
      }),
    });
    
    if (response.ok){
      const data:{redirectURL:string} = await response.json();
      router.push(data.redirectURL!)
    }
  };
  // const idret=1321012783
    return(
        <div className='min-h-screen'>
            <div className='mx-auto text-center p-20'>
                <p className=' text-lg'>¡Conseguí Recipify premium ahora mismo! </p>
                <p className='text-xl'>Precio: <span className='text-2xl text-blue-500'>1500 AR$</span></p>
            </div>
        <form onSubmit={handleSubmit} className="m-auto grid lg:w-[500px] gap-8 border p-4">
          <input hidden readOnly value={1500} name="amount" type="number" />
          {/* <input hidden readOnly value={session.data? `User${session.data?.user.id}-${session.data.user.name}`:"ANON"} name="description" type="text" /> */}
          <input hidden  defaultValue={"donation_premium"} name="id_pago" type="text" />
          <textarea hidden readOnly value={`Recipify Premium.|${donante}`} name="message" />
        <button type="submit">Pagar</button>
      </form>
        </div>
    )
}