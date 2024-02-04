"use client"
import { iRecipeInfo } from "@/interfaces/recipeInterfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertIcon, EyeIcon, ResetIcon } from "../icons";
import {useRouter} from "next/navigation";


const DeletedRecipes = () => {

    const router= useRouter();

    const [recipes, setRecipes] = useState([] as iRecipeInfo[])
    type confirmationObject={
        visibility:Boolean,
        recipeId:number|null
    }


    const [confirmationDiv, setConfirmationDiv] = useState({} as confirmationObject);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:3000/api/deleted-recipes", {
                method: "GET",
            });
            const deletedRecipes = await response.json();
            setRecipes(deletedRecipes);
        };



        fetchUsers();

    }, [recipes]);

    const handleConfirmation = ({recipeId,visibility}:confirmationObject)=>{
        setConfirmationDiv({
            recipeId,
            visibility
        })
    }

    const handleResetRecipe = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const idRecipe = ((event.currentTarget.elements.namedItem("idRecipe") as HTMLInputElement).value)
        const res = await fetch("http://localhost:3000/api/admin", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idRecipe: idRecipe
            }),
        });

        if (res.ok) {
            router.push("/admin");
        }
        setConfirmationDiv({
            recipeId:null,
            visibility:false
        })
    }


    return (
        <div className="lg:min-h-[700px]  py-12">

            {recipes.length > 0 ? (

                <div className="lg:w-[950px] lg:h-[500px]  mx-auto">
                    <table className=" w-full table-fixed ">
                        <thead>
                            <tr className="bg-neutral-400 w-full">
                                <th className="w-1/3 p-2">Subida por:</th>
                                <th className="w-1/3 p-2">Receta</th>
                                <th className="w-1/3 p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="gap-3 h-full ">
                            {recipes.map((recipe, i) => (
                                <tr className={i % 2 === 0 ? "text-center h-[10px] hover:bg-emerald-400  transition-all bg-emerald-100 rounded-[50px]" : "text-center hover:bg-emerald-400  h-[15px] transition-all  rounded-[50px] bg-emerald-200"} key={recipe.id}>
                                    <td className="lg:min-w-1/3 lg:w-1/3 lg:max-w-1/3 mx-auto p-1">{recipe.title}</td>
                                    <td className=" lg:min-w-1/3 lg:w-1/3 lg:max-w-1/3 mx-auto p-1">{recipe.title}</td>
                                    <td className=" lg:min-w-1/3 lg:w-1/3 lg:max-w-1/3 mx-auto p-1">
                                        <div className="flex gap-6 justify-center items-center">
                                            <Link className="pt-2" href={`/recetas/${recipe.id}`}>
                                                <button className="hover:animate-spin"><EyeIcon /></button>
                                            </Link>
                                                <button className="hover:animate-spin" onClick={()=>handleConfirmation({recipeId:recipe.id,visibility:true})}><ResetIcon/></button>
                                            
                                        </div>
                                    </td>
                                </tr>
                            ))}1
                        </tbody>
                    </table>
                    {confirmationDiv.visibility && <div className="absolute flex flex-col items-center justify-between top-[22%] left-[40%] pt-6  w-[400px] h-[300px] bg-neutral-700">
                        <div className="text-center text-2xl text-green-500 mx-auto flex items-center justify-center w-full">
                            <AlertIcon className={"h-16 w-16 animate-ping text-center"}></AlertIcon>
                        </div>
                        <p className="text-white text-center mt-3 text-[50px]">Alerta</p>
                        <p className="text-white text-center">Estás a punto de reestablecer una reseta reportada.</p>
                        <p className="text-white text-center">¿Estas seguro?</p>
                        <form className="w-full flex items-center justify-center h-[30px]  bg-red-50" onClick={(event) => handleResetRecipe(event)}>
                        <input type="hidden" name="idRecipe" value={confirmationDiv.recipeId as number} />
                            <button type="submit" className="bg-green-700 text-white w-full h-full">
                                Reestablecer Receta
                            </button>
                        </form>
                    </div>}
                </div >
            ) : (
                <div className=" lg:container">No hay reportes</div>
            )
            }


        </div>

    )
}

export default DeletedRecipes