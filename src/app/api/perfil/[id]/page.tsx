"use client"
import React, { useState } from "react";
import UserPerfil from '@/components/perfilUser/perfilComponent';
import { useRouter } from "next/navigation";
import { useEffect} from 'react'
import axios from "axios";
import {signOut} from "next-auth/react";
const Profile =  ({params}:{params: {id:string}}) => {
  const router= useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
   if(params.id){
    axios.get(`http://localhost:3000/api/userback/perfil/${params.id}`).then((res)=>{
      setName(res.data.name)
      setEmail(res.data.email)
    })
   }
  }, []);
  const handleRedirect = (path:string) => {
    router.push(path);
  };
  const onSubmit= async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const id=params.id
    const name=((event.currentTarget.elements.namedItem("name") as HTMLInputElement).value)
    const email=((event.currentTarget.elements.namedItem("email") as HTMLInputElement).value)
    const password=((event.currentTarget.elements.namedItem("password") as HTMLInputElement).value)
    const repeatPassword=((event.currentTarget.elements.namedItem("repeatPassword") as HTMLInputElement).value)
    const res = await fetch("http://localhost:3000/api/userback/perfil",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          email,
          password,
          repeatPassword
        }),
      }
    );
    const responseAPI = await res.json();
    console.log("status"+res.status)
    if(res.ok){
      // console.log(responseAPI)
      await signOut({callbackUrl: "/"}) 
    }
    else{
      setError(responseAPI.message);
    }
  };
  return (
    <>
    <UserPerfil id={params.id}  name={name}  email={email} onSubmit={onSubmit} error={error} />
    </>
  );
};

export default Profile;