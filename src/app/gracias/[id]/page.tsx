"use client"

// import { IUserInfo } from "@/interfaces/userInterfaces"
import { useParams } from "next/navigation"
// import { useEffect, useState } from "react"

export default function GraciasPremiumView(){

    // const [user,setUser]=useState({}as IUserInfo)
    const params = useParams()

    console.log(params.id)

    // useEffect(()=>{

    //     async function getUser(id:string){
    //         const response=await fetch(`https://localhost:3000/api/userback/perfil/${id}`,{
    //         method:"POST",
    //         body:JSON.stringify({
    //             id
    //         })
    //     })
    //         if(response.ok){
    //             const data:IUserInfo= await response.json();
    //             setUser(data)
    //         }

            
    //     }
        
    //     getUser(params.id as string)


    // },[])


    return(
        <div className="min-h-screen bg-black">
            <p className="text-5xl text-green-400 text-center">Gracias por tu compra {user? user.id : "Crack!"}</p>
        </div>
    )
}