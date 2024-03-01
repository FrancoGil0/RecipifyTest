"use client"
import { titleFont } from "@/app/layout"
import { ListLoader } from "@/components/UserProfileComponents/perfilLoadingComponents"
import { CancelIcon, DeleteRecipeIcon } from "@/components/icons"
import { iRecipeInfo } from "@/interfaces/recipeInterfaces"
import { iUserWithRecipes } from "@/interfaces/userInterfaces"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import { stringify } from "querystring"
import { useEffect, useState } from "react"


interface iAgenda {
    id: number
    userID: number
    recipeID: number
    schDate: Date
    schTime: String
    schBy: iUserWithRecipes
    schRecipe: iRecipeInfo
}


export default function AgendaView() {

    const router= useRouter();
    const params = useParams()
    const id = params.id

    const [recetas, setRecetas] = useState([] as iAgenda[])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/agenda/' + id);
                if (response.ok) {
                    const recipes = await response.json();
                    setRecetas(recipes);
                    setLoading(false)
                } else {
                    console.error('Error al obtener datos del servidor:', response.status);
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        };
        fetchData();
    }, [recetas])

    const handleDelete=async (id:number)=>{


        const response=await fetch('http://localhost:3000/api/agenda/'+id,{
            method: 'DELETE',
            body:JSON.stringify({id})
        })

        if(response.ok){
            router.push("http://localhost:3000/agenda/"+params.id)
        }

    }


    return (
        <div className="min-h-screen">
            <div className="bg-neutral-300  w-full h-full lg:min-h-[400px] max-w-[600px] mx-auto p-3 rounded-lg shadow-md border-2 border-[#b8b7b72c] mt-3">

                <div className="flex flex-col justify-between items-center text-md mb-3 h-[10%] ">
                    <h3 className={" text-black text-left font-bold text-lg lg:text-2xl "+titleFont.className}>{"Recetas Agendadas"}</h3>
                </div>

                <div className=" w-full h-[90%] rounded-lg flex flex-col gap-2 lg:mt-8">

                    {loading===false?recetas.length!==0 ? recetas.map((schRecipe, index) => {
                        return (
                            <div className=" relative">
                                <Link href={`http://localhost:3000/recetas/${schRecipe.recipeID}`} className="text-inherit decoration-inherit" key={index}>
                                <div className="w-full min-h-[40px] max-h-[80px] bg-neutral-200  mx-auto  px-1 py-1  rounded-md flex items-center justify-center hover:scale-105 transition-all cursor-pointer text-sm flex-col overflow-hidden" >
                                    <p className="text-center font-bold lg:text-lg">{schRecipe.schRecipe.title}</p>
                                    <p>{schRecipe.schTime} para el: {schRecipe.schDate.toString().slice(5,10)}</p>
                                    {<div className="">
                                        <p className="text-sm font-thin">Subida por: {schRecipe.schBy.name}</p>
                                    </div>}
                                </div>
                            </Link>
                            <div onClick={()=>handleDelete(schRecipe.id)} className="absolute z-10 top-3 right-2 cursor-pointer w-[20px] h-[20px]"><DeleteRecipeIcon/></div>
                            </div>
                        )
                    }): <div className={"mx-auto "+titleFont.className}>
                        <p>No hay recetas agendadas</p>
                        </div>:<ListLoader />}

                </div>


            </div>
        </div>
    )
}