"use client";

import {ThreeDots } from 'react-loading-icons'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { titleFont } from '@/app/layout';

const RegisterComponent = () => {
    const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [country, setCountry] = useState("");
  const router = useRouter();
  const handleRedirect = (path: string) => {
    router.push(path);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/userback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        repeatPassword,
        country,
      }),
    }
    );
    console.info("estado de resultado " + res.status)
    const responseAPI = await res.json();
    console.log("responseApi:", responseAPI);

    if (res.status != 201) {
      setLoading(false)
      setError(responseAPI.message);
      handleRedirect("/api/register");
    } else {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false
      });

      handleRedirect("/recetas");
      console.log("result", result);
    }
  };

  const handleRedirection=()=>{
    return router.push("/api/login/signin")
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col rounded-md bg-green-100 w-[300px] sm:w-[450px] m-auto  mt-5 gap-5 p-5'>
    
    {error && (
    <div className='mb-2 text-red-500 font-bold text-xl text-center'>
    <p >{error}</p>
   </div>
  )}
    {loading && 
      <div className='flex items-center justify-center'>
        <ThreeDots fill='#34D399' />
      </div>
      }
      <h1 className={'text-center text-3xl sm:text-4xl text-teal-900 '+titleFont.className }>¡Registrate Ahora!</h1>

      <div className="self-center">
      <label htmlFor="name" className='text-teal-900 text-lg'>Nombre de Usuario</label>
        <input
          type="text"
          placeholder="nombre"
          className="block self-center h-[45px] rounded-lg text-gray-700 bg-emerald-200 p-2 outline-emerald-500 text-xl"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>


      <div className="self-center">
      <label htmlFor="email" className='text-teal-900 text-lg'>E-mail</label>
        <input
          type="email"
          placeholder="email"
          name="email"
          className="block self-center h-[45px] rounded-lg text-gray-700 bg-emerald-200 p-2 outline-emerald-500 text-xl"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="self-center">
      <label htmlFor="password" className='text-teal-900 text-lg'>Contraseña</label>
        <input
          type="password"
          placeholder=""
          name="password"
          className="block self-center h-[45px] rounded-lg text-gray-700 bg-emerald-200 p-2 outline-emerald-500 text-xl"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="self-center">
      <label htmlFor="repeatPassword" className='text-teal-900 text-lg'>Repetí tu contraseña</label>
        <input
          type="password"
          placeholder="repetir contraseña"
          name="repeatPassword"
          className="block self-center h-[45px] rounded-lg text-gray-700 bg-emerald-200 p-2 outline-emerald-500 text-xl"
          value={repeatPassword}
          onChange={(event) => setRepeatPassword(event.target.value)}
        />
      </div>


      <div className="self-center">
      <label htmlFor="password" className='text-teal-900 text-lg'>¿De dónde sos?</label>
        <select name="country" id="country"
        className="block rounded-lg text-gray-700 bg-emerald-200 p-2 outline-emerald-500 text-xl placeholder:text--500"
        onChange={(event) => setCountry(event.target.value)}>
          <option value="ARG">Argentina</option>
          <option value="MEX">México</option>
          <option value="CHL">Chile</option>
          <option value="PER">Perú</option>
        </select>
      </div>

      <button type="submit" className={"bg-lime-600 text-white text-3xl w-[190px] self-center rounded-lg p-1 "+titleFont.className}>Registrarse</button>

      <p className='text-center'>¿Ya tenés cuenta? <a onClick={handleRedirection} className='text-blue-500 cursor-pointer'>¡Ingresá!</a></p>
      

    </form>
  );
};
export default RegisterComponent;