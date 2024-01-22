"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
<div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-md mt-8 ">
        <h2 className="text-white text-xl mb-4 font-bold ">
          Restablecimiento de Contraseña
        </h2>
 {error && (
        <div className="mb-2">
          <h1>{error}</h1>
        </div>
      )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              className="w-full border border-gray-300 p-2 rounded-md"
             value={password}
          onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirmar Contraseña:
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirme su contraseña"
              className="w-full border border-gray-300 p-2 rounded-md"
            value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex justify-between">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Volver Atrás
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
</>
 );
};

export default TokenComponent; 