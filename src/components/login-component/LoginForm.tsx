"use client"
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import {ThreeDots } from 'react-loading-icons'



function LoginForm() {
  const router = useRouter()
  const email = useRef("");
  const pass = useRef("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { handleSubmit } = useForm()

  const onSubmit = async () => {
    setLoading(true);
    const result = await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: false,
      callbackUrl: "/",
    })
    if (result?.ok) {
      if (result.url) {
        router.push(result.url);
      } else {
        setError(true);
        setLoading(false)
      }
    }
  }

  const handleRedirectionRegister=()=>{
    return router.push("/api/register")
  }
  const handleRedirectionContra=()=>{
    return router.push("/api/password/frontEmail")
  }

  return (
    <form action="/login"
    className='flex flex-col rounded-md gap-10 bg-green-100 w-[300px] sm:w-[425px] py-4 px-10 m-auto mt-10' 
    onSubmit={handleSubmit(onSubmit)}>
      {error && (<p className='text-red-700 text-center'> <span className='font-bold'>Error:</span> Credenciales Incorrectas</p>)} 
      {loading && 
      <div className='flex items-center justify-center'>
        <ThreeDots fill='#34D399' />
      </div>
      }
      <div>
      <h1 className='text-center text-4xl text-teal-900'>Iniciá Sesión</h1>
      <p className='text-center text-teal-900 text-xl'>¿Listo para cocinar?</p>
      </div>

      <div className='self-center'>
        <label htmlFor="email" className='text-teal-900 text-lg'>E-Mail</label>
        <input type="text" id="email" name='email'
        className="block self-center h-[45px] rounded-lg text-gray-700 bg-emerald-200 p-2 outline-emerald-500 text-xl"
        placeholder="tuemail@mail.com"
        onChange={(e) => (email.current = e.target.value)} />
        </div>

        <div className='self-center'>
        <label htmlFor="password" className='text-teal-900 text-lg'>Contraseña</label>
        <input 
          type="password" id="password" name='password'
          placeholder="**********"
          className="block h-[45px] rounded-lg text-gray-700 bg-emerald-200 p-2 outline-emerald-500 text-xl placeholder:text--500"
          onChange={(e) => (pass.current = e.target.value)} />
          </div>

        <button type="submit" className="bg-lime-600 text-white text-3xl w-[150px] self-center rounded-lg p-1">Ingresar</button>

        <p className='text-center'>¿No tenés cuenta? <a onClick={handleRedirectionRegister} className='text-blue-500 cursor-pointer'>¡Registrate!</a></p>
        <p className='text-center'>Olvidé mi contraseña <a onClick={handleRedirectionContra} className='text-blue-500 cursor-pointer'>¡Recuperala!</a></p>
    </form>
  );
}

export default LoginForm

