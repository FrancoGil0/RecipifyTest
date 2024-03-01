"use client"

import { titleFont } from "@/app/layout"
import { IUserInfo } from "@/interfaces/userInterfaces"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function GraciasPremiumView(){

    const [userName,setUserName]=useState("")
    const params = useParams()


    const userID =params.id

    const url=process.env.TUNNEL_URL+"/api/premium/gracias/"+userID


 
    useEffect(()=>{

        const setRole = async () => {
            const response= await fetch(url,{
            method:"GET",
        })
            if(response.ok){
                const data:IUserInfo= await response.json();
                setUserName(data.name)
            }
        }
        setRole()
    },[])


    return(
        <div className="min-h-screen antialiased">
            <div className="mx-auto bg-green-50 w-fit px-3 py-5 mt-10 rounded-lg shadow-md shadow-[#333]">
            <p className={"text-5xl py-3 text-green-400 text-center "+titleFont.className}>Gracias por tu compra {userName? userName : "🤑"}</p>
            <p className={"text-center text-bold py-5 text-[20px] "+titleFont.className}>
            <Link href={'/'} className=" text-sky-400 hover:underline">Volvé al Inicio</Link> o <Link href={"/recetas"} className="text-sky-400 hover:underline">descubrí nuevas recetas</Link>
            </p>

            </div>
        </div>
    )
}



   // useEffect(()=>{

    //     const setRole = async () => {
    //         const response= await fetch(`http://localhost:3000/api/premium/gracias/${userID}`,{
    //         method:"POST",
    //         body:JSON.stringify({
    //             id:userID as string
    //         })
    //     })
    //         if(response.ok){
    //             const data:IUserInfo= await response.json();
    //             console.log(data)
    //             setUserName(data.name)
    //         }
    //     }
    //     setRole()
    // },[])