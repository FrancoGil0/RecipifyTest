"use client"

import { IUserInfo } from "@/interfaces/userInterfaces"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function GraciasPremiumView(){

    const [userName,setUserName]=useState("")
    const params = useParams()

    console.log(params.id , typeof params.id + "\n LOG DE PAGE gracias/[id]")

    const userID =params.id

 
    useEffect(()=>{

        const setRole = async () => {
            const response= await fetch(`http://localhost:3000/api/premium/gracias/${userID}`,{
            method:"GET",
        })
            if(response.ok){
                const data:IUserInfo= await response.json();
                console.log(data)
                setUserName(data.name)
            }
        }
        setRole()
    },[])


    return(
        <div className="min-h-screen bg-black">
            <p className="text-5xl text-green-400 text-center">Gracias por tu compra {userName? userName : "Crack xD"}</p>
            <Link href={'/recetas'}><div className="w-fit h-[40px] bg-green-400 text-center text-2xl rounded-lg mx-auto flex items-center justify-center p-3 mt-6">Ver Recetas</div></Link>
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