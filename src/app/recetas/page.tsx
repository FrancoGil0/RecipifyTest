"use client"
import { ThreeDots } from 'react-loading-icons'
import { useEffect, useState } from "react"
import RecipeCard from "@/components/recipeCard-component/RecipeCard"
import Pagination from "@/components/pagination-component/Pagination"
import { iRecipeInfo } from "@/interfaces/recipeInterfaces"
import { useSession } from 'next-auth/react'
// import { categoriasInterface } from '@/interfaces/categoriasInterface'

const MainPage = () => {


    const [loading, setLoading] = useState(true)
    const [recipes, setRecipes] = useState([] as iRecipeInfo[])
    const [recipesPerPage, setRecipesPerPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)


    const lastIndex = currentPage * recipesPerPage
    const firstIndex = lastIndex - recipesPerPage


    const { data: session } = useSession()


    useEffect(() => {

        const fetchUsers = async () => {

            const response = await fetch("http://localhost:3000/api/recetas", {
                method: "GET",
                headers: {
                    authorization: `${session?.user.accessToken}`,
                    "Content-Type": "aplication/json"
                },
                mode: "cors"
            });

            const recipes = await response.json();
            setLoading(false);
            setRecipes(recipes);
        }
        setRecipesPerPage(3)
        fetchUsers()
    }, [])

    const handleReported=  (idRecipe:string,idUser:string)=>{
        const res = fetch("http://localhost:3000/api/admin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idRecipe,
                idUser
            }),
          });
        }

    return (
        <>
            <main className="w-screen min-h-screen">

                <Pagination currentPage={currentPage} recipesPerPage={recipesPerPage} setCurrentPage={setCurrentPage} totalRecipes={recipes.length}></Pagination>
                {loading &&
                    <div className='flex items-center justify-center'>
                        <ThreeDots fill='#34D399' />
                    </div>
                }
                <div className="flex flex-col md:flex-row gap-3 md:flex-wrap md:justify-evenly md:gap-10 p-3 sm:p-0">
                    {recipes.map((recipe: iRecipeInfo) => (
                        // <RecipeCard {...recipe} key={recipe.id}/>
                        <RecipeCard recipe={recipe} handleReported={handleReported}/>
                        // <RecipeCard id={recipe.id} title={recipe.title} photo={recipe.photo} author={recipe.author} description={recipe.description} categoria={recipe.categoria as categoriasInterface} key={recipe.id} />
                    )).slice(firstIndex, lastIndex)}
                </div>
            </main>
        </>
    )
}

export default MainPage