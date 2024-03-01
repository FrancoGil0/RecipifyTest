"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { titleFont } from "@/app/layout";

const TokenComponent = ({ params }: { params: { token: string } }) => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [tokenUsuario, setTokenUsuario] = useState("");
  const [error, setError] = useState();
  const router = useRouter();
  // const [succes, setSucces] = useState("");

  useEffect(() => {
    setTokenUsuario(params.token);
  }, [params.token]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/api/userback/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        repeatPassword,
        tokenUsuario,
      }),
    });
    const data = await res.json();
  
    if (res.status !== 201) {
      setError(data.message);
    } else {
      // setSucces("Su contraseña a sido cambiada exitosamente");
      router.push("/api/login/signin");
    }
  };
  return (
<>
<div className="min-h-screen pt-24  transition-all">

<div className={"bg-neutral-300 h-fit cursor-default w-[450px] py-3 flex flex-col mx-auto shadow-md rounded-lg shadow-neutral-600 " + titleFont.className}>
  <p className="text-center text-2xl font-bold p-b   text-zync-700">Cambiá tu contraseña</p>
  {error && (
    <div className='text-center mb-2'>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  )}
  <form onSubmit={handleSubmit} className="flex flex-col text-center w-1/2 mx-auto">
    <label htmlFor="name" className="text-xl  text-zinc-500 py-2 text-left">Nueva Contraseña</label>
    <input
      className="h-[35px] bg-green-100 rounded-sm px-1 outline-none placeholder:opacity-50 placeholder:font-sans"
      type="password"
      autoFocus
      placeholder="Nueva Contraseña"
      id="password"
      name="password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <label htmlFor="name" className="text-xl  text-zinc-500 py-2 text-left">Repetir Contraseña</label>
    <input
      className="h-[35px] bg-green-100 rounded-sm px-1 outline-none placeholder:opacity-50 placeholder:font-sans flex"
      type="password"
      autoFocus
      placeholder="Repite la Contraseña"
      id="repeatPassword"
      name="repeatPassword"
      onChange={(e) => setRepeatPassword(e.target.value)}
    />
    <button type="submit" className="mt-3 text-white text-2xl py-2 px-3 mx-auto w-fit rounded-lg bg-green-500">
      Cambiar
    </button>
  </form>
</div>
</div>
</>


 );
};

export default TokenComponent;