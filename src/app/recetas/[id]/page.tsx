"use client"
import { Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { titleFont } from "@/app/layout";
import { useState } from "react";
import CopyToClipboardButton from "@/app/api/copyClipboard/page";
import NextLink from 'next/link'
import { useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { iRecipeAndRelations } from "@/interfaces/recipeInterfaces";
import { IUserInfo } from "@/interfaces/userInterfaces";
import { categoriasInterface } from "@/interfaces/categoriasInterface";
import { CancelScheduleIcon, ConfirmScheduleIcon, FilledStar, ScheduleIcon, StrokedStar } from "@/components/icons";
import { useRouter } from "next/navigation";

const Recipe = ({ params }: { params: { id: string } }) => {

    const router=useRouter()
    const [rating, setRating] = useState(0);
    const { data: session } = useSession()
    const [recipe, setRecipe] = useState({} as iRecipeAndRelations);
    const [habilitar, setHabilitar] = useState(false)
    const [visibility, setvisibility] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    // const [loading, setLoading] = useState(false)
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

    const author: IUserInfo = recipe.author
    const categoria: categoriasInterface = recipe.categoria

    const authorName: string = author ? author.name : "cargando..."

    const categoriaName: string = categoria ? categoria.name : "cargando..."

    const condition = session?.user.id === recipe.authorID


    const handlevisibility = () => {
        setvisibility(!visibility)
    }

    const handleEliminarReceta= async ()=>{
        setLoadingSubmit(true);
        const response= await  fetch("http://localhost:3000/api/userback/recetas", {
            method:"DELETE",
            body: JSON.stringify({id: recipe.id})
        })
        response.ok? router.push('/recetas'):router.push('/recetas/'+recipe.id)
        setLoadingSubmit(false);
    }


    const handleFavorite = (value: boolean) => {

        axios.post("http://localhost:3000/api/favorite", {
            // valoracion: value,
            userID: session?.user.id,
            recipeID: recipe.id
        })

        setFavorite(value)
    }

    const handleScheduleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const idReceta = recipe.id
        const idUser = session?.user.id
        const date = ((event.currentTarget.elements.namedItem("date") as HTMLInputElement).value);
        const horario = ((event.currentTarget.elements.namedItem("horario") as HTMLInputElement).value);


        const res = await fetch("http://localhost:3000/api/userback/recetas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idReceta,
                idUser,
                date,
                horario
            }),
        });

        if (res.status == 200) {
            router.push('/recetas/' +recipe.id);
        }
    };

    return (
        <div className="min-h-screen min-w-screen relative py-10">

            {session?.user.id === recipe.authorID ? <div className='absolute top-[33%] right-[20%]'>
            <Dropdown className='shadow-xl' placement='bottom-end'>
                <DropdownTrigger className='cursor-pointer'>
                    <h1 className='text-5xl'>...</h1>
                </DropdownTrigger>
                <DropdownMenu aria-label="Menu Actions" variant="faded">
                    <DropdownItem className='text-black font-bold h-[50px]'><Link href={`/recetas/editar/${recipe.id}`} className='text-inherit hover:text-inherit'>Editar Receta</Link></DropdownItem>
                    <DropdownItem onClick={handleEliminarReceta} className='text-red-500 font-bold h-[50px]'>Borrar Receta</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </div> : <></>}


            {visibility && <div className="absolute lg:top-[34%] lg:right-[20%] z-0 w-[300px] h-fit bg-emerald-700 flex flex-col items-center px-2 py-3 rounded-lg shadow-md shadow-neutral-600 ">
                <p className={titleFont.className + " text-2xl text-white"}>Agendala</p>
                <p className={titleFont.className + " text-lg text-white hyphens-auto text-center mb-3"}>para prepararla después</p>
                <form onSubmit={handleScheduleSubmit} className=" w-full flex flex-col gap-3">
                    <input type="datetime-local" name="date" id="date" />
                    <select name="horario" id="horario" required defaultValue={"Almuerzo"}>
                        <option value="Desayuno">Desayuno</option>
                        <option value="Almuerzo">Almuerzo</option>
                        <option value="Media_Tarde">Media Tarde</option>
                        <option value="Cena">Cena</option>
                    </select>
                    <div className="flex mx-auto gap-3 ">
                        <div className={titleFont.className + " text-2xl text-green-600 h-[30px] w-[30px] flex items-center justify-center rounded-[100%]  px-1 py-1 bg-white"}>
                            <button type="submit" ><ConfirmScheduleIcon /></button>
                        </div>
                        <div onClick={handlevisibility} className={titleFont.className + " cursor-pointer text-2xl text-red-600  h-[30px] w-[30px] flex items-center justify-center rounded-[100%] bg-white"}>
                            <CancelScheduleIcon />
                        </div>
                    </div>
                </form>
            </div>}


            <div className="lg:w-8/12 mx-auto bg-green-200  flex flex-col items-center  shadow-xl rounded-lg overflow-hidden px-6 pb-3 pt-6 cursor-default">

                <div className="lg:h-[250px] w-full overflow-hidden  rounded-md shadow-xl">
                    <Image src={recipe.photo} alt="recipe photo" className="object-cover w-full h-full" width={500} height={500} />
                </div>

                <div className="flex flex-col h-[150px] w-full overflow-hidden  mt-2">
                    <div className="flex justify-center items-center  gap-3 ">
                        <p className={`text-4xl text-center ${titleFont.className}`}>{recipe.title}</p>
                        {favorite === false ? <div onClick={() => handleFavorite(!favorite)} className="lg:w-[50px] lg:h-[50px] cursor-pointer"><StrokedStar /></div> :
                            <div className="w-[50px] h-[50px] cursor-pointer" onClick={() => handleFavorite(!favorite)}><FilledStar /></div>
                        }
                        <div className="w-[33px] h-[33px] cursor-pointer flex" onClick={handlevisibility}>
                            <ScheduleIcon />
                        </div>

                    </div>
                    <div className="flex self-center gap-3 mt-3">
                        <p className="text-xl"><span className={` ${titleFont.className}`}>Subida por:</span> <span className="capitalize">{authorName}</span></p>
                        <p className="text-xl"><span className={` ${titleFont.className}`}>En:</span> {categoriaName}</p>
                        <p className="text-xl"><span className={` ${titleFont.className}`}>Rating:</span> {rating}</p>
                    </div>
                    {!condition && <div className="self-center">
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
                    <span className={`text-2xl ${titleFont.className}`}>Pasos:</span><br />
                    <p className="text-lg text-center">
                        {recipe.pasos}
                    </p>

                </div>


                <div className=" text-lg flex flex-col items-center w-full justify-around h-[50px] bg-green-400 rounded-lg py-8 px-3">

                    <p className={`self-start ${titleFont.className} text-center`}>Compartir en:</p>
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
        </div>
    );
};

export default Recipe; 