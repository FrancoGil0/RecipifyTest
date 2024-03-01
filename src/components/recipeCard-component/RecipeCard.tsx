"use client"
import Link from 'next/link'
import './RecipeCard.css'
import Image from 'next/image'
import { iRecipeInfo } from '@/interfaces/recipeInterfaces'
import { ReportIcon,CheckedIcon } from '../icons'
import { ReactNode, useState } from 'react'

import { titleFont } from '@/app/layout'
// const RecipeCard = ({ id, title, photo, description, author, categoria }: { id: number, title: string, photo: string, description: string, author: IuserInfo, categoria:categoriasInterface}) => {
// const RecipeCard = (recipe:iRecipeInfo) => {
const RecipeCard =({recipe,handleReported}:{recipe:iRecipeInfo, handleReported:any})=>{
    const createdAt=recipe.createdAt.slice(0,10)
    // const ingredients = recipe.ingredients.split(",")

     const [warning,setWarning]=useState(false)
     const [content,setContent]=useState<ReactNode>(<span>Aceptar</span>)

     const handleWaring=()=>{
        setWarning(!warning)
     }



     const handleConfirmation=()=>{
         
         setContent(<CheckedIcon></CheckedIcon>)
         // handleReported(recipe.id,recipe.authorID)
         setTimeout(() => {
             handleWaring()
             setContent(<span>Aceptar</span>)
        }, 2000);
     }

    return (
        <section className='relative flex flex-col w-[450px] h-[500px] justify-between bg-green-200 rounded-2xl border-none border-[3px] hover:border-green-900 shadow-lg shadow-black hover:shadow-green-900 overflow-hidden '>
            <div className='mb-5 w-full h-1/3  self-center border-none'>
                <Image className='w-full h-full  object-cover border-none ' src={recipe.photo} alt='Foto - receta' width={500} height={500}></Image>
            <div className='relative self-center text-center pt-[3px] pb-[8px] w-full  bg-neutral-600 '>
                <p className='text-3xl text-neutral-200 first-letter:uppercase'>{recipe.title}</p>
            </div>
            </div>
            <div className="felx flex-col w-full overflow-hidden ">
                <div className=' text-slate-600 flex flex-col p-4 '>
                    <p className=' text-slate-900 text-xl font-bold text-center'>Descripción</p>
                    <p className='text-left first-letter:text-slate-950 first-letter:font-bold first-letter:uppercase'>
                        {recipe.description}
                    </p>
                </div>

            </div>
            <div className='flex px-3 items-center justify-between  w-full '>
                <p className='text-center'><span className='text-slate-900 font-bold'>Categoría:</span> <br /> <span className='font-mediums'>{recipe.categoria.name}</span> </p>
                <p><span className='font-bold text-black'>Por:</span> <br /> <Link href={`/`}><p className='text-slate-900  inline-block first-letter:uppercase'>{recipe.author.name}</p></Link> </p>
                <p className='text-center'><span className='text-slate-900 font-bold'>Subida el:</span> <br /> <span className='font-medium'>{createdAt}</span></p>
            </div>
            <div className=' h-[100px] w-full flex justify-evenly items-center p-3'>
                <Link className=' no-underline hover:text-inherit text-inherit' href={`/recetas/${recipe.id}`}>
                    <div className='bg-emerald-600 h-[50px]  w-[125px] flex flex-col justify-center items-center rounded-xl text-xl shadow-xl hover:translate-y-[-10px] transition-all hover:scale-110'>
                        <p className='text-neutral-200'>Ver Receta</p>
                    </div>
                </Link>
                <Link className='no-underline hover:text-inherit text-inherit' href={`/users/${recipe.id}`}>
                    <div className='bg-emerald-600 h-[50px] w-[125px] flex flex-col justify-center items-center rounded-xl text-xl shadow-xl hover:translate-y-[-10px] transition-all hover:scale-110'>
                        <p className='text-neutral-200 '>Ver Cocinero</p>
                    </div>
                </Link>
                <div onClick={handleWaring} className='bg-neutral-600 text-red-500 cursor-pointer h-[35px] self-center w-[35px] flex flex-col justify-center items-center rounded-xl text-xl shadow-xl hover:translate-y-[-10px] transition-all hover:scale-110'>
                        <ReportIcon/>
                    </div>
                {warning && <div className='w-[430px] absolute h-[100px] flex flex-col rounded-xl justify-evenly antialiased bg-zinc-700'>
                    <p className={'text-red-500 font-bold text-[22px] text-center '}>¿Realmente querés reportar esta receta?</p>
                    <div className='flex justify-evenly '>
                    <div className='w-fit h-fit bg-red-500 px-2 py-1 rounded-lg cursor-pointer' onClick={handleConfirmation}> <p id='confirmationText' className='text-white text-center' >{content}</p> </div>
                    <div className='w-fit h-fit bg-green-500 px-2 py-1 rounded-lg cursor-pointer' onClick={handleWaring}> <p className='text-white text-center'>Cancelar</p> </div>
                    </div>
                </div>}
            </div>

        </section>
    )
}

export default RecipeCard



// return (
//     <section className='flex flex-col w-[450px] h-[700px] bg-green-200 rounded-2xl border-none border-[3px] hover:border-green-900 shadow-lg shadow-black hover:shadow-green-900 overflow-hidden '>
//         <div className='w-full h-[300px] self-center border-none'>
//             <Image className='w-full h-full  object-cover border-none ' src={recipe.photo} alt='Foto - receta' width={500} height={500}></Image>
//         </div>
//         <div className='relative self-center text-center pt-[3px] pb-[8px] w-full h-[50px] bg-neutral-600 '>
//             <p className='text-3xl text-neutral-200 first-letter:uppercase'>{recipe.title}</p>
//         </div>

//         <div className="felx flex-col w-full h-[250px] overflow-hidden ">

//             <div className=' text-slate-600 flex flex-col p-4 h-[250px]'>
//                 <p className=' text-slate-900 text-xl font-bold'>Descripción</p>
//                 <p className='pl-6  text-left first-letter:text-slate-950 first-letter:font-bold first-letter:uppercase'>
//                     {recipe.description}
//                 </p>
//                 <div className='overflow-y-scroll scrollbar-hide'>

//                 <p className=' text-slate-900 text-xl font-bold'>Ingredientes</p>
//                 <p className='  text-left first-letter:text-slate-950 first-letter:font-bold first-letter:uppercase'>
//                     <ol className='w-full h-full '>
//                     {ingredients.map(ingredient=>{
//                         return <li className='first-letter:uppercase'>{ingredient}</li> 
//                     })}
//                     </ol>
//                 </p>
//                     </div>
//             </div>

//         </div>
//         <div className='flex justify-evenly items-center h-[50px] w-full '>
//             <p className='text-center'><span className='text-slate-900 font-bold'>Categoría:</span> <span className='font-mediums'>{recipe.categoria.name}</span> </p>
//             <p className='text-center'><span className='text-slate-900 font-bold'>Subida el:</span> <span className='font-medium'>{createdAt} por</span> <Link href={`/`}><p className='text-slate-900 font-bold inline-block first-letter:uppercase'>{recipe.author.name}</p></Link></p>
//         </div>
//         <div className=' h-[100px] w-full flex justify-evenly items-center p-3'>
//             <Link className='no-underline hover:text-inherit text-inherit' href={`/recetas/${recipe.id}`}>
//                 <div className='bg-neutral-600 h-[50px] w-[125px] flex flex-col justify-center items-center rounded-xl text-xl shadow-xl hover:translate-y-[-10px] transition-all hover:scale-110'>
//                     <p className='text-neutral-200'>Ver Receta</p>
//                 </div>
//             </Link>
//             <Link className='no-underline hover:text-inherit text-inherit' href={`/users/${recipe.id}`}>
//                 <div className='bg-neutral-600 h-[50px] w-[125px] flex flex-col justify-center items-center rounded-xl text-xl shadow-xl hover:translate-y-[-10px] transition-all hover:scale-110'>
//                     <p className='text-neutral-200 '>Ver Cocinero</p>
//                 </div>
//             </Link>
//             <div onClick={() => handleReported(recipe.id,recipe.authorID)} className='bg-neutral-600 text-red-500 cursor-pointer h-[35px] self-center w-[35px] flex flex-col justify-center items-center rounded-xl text-xl shadow-xl hover:translate-y-[-10px] transition-all hover:scale-110'>
//                     <ReportIcon/>
//                 </div>
//         </div>

//     </section>
// )