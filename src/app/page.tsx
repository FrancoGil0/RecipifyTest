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
  <main className="w-full pb-4">
    <div className='fondo-homepage flex flex-col items-center justify-center h-[250px] sm:h-fit w-[380px] sm:w-[580px] md:w-[730px] lg:w-[1000px] m-auto mt-5 rounded-xl shadow-2xl'>

      <div className='bg-green-300 w-[325px] h-fit sm:w-[530px] md:w-[680px] lg:w-[950px] sm:h-fit rounded-xl sm:mt-10 py-3 sm:mb-10 sm:p-4 '>

        <h2 className={'text-[30px] sm:text-[60px] text-center text-neutral-100 ' +titleFont.className}>Bienvenido Usuario!</h2>
        <h3 className={'text-[20px] sm:text-[40px] text-center text-neutral-100 '+titleFont.className}>Comenzá hoy tu viaje gastronómico!</h3>
      <LinkButton path='/recetas/crear' text='Crear Receta' styles='w-[200px] h-[50px]' />
      </div> 
    </div>

      <RandomRecipeCard/>



      
    
  </main>)
    
}
export default MainSection