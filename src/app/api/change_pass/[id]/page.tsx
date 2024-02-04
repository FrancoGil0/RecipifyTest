"use client"
import { useState } from "react";
import PassChangeForm from '@/components/perfilUser/PassChangeForm';
import { useEffect} from 'react'
import axios from "axios";
import {signOut} from "next-auth/react";
const Profile =  ({params}:{params: {id:string}}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
   if(params.id){
    axios.get(`http://localhost:3000/api/userback/perfil/${params.id}`).then((res)=>{
      setName(res.data.name)
    })
   }
  }, []);
  // const handleRedirect = (path:string) => {
  //   router.push(path);
  // };
  const onSubmit= async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const id=params.id
    const password=((event.currentTarget.elements.namedItem("password") as HTMLInputElement).value)
    const repeatPassword=((event.currentTarget.elements.namedItem("repeatPassword") as HTMLInputElement).value)
    const res = await fetch("http://localhost:3000/api/userback/perfil",{
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
    <PassChangeForm id={params.id}  name={name}  onSubmit={onSubmit} error={error} />
  );
};

export default Profile;