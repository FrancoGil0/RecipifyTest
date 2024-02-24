"use client"
import { useState } from "react";
import { useEffect } from 'react'
import axios from "axios";
import { signOut } from "next-auth/react";
import { titleFont } from "@/app/layout";
const Profile = ({ params }: { params: { id: string } }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (params.id) {
      axios.get(`http://localhost:3000/api/userback/perfil/${params.id}`).then((res) => {
        setName(res.data.name)
      })
    }
  }, []);
  // const handleRedirect = (path:string) => {
  //   router.push(path);
  // };
  const handleChangePass = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = params.id
    const password = ((event.currentTarget.elements.namedItem("password") as HTMLInputElement).value)
    const repeatPassword = ((event.currentTarget.elements.namedItem("repeatPassword") as HTMLInputElement).value)
    const res = await fetch("http://localhost:3000/api/userback/perfil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
        repeatPassword
      }),
    }
    );
    const responseAPI = await res.json();
    console.log("status" + res.status)
    if (res.ok) {
      // console.log(responseAPI)
      await signOut({ callbackUrl: "/api/login/signin" })
    }
    else {
      setError(responseAPI.message);
    }
  };
  return (
    <div className="min-h-screen pt-24  transition-all">

      <div className={"bg-neutral-300 h-fit cursor-default w-[450px] py-3 flex flex-col mx-auto shadow-md rounded-lg shadow-neutral-600 " + titleFont.className}>
        <p className="text-center text-2xl font-bold p-b   text-zync-700">Cambiá tu contraseña</p>
        {error && (
          <div className='mb-2'>
            <p style={{ color: "red" }}>{error}</p>
          </div>
        )}
        <form onSubmit={handleChangePass} className="flex flex-col text-center w-1/2 mx-auto">
          <label htmlFor="name" className="text-xl  text-zinc-500 py-2 text-left">Nueva Contraseña</label>
          <input
            className="h-[35px] bg-green-100 rounded-sm px-1 outline-none placeholder:opacity-50 placeholder:font-sans"
            type="password"
            autoFocus
            placeholder="Nueva Contraseña"
            id="password"
            name="password"
          />
          <label htmlFor="name" className="text-xl  text-zinc-500 py-2 text-left">Repetir Contraseña</label>
          <input
            className="h-[35px] bg-green-100 rounded-sm px-1 outline-none placeholder:opacity-50 placeholder:font-sans flex"
            type="password"
            autoFocus
            placeholder="Repite la Contraseña"
            id="repeatPassword"
            name="repeatPassword"
          />
          <button type="submit" className="mt-3 text-white text-2xl py-2 px-3 mx-auto w-fit rounded-lg bg-green-500">
            Cambiar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;