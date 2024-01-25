import './landing.css'
import recipifyLogo from '../../../public/images/navbar-icon-black.svg'
import Image from 'next/image'
import { titleFont } from '../layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faBook, faBookAtlas, faBookOpen, faBrain, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'

const LandingPage = () => {



    return (
        <div className="min-w-screen min-h-screen fondo-landing py-20">
            <div className='w-[500px]s sm:w-[800px] md:w-[1000px] mx-auto overflow-hidden fondo-transparente rounded-xl p-3 shadow-2xl shadow-[#FFFFFF66]'>
                <Image src={recipifyLogo} alt='Recipify Logo' className='mx-auto colorLogo'></Image>
                <div className={"text-center text-teal-950 max-h-fit w-full " + titleFont.className}>
                    <h1 className='text-3xl sm:text-5xl'>¡Comenzá tu viaje gastronómico!</h1>
                    <h2 className='text-xl sm:text-3xl' >Sé parte de la comunidad de cocineros más copada de Internet.</h2>
                </div>
                <div className={'cursor-pointer rounded-2xl sm:hidden fondo-transparente-verde-boton text-white text-center h-[60px] w-[300px] m-auto mt-5 p-3 ' + titleFont.className}>
                    <span className='text-[25px]'>Registrate Ahora</span> <FontAwesomeIcon className='ml-4 text-[25px]' icon={faArrowRightToBracket} />
                </div>
                <div className={`flex flex-col sm:flex-row gap-5 p-3 text-zinc-900 fondo-transparente-verde mt-5 rounded-xl shadow-xl text-lg sm:text-xl h-[300px]`}>
                    <div className='w-full sm:w-1/4 p-3 rounded-xl gap-3 flex flex-col text-center  '>
                        <h3 className={'text-3xl ' + titleFont.className}> Recetas <br /> para todos los gustos</h3>
                        <h3 className={'text-3xl ' + titleFont.className}>Búsqueda Fácil y Rápida</h3>
                        <h3 className={'text-3xl ' + titleFont.className}>Guardá Favoritos</h3>
                        <h3 className={'text-3xl ' + titleFont.className}>Compartí tu creatividad</h3>                        
                    </div>
                    <div className='w-full sm:w-1/4 p-3 rounded-lg  gap-3 flex flex-col text-center '>

                        <div className='h-[200px] '>
                        </div>

                    </div>
                    <div className='w-full sm:w-1/4 p-3 rounded-lg  gap-3 flex flex-col text-center'>
                        <div className='h-[200px] '>

                        </div>

                    </div>
                    <div className='w-full sm:w-1/4 p-3 rounded-lg gap-3 flex flex-col text-center '>
                    </div>
                </div>
                <div className={'border-[2px] border-black cursor-pointer rounded-2xl hidden sm:block fondo-transparente-verde-boton text-neutral-100 text-center h-[80px] w-[450px] m-auto mt-20 p-3 shadow-md shadow-[#333333D9] transition-all hover:scale-110 hover:translate-y-[-10px] ' + titleFont.className}>
                    <span className='text-[38px] '>Registrate Ahora</span> <FontAwesomeIcon className='ml-4 text-[39px]' icon={faArrowRightToBracket} />
                </div>
            </div>
        </div>
    )
}

export default LandingPage