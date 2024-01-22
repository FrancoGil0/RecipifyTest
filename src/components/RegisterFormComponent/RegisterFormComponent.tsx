"use client"

import { FormEvent } from "react"
import axios from "axios";
import { NextResponse } from "next/server";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const RegisterFormComponent = () => {
  const router=useRouter()
  const handleSubmit= async (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const dataFormulario=new FormData(event.currentTarget)
    try{
      let country=dataFormulario.get("country")
      if(country===""){
        country="ARG";
      }
      const registerResponse=await axios.post("/api/auth/register",{
        name:dataFormulario.get("name"),
        email:dataFormulario.get("email"),
        password:dataFormulario.get("password"),
        country
      });
      console.log(registerResponse)
      
      const loginResponse= await signIn("credentials",{
        email:registerResponse.data.email,
        password:dataFormulario.get("password")
      })

      if(loginResponse?.ok){
        return router.push("/recetas")
      }
      return NextResponse.json({message:"Ocurrió un error"})
      
    }catch(error:any){
      return NextResponse.json({message:error.message});
    }

  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5  mt-5 items-center  text-2xl h-screen pb-5">
    <div>
    <label htmlFor="name" className="text-left">Nombre de Usuario:</label>
    <input type="text" 
    required
    minLength={5} maxLength={15} 
    placeholder="Escribe tu nombre de usuario..." 
    name="name" 
    id="name"
    className=" block bg-emerald-100 w-[300px] h-[65px] text-xl rounded-xl p-3 m-0"
    />
    </div>

    <div >
    <label htmlFor="email">Email:</label>
    <input type="email" 
    required
    placeholder="mail@ejemplo.com" 
    name="email" 
    id="email"
    className=" block bg-emerald-100 w-[300px] h-[65px] text-xl rounded-xl p-3 m-0"
    /> 
    </div>

    <div>
    <label htmlFor="password">Contraseña:</label>
    <input type="password" 
    required
    minLength={6} maxLength={64} 
    placeholder="*******" 
    name="password" 
    id="password"
    className=" block bg-emerald-100 w-[300px] h-[65px] text-xl rounded-xl p-3 m-0"
    />
    </div>

    <div>
    <label htmlFor="country">País:</label>
    <select name="country" 
    id="country" 
    className="block bg-emerald-100 w-[300px] h-[65px] text-xl rounded-xl p-3 m-0">
      <option value=""  >SELECCIONA TU PAÍS</option>
      <option value="ARG">Argentina</option>
      <option value="PER">Perú</option>
      <option value="URG">Uruguay</option>
      <option value="VZL">Venezuela</option>
      <option value="PAR">Paraguay</option>
      <option value="COL">Colombia</option>
      <option value="ECU">ECUADOR</option>
      <option value="MEX">México</option>
      <option value="CHL">Chile</option>
      <option value="BOL">Bolivia</option>
    </select>
    <p className="text-sm italic text-gray-400">*Default: Argentina.</p>
    </div>

    <div typeof="submit"></div>
    <button className="bg-emerald-400 px-4 py-2 rounded-xl text-slate-900" type="submit" >¡Unite Ahora!</button>

  </form>
  );
};
export default RegisterFormComponent;
