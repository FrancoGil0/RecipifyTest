
import Image from 'next/image'

import { titleFont } from '@/app/layout'


const RandomRecipeCard=()=>{

    return(
        <>
        <div className=" flex flex-col items-center justify-center m-auto rounded-xl shadow-2xl bg-green-200 mt-10 w-[380px] sm:w-[580px] md:w-[730px] lg:w-[1000px] overflow-hidden" >
        
        <div className='flex items-center justify-center h-[50px] drop-shadow-[0_.5px_1px_rgba(0,0,0,1)] bg-neutral-600 absolute  sm:hidden top-[420px] w-[380px] py-8'>
          <p className={'text-neutral-200 text-4xl  tracking-wide ' + `${titleFont.className}` }>Tacos al Pastor</p>
        </div>
        <div className='flex items-center justify-center h-[10px] drop-shadow-[0_.5px_1px_rgba(0,0,0,1)] bg-neutral-200 absolute  sm:hidden top-[500px] w-fit py-8 px-3 rounded-xl'>
          <p className={'text-neutral-600 text-xl  tracking-wide ' + `${titleFont.className}` }>Ver Receta</p>
        </div>

        
        <div className='h-[80px] z-10 bg-neutral-600 backdrop-opacity-100 drop-shadow-[0_.5px_1px_rgba(0,0,0,1)] backdrop-blur-sm text-center hidden sm:flex sm:items-center sm:justify-center absolute top-[750px] sm:top[800px] w-[380px] sm:w-[580px] md:w-[730px] lg:w-[1000px]'>
          <p className={'text-neutral-200 text-5xl  tracking-wider ' + `${titleFont.className}` }>Tacos al Pastor</p>
        </div>

        <Image 
        src="https://c4.wallpaperflare.com/wallpaper/570/745/92/comida-mexico-plato-tacos-wallpaper-preview.jpg"
        alt='recipe photo'
        width={350}
        height={350}
        className='w-full h-full block object-fill sm:hidden rounded-xl shadow-xl'
        />

        <Image 
        src="https://c4.wallpaperflare.com/wallpaper/570/745/92/comida-mexico-plato-tacos-wallpaper-preview.jpg"
        alt='recipe photo'
        width={600}
        height={600}
        className='w-full h-full hidden sm:block object-fill rounded-xl shadow-xl'
        />

      </div>
        </>
    )
}

export default RandomRecipeCard