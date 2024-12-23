"use client"

import ProfileCard from "@/components/UserProfileComponents/ProfileCard"
import ProfileCarrousel from "@/components/UserProfileComponents/ProfileCarousel"
import RecipeList from "@/components/UserProfileComponents/RecipeList"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { iUserWithRecipes } from "@/interfaces/userInterfaces"
import { iRecipeAndRelations, iRecipeInfo } from "@/interfaces/recipeInterfaces"
import '@/components/UserProfileComponents/loaders.css'
import { iFavorite } from "@/interfaces/reviewsInterfaces"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"



export default function userProfile() {

    const { data: session, status } = useSession()

    const router = useRouter()

    






    const paramsID = usePathname().slice(8)
    const [user, setUser] = useState({} as iUserWithRecipes)
    const[recipeList,setRecipeList]=useState([] as iRecipeAndRelations[])

    useEffect(()=>{
        const fetchFavorites=async ()=>{
            
                const response = await fetch('http://localhost:3000/api/userback/favoritos/' + paramsID);
                if (response.ok) {
                    const data:iFavorite[] = await response.json();
                    const recipes:iRecipeAndRelations[]=[]
                    data.map((favorito)=>{
                        return recipes.push(favorito.likedRecipe)
                    }) 
                    
                    setRecipeList(recipes);
                    
                } else {
                    console.error('Error al obtener datos del servidor:', response.status);
                }
            
        }
        fetchFavorites();
    },[])


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/userback/perfil/' + paramsID);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error('Error al obtener datos del servidor:', response.status);
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        };

        fetchUser();

        console.log(user)
    }, [])
    
    if (status === "unauthenticated") {
        return(
            <div className="min-h-screen">
                <div className="mx-auto flex flex-col rounded-lg justify-evenly items-center bg-zinc-600 text-red-500 w-[400px] h-[200px]">
                    <p className="text-2xl text-center">No tenés acceso a esta página, por favor iniciá sesión</p>
                    <div onClick={()=>router.push("/api/login/signin")} className="cursor-pointer text-white rounded-lg px-2 py-1 bg-green-500">Ir al LogIn</div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen  max-w-screen py-8">

            <div className="w-full   mx-auto rounded-2xl flex flex-col px-3 py-3 lg:flex-row gap-3 ">

                <ProfileCard id={user.id as number} profileDescription={user.profileDescription as string} country={user.country} email={user.email} name={user.name} className="w-full h-full lg:w-3/12 bg-neutral-300 rounded-lg shadow-md border-2 mb-3 border-[#b8b7b72c] lg:mt-3 lg:ml-2 py-5 px-5" />



                <div className=" rounded-xl gap-3 lg:w-9/12 px-3 py-3">
                    <div className="bg-neutral-300 w-full h-2/5  rounded-lg shadow-md border-2 border-[#b8b7b72c]">
                        <h3 className="text-2xl text-center mb-3 font-bold pt-1 lg:pt-3">Recetas Populares</h3>
                        <ProfileCarrousel recipeList={user.posts as iRecipeAndRelations[]} />
                    </div>


                    <div className=" w-full h-full flex gap-x-2 lg:h-3/5">

                        <RecipeList recipeList={user?.posts as iRecipeInfo[]} title="Recetas Subidas"  />
                        <RecipeList recipeList={recipeList} title="Recetas Favoritas"/>

                    </div>

                </div>
            </div>


        </div>
    )

}



{/*const recetas = [{
        title: "Pizza a la Piedra",
        author: "RobertoCarlos",
    }, {
        title: "Tallarines con salsa blanca",
        author: "Mastercoso 1.6",
    }, {
        title: "receta 3",
        author: "chef 3",
    }, {
        title: "receta 4",
        author: "chef 4",
    }, {
        title: "receta 5",
        author: "chef 5",
    }, {
        title: "receta 6",
        author: "chef 6",
    }, {
        title: "receta 7",
        author: "chef 7",
    }
        , {
        title: "receta 8",
        author: "chef 8",
    }
        , {
        title: "receta 8",
        author: "chef 8",
    }
        , {
        title: "receta 8",
        author: "chef 8",
    }
        , {
        title: "receta 8",
        author: "chef 8",
    }
    ] */}