"use client"
import RandomRecipeCard from '@/components/homePage-recipeCard/RandomRecipeCard'
import './layout'
import { titleFont } from './layout'
import './page.css'
import LinkButton from '@/components/LinkButton/LinkButton'
{/* <LinkButton path='/recetas' text='Ver Recetas' />
<LinkButton path='/recetas/crear' text='Crear Receta' /> */}
const MainSection = ()=>{
     
  return (
  <main className="w-full pb-4 min-h-screen">
    <div className='fondo-homepage flex flex-col items-center justify-center h-[250px] sm:h-fit w-[380px] sm:w-[580px] md:w-[730px] lg:w-[1000px] m-auto mt-5 rounded-xl shadow-2xl'>

      <div className=' bg-gradient-to-t from-green-100  transition-colors duration-1000   via-transparent  w-[325px] h-fit sm:w-[530px] md:w-[680px] lg:w-[950px] sm:h-fit rounded-xl sm:mt-10 py-3 sm:mb-10 sm:p-4 '>

        <h2 className={'text-[30px] sm:text-[60px] text-center text-green-100 drop-shadow-[-5px_7px_.5px_rgba(50,50,50,.8)] shadow-red-600 ' +titleFont.className}>Bienvenido Usuario!</h2>
        <h3 className={'text-[20px] sm:text-[40px] text-center text-green-100 drop-shadow-[-2px_2px_0px_rgba(50,50,50,.8)]  '+titleFont.className}>Comenzá hoy tu viaje gastronómico!</h3>
      <LinkButton path='/recetas/crear' text='Subí tu Receta' styles='w-[200px] h-[50px] bg-green-500 hover:bg-green-600 ' />
      </div> 
    </div>
    <div className='mx-auto bg-emerald-400  w-[325px] h-fit sm:w-[530px] md:w-[680px] lg:w-[950px] sm:h-fit rounded-xl sm:mt-10 py-3 sm:mb-10 sm:p-4 '>

        <h2 className={'text-[30px] sm:text-[60px] text-center text-green-100 drop-shadow-[-3px_5px_.2px_rgba(50,50,50,.8)] shadow-red-600 ' +titleFont.className}>¡Encontrá tu receta de hoy!</h2>
        <h3 className={'text-[20px] sm:text-[35px] text-center text-green-100 drop-shadow-[-2px_2px_0px_rgba(50,50,50,.8)]  '+titleFont.className}>¿Qué te gustaría comer?</h3>
        <h3 className={'text-[20px] sm:text-[30px] text-center text-green-100 drop-shadow-[-2px_2px_0px_rgba(50,50,50,.8)]  '+titleFont.className}>Inspirate con <span className=''>Recipify</span></h3>
      <LinkButton path='/recetas' text='¡Buscá ahora!' styles='w-[200px] h-[50px] bg-green-600 hover:bg-green-700 ' />
      </div> 
  </main>)
    
}
export default MainSection