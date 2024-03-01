"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { titleFont } from "@/app/layout";

function PageEmail() {
  const router = useRouter();
  const [error, setError] = useState();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/api/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await res.json();
    if(res.status==201){
      router.push("/api/password/frontEmail/success");
    } else{
      setError(data.message)
    }
  };

  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen pt-24  transition-all">

      <div className={"bg-neutral-300 h-fit cursor-default w-[450px] py-3 flex flex-col mx-auto shadow-md rounded-lg shadow-neutral-600 " + titleFont.className}>
        <p className="text-center text-2xl font-bold p-b   text-zync-700">Ingresa tu correo</p>
        {error && (
          <div className='text-center mb-2'>
            <p style={{ color: "red" }}>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col text-center w-1/2 mx-auto">
          <input
            className="h-[35px] bg-green-100 rounded-sm px-1 outline-none placeholder:opacity-50 placeholder:font-sans"
            type="text"
            autoFocus
            placeholder="email@gmail"
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" className="mt-3 text-white text-2xl py-2 px-3 mx-auto w-fit rounded-lg bg-green-500">
            Enviar
          </button>
        </form>
      </div>
    </div>
    /*
        <div className="min-h-screen pt-24  transition-all">

      <div className={"bg-neutral-300 h-fit cursor-default w-[450px] py-3 flex flex-col mx-auto shadow-md rounded-lg shadow-neutral-600 " + titleFont.className}>
        <p className="text-center text-2xl font-bold p-b   text-zync-700">Ingresa tu correo</p>
        {error && (
          <div className='mb-2'>
            <p style={{ color: "red" }}>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col text-center w-1/2 mx-auto">
          <label htmlFor="name" className="text-xl  text-zinc-500 py-2 text-left">Nueva Contraseña</label>
          <input
            className="h-[35px] bg-green-100 rounded-sm px-1 outline-none placeholder:opacity-50 placeholder:font-sans"
            type="text"
            autoFocus
            placeholder="Nueva Contraseña"
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" className="mt-3 text-white text-2xl py-2 px-3 mx-auto w-fit rounded-lg bg-green-500">
            Enviar
          </button>
        </form>
      </div>
    </div>
    */
  );
}

export default PageEmail;