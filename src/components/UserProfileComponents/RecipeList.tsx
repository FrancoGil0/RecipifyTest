// import { iRecipeInfo } from "@/interfaces/recipeInterfaces"
import { iRecipeInfo } from "@/interfaces/recipeInterfaces"
import Link from "next/link"
import { ListLoader } from "./perfilLoadingComponents"



export default function RecipeList({ recipeList, title, subidas }: { recipeList:iRecipeInfo[], title: string, subidas: boolean }) {


    return (
        <div className="bg-neutral-300 w-full h-full lg:min-h-[400px] p-3 rounded-lg shadow-md border-2 border-[#b8b7b72c] mt-3">

            <div className="flex flex-col justify-between items-center text-md mb-3 h-[10%] ">
                <h3 className=" text-black text-left font-bold text-lg lg:text-2xl">{title}</h3>
                <h3 className=" text-black text-sm lg:text-lg text-left cursor-pointer hover:underline opacity-30 hover:opacity-60 ">{"Ver todas>>"}</h3>
            </div>

            <div className=" w-full h-[90%] rounded-lg flex flex-col gap-2 lg:mt-8">

                {recipeList?recipeList.map((recipe, index) => {
                    return (
                        <Link href={`http://localhost:3000/recetas/${recipe.id}`} className="text-inherit decoration-inherit" key={index}>
                        <div className="w-full min-h-[40px] max-h-[80px] bg-neutral-200  mx-auto  px-1 py-1  rounded-md flex items-center justify-center hover:scale-105 transition-all cursor-pointer text-sm flex-col overflow-hidden" >
                            <p className="text-center font-bold lg:text-lg">{recipe.title}</p>
                            {!subidas && <div className="">
                                <p className="text-sm font-thin">Por: {recipe.authorID}</p>
                            </div>}
                        </div>
                        </Link>
                    )
                }).slice(0,6):<ListLoader/>}

            </div>


        </div>
    )
}