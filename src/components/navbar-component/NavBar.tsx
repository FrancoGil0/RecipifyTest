'use client'
import './NavBar.css'
import logo from '../../../public/images/navbar-icon.svg'
import logoMobile from '../../../public/images/iconito.png'
import { useSession } from 'next-auth/react'
import { Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import NextLink from 'next/link'
import Image from 'next/image'
import SearchBar from './searchbar-component/SearchBar'
import SignInButton from '../botonSignin/SigninButton'
import { MenuIcon } from '../icons'



const NavBar = () => {

    const { data: session } = useSession()

    const handlePerfil = () => { };
    const handleHelp = () => { };

    if (session && session.user) {
        return (
            // <div data-testid="NavBar" id='NavBar' className=' w-screen h-16 sm:h-20 flex items-center  p-2 sm:p-0 bg-emerald-400 overflow-hidden md:gap-3 overflow-x-hidden' >
            <div data-testid="NavBar" id='NavBar' className='w-screen h-16  bg-emerald-400 flex items-center justify-between px-8 py-10 overflow-y-hidden' >

                <div className='min-w-[70px] sm:w-2/12 sm:pt-2'>
                <Link as={NextLink} href='/'>
                        <Image width={200} src={logo} alt="logo-recipify" className='hidden pt-2 sm:pt-0 sm:block logo-mobile w-full' priority={true} />
                        <Image width={70} src={logoMobile} alt="logo-recipify" className='block sm:hidden logo-mobile' priority />
                </Link>
                    </div>

                <div className='sm:w-6/12 '>
                <SearchBar className="items-center mr-2 ml-2"></SearchBar>
                </div>

                <div className='sm:w-2/12 h-[50px] flex items-center justify-center '>
                    <Dropdown className='shadow-xl' placement='bottom-end'>
                        <DropdownTrigger className='w-[30px] sm:w-[40px] cursor-pointer sm:mr-2 md:mr-2'>
                            <button className='outline-none flex items-center justify-center'>
                            <MenuIcon/>
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Menu Actions" variant="faded">
                            <DropdownItem key="LogIn/LogOut" className="h-14 gap-3">
                                <SignInButton inString='Iniciar Sesión' outString='Cerrar Sesión' />
                            </DropdownItem>
                            <DropdownItem className='text-black h-[50px]' key="recetas"><Link as={NextLink} href={"/recetas"}>Ver Recetas</Link></DropdownItem>
                            <DropdownItem className='text-black h-[50px]' key="new receta"><Link as={NextLink} href={"/recetas/crear"}>Crear Nueva Receta</Link></DropdownItem>
                            {session.user.role === "ADMIN" ? <DropdownItem className='text-black h-[50px]' key="categorias"><Link as={NextLink} href={"/api/categoria"}>Crear Categoría</Link></DropdownItem> : <DropdownItem className='hidden'></DropdownItem>}
                            {session.user.role === "ADMIN" ? <DropdownItem className='text-black h-[50px]' key="reportes"><Link as={NextLink} href={"/admin"}>Panel de Administración</Link></DropdownItem> : <DropdownItem className='hidden'></DropdownItem>}
                            <DropdownItem onClick={handlePerfil} className='text-black h-[50px]' key="recetas"><Link as={NextLink} href={`/perfil/${session.user.id}`}>Mí Perfíl</Link></DropdownItem>
                            <DropdownItem className='text-black h-[50px]' key="recetas"><Link as={NextLink} href={`/agenda/${session.user.id}`}>Mí Agenda</Link></DropdownItem>
                            {session.user.role=== "USER" ? <DropdownItem onClick={handlePerfil} className='text-black h-[50px]' key="recetas"><Link as={NextLink} href={`/premium`}>Sé Premium</Link></DropdownItem> : <DropdownItem className='hidden'></DropdownItem>}
                            <DropdownItem onClick={handleHelp} className='text-black h-[50px]' key="">Ayuda & Feedback</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </div>

            </div>
        )
    }
    return (
        <div id='NavBar' data-testid="NavBar" className='max-w-screen h-16 sm:h-20 flex items-center justify-evenly p-2 sm:p-0 bg-emerald-400 overflow-hidden md:gap-3 overflow-x-hidden' >
            <Link as={NextLink} href='/'>
                <div className='overflow-hidden md:min-w-[200px]'>
                    <Image width={200} src={logo} alt="logo-recipify" className='hidden pt-2 sm:pt-0 sm:block logo-mobile' priority={true} />
                    <Image width={70} src={logoMobile} alt="logo-recipify" className='block sm:hidden logo-mobile' priority />
                </div>
            </Link>

            <SearchBar className="items-center mr-2 ml-2 sm:mr-2 sm:ml-0 sm:w-[400px] md:min-w-[450px] lg:w-[700px] xl:w-[800px] 2xl:w-[900px]"></SearchBar>

            <Dropdown className='shadow-xl' placement='bottom-end'>
                <DropdownTrigger className='w-[30px] sm:w-[40px] cursor-pointer sm:mr-2 md:mr-2'>
                    <button className='outline-none flex items-center justify-center'>
                            <MenuIcon/>
                            </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Menu Actions" variant="faded">
                    <DropdownItem className='text-black h-[50px]'><Link as={NextLink} href='/api/register'>Registrate</Link></DropdownItem>
                    <DropdownItem className='text-black h-[50px]'><Link as={NextLink} href='/api/login/signin'>Iniciá Sesión</Link></DropdownItem>
                    <DropdownItem onClick={handlePerfil} className='text-black h-[50px]' key="recetas"><Link as={NextLink} href={`/premium`}>DONAR</Link></DropdownItem>
                </DropdownMenu>
            </Dropdown>



        </div>
    )
}

export default NavBar