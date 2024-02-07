"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function CategoriaComponent() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3000/api/userback/categoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    const responseAPI = await res.json();

    if (res?.ok) {
      router.push("/");
    } else {
      setError(responseAPI.message)
    }
  };

  return (
    <div className="min-h-[100svh] flex flex-col py-24 ">
      {error && (
        <div >
          <p style={{ color: "red" }}>
            {error}
          </p>
        </div>
      )}
      <div className="bg-neutral-400 h-[200px] cursor-default w-[450px] py-3 flex flex-col mx-auto shadow-md rounded-lg shadow-neutral-600">

        <p className="text-center text-2xl font-bold p-b   text-white">Creá una categoría nueva</p>
        <form onSubmit={handleSubmit} className="flex flex-col text-center w-1/2 mx-auto">
          <label htmlFor="name" className="text-xl underline underline-offset-2 text-zinc-950 py-2">Nombre de la Categoría</label>
          <input
          className="h-[40px] bg-green-100 rounded-sm px-1 outline-none placeholder:opacity-50"
            type="text"
            autoFocus
            placeholder="Escribe el nombre aquí..."
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button type="submit" className="mt-3 text-zinc-950 text-2xl py-1 rounded-lg bg-green-500">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoriaComponent;