"use client"
import { titleFont } from "@/app/layout";
import { useState } from "react";
import CopyToClipboardButton from "@/app/api/copyClipboard/page";
import { useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { iRecipeAndRelations } from "@/interfaces/recipeInterfaces";
import { IUserInfo } from "@/interfaces/userInterfaces";
import { categoriasInterface } from "@/interfaces/categoriasInterface";
import { FilledStar, StrokedStar } from "@/components/icons";

const Recipe = ({ params }: { params: { id: string } }) => {
    const [rating, setRating] = useState(0);
    const { data: session} = useSession()
    const [recipe, setRecipe] = useState({} as iRecipeAndRelations);
    const [habilitar, setHabilitar] = useState(false)
    const stars = [1, 2, 3, 4, 5]
    
    
    
    
    const [valoracion, setValoracion] = useState(0)
    const [favorite, setFavorite] = useState(false);

    
    // useEffect(() => {
    //     function favoriteCondition(){

    //         let users:any[]=[]
            
    //         recipe.favorites?.forEach((favorito)=>{
    //             users.push(favorito.likedBy.id);
    //         })

    //             console.log(users)
    //             const condition = users.some((element)=>{
    //                 element === session?.user.id
    //             })
    //             setFavorite(condition)
    //         }

    //         favoriteCondition()

    //         console.log(favorite)
    // },[])



    const handleClick = (value: number) => {
        setHabilitar(true)
        setValoracion(value)

        axios.get(`http://localhost:3000/api/userback/recetas/${params.id}`)
            .then((res) => {
                setRating(res.data.rating)
            })


        axios.post("http://localhost:3000/api/review", {
            valoracion: value,
            idUsuario: session?.user.id,
            idRecipe: recipe.id

        })
    };






    useEffect(() => {
        if (
            params.id
        ) {
            axios
                .get(`http://localhost:3000/api/recipes/${params.id}`)
                .then((res) => {
                    setRecipe(res.data as iRecipeAndRelations)
                });
        }
    }, [valoracion, rating]);


    



    const ingredients: string = recipe.ingredients as string

    const author:IUserInfo=recipe.author
    const categoria:categoriasInterface=recipe.categoria

    const authorName:string=author? author.name : "cargando..."

    const categoriaName:string=categoria? categoria.name : "cargando..."

    const condition = session?.user.id === recipe.authorID



    const handleFavorite=(value:boolean)=>{
        
        axios.post("http://localhost:3000/api/favorite", {
            // valoracion: value,
            userID: session?.user.id,
            recipeID: recipe.id
        }) 

        setFavorite(value)
    }

    return (
        <div className="lg:h-screen lg:mb-10 lg:w-[1000px] bg-green-200 m-auto h-[750px] flex flex-col items-center py-[20px] px-[30px] text-left shadow-xl rounded-lg overflow-hidden mt-5 cursor-default">
            <div className="h-[250px] w-full overflow-hidden  rounded-lg shadow-xl">
                <Image src={recipe.photo} alt="recipe photo" className="object-cover w-full h-full" width={500} height={500} />
            </div>

            <div className="flex flex-col h-[150px] w-full overflow-hidden mt-4">
                <div className="flex justify-center items-center gap-3">
                <p className={`text-4xl text-center ${titleFont.className}`}>{recipe.title}</p>
                {favorite===false ?<div onClick={()=>handleFavorite(!favorite)} className="lg:w-[50px] lg:h-[50px] cursor-pointer"><StrokedStar/></div>: 
                <div className="w-[50px] h-[50px] cursor-pointer" onClick={()=>handleFavorite(!favorite)}><FilledStar/></div> 
                }

                </div>
                <div className="flex self-center gap-10 mt-3">
                    <p className="text-xl"><span className={` ${titleFont.className}`}>Subida por:</span> {authorName}</p>
                    <p className="text-xl"><span className={` ${titleFont.className}`}>En:</span> {categoriaName}</p>
                    <p className="text-xl"><span className={` ${titleFont.className}`}>Rating:</span> {rating}</p>
                </div>
              {!condition &&  <div className="self-center">
                    {!habilitar && (
                        <div className="cursor-pointer bg-green-400 w-fit flex justify-center mt-3 px-2 py-1 gap-3 rounded-xl ">
                            <span className={`text-xl ${titleFont.className}`}>Puntuá la receta:</span>
                            {stars.map((star) => (
                                <div
                                    className={`star ${star <= rating ? "active" : ""} text-xl w-[30px] h-[30px] rounded-xl cursor-pointer hover:text-green-100 hover:bg-green-600 hover:scale-110 hover:translate-y-[-5px] transition-all text-center`}
                                    key={star}
                                    onClick={() => handleClick(star)}
                                >{star}</div>
                            ))}
                        </div>
                    )}
                    {habilitar && valoracion > 0 && (
                        <div className="bg-green-400 w-full p-2 flex justify-between items-center gap-3 rounded-xl text-lg font-bold mt-2 ">
                            <p>¡Gracias por tu valoración!</p>
                            <p>¡Otorgaste {valoracion} puntos!</p>
                        </div>
                    )}
                </div>}
            </div>

            <div className="w-full h-[300px]">
                <span className={`text-2xl ${titleFont.className}`}>Descripción:</span><br />
                <p className="text-lg text-center">
                    {recipe.description}
                </p>
                <span className={`text-2xl ${titleFont.className}`}>Ingredientes:</span><br />
                <p className="text-lg text-center">
                    {ingredients}
                </p>

            </div>


            <div className=" text-lg flex flex-col items-center w-full justify-around h-[50px] bg-green-400 rounded-xl py-8 px-3">
                <p className={`self-start ${titleFont.className}`}>Compartir en:</p>

                <div className="flex items-center w-full justify-around">
                    <CopyToClipboardButton url={`https://localhost:3000/recetas/${params.id}`} />

                    <a className="font-bold" href={`https://www.facebook.com/sharer/sharer.php?u=https://www.localhost:3000/recetas/${params.id}`} target="_blank">
                        Facebook
                    </a>

                    <a className="font-bold" href={`https://twitter.com/intent/tweet?url=http://localhost:3000/recetas${params.id}`} target="_blank">
                        Twitter
                    </a>
                    <a className="font-bold" href={`https://wa.me/?text=https://www.localhost:3000/recetas${params.id}`} target="_blank">
                        WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Recipe; 