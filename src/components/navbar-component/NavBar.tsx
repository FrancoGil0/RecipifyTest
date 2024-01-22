'use client'
import './NavBar.css'
import logo from '../../../public/images/navbar-icon.svg'
import logoMobile from '../../../public/images/iconito.png'
import { useSession } from 'next-auth/react'
import {Link,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import NextLink from 'next/link'
import Image from 'next/image'
import SearchBar from './searchbar-component/SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SignInButton from '../botonSignin/SigninButton'
import { RedirectionHelper } from '@/libs/redirections'

// import MenuList from './menu-list/MenuList'


const NavBar = () => {

    const { data: session } = useSession()

    const router = new RedirectionHelper();



    const handleLogin = () => {
        return router.loginRedirection()

    }
    const handleRegister = () => {
        return router.registerRedirection()
    }

    // const handleRecetas = () => {
    //     return router.recetasrediRection()
    // };
    const handleCrearCategoria = () => {
        return router.crearCategoriaRedirection()
    };
    // const handleCrearRecetas = () => {
    //     return router.crearRecetasRedirection()
    // };

    const handlePerfil = () => { };
    const handleHelp = () => { };

    if (session && session.user) {
        return (
            <div data-testid="NavBar" id='NavBar' className='w-screen sm:w-screen md:w-screen h-16 sm:h-20 flex items-center justify-evenly p-2 sm:p-0 bg-emerald-400 overflow-hidden md:gap-3 overflow-x-hidden' >

                <NextLink  href='/'>
                    <div className='overflow-hidden md:min-w-[200px]'>
                        <Image width={200}  src={logo} alt="logo-recipify" className='hidden pt-2 sm:pt-0 sm:block logo-mobile w-[250px] h-[250px]'  priority={true} />
                        <Image width={70} src={logoMobile} alt="logo-recipify" className='block sm:hidden logo-mobile'  priority />
                    </div>
                </NextLink>
                

                <SearchBar className="items-center mr-2 ml-2 sm:mr-2 sm:ml-0 sm:w-[400px] md:min-w-[450px] lg:w-[700px] xl:w-[800px] 2xl:w-[900px]"></SearchBar>

                <Dropdown className='shadow-xl' placement='bottom-end'>
                    <DropdownTrigger className='w-[30px] sm:w-[40px] cursor-pointer sm:mr-2 md:mr-2'>
                        <FontAwesomeIcon icon={faBars} className='text-[35px] text-[#02020294]' />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Menu Actions" variant="faded">
                        <DropdownItem key="LogIn/LogOut" className="h-14 gap-3">
                            <SignInButton inString='Iniciar Sesión' outString='Cerrar Sesión' />
                        </DropdownItem>
                        <DropdownItem className='text-black h-[50px]' key="recetas"><Link href={"/recetas"}>Ver Recetas</Link></DropdownItem>
                        <DropdownItem className='text-black h-[50px]' key="recetas"><Link href={"/recetas/crear"}>Crear Nueva Receta</Link></DropdownItem>
                        {session.user.role === "ADMIN" ? <DropdownItem onClick={handleCrearCategoria} className='text-black' key="recetas">Crear Categoría</DropdownItem> : <DropdownItem className='hidden'></DropdownItem>}
                        <DropdownItem onClick={handlePerfil} className='text-black h-[50px]' key="recetas"><Link href={`/api/perfil/${session.user.id}`}>Mí Perfíl</Link></DropdownItem>
                        <DropdownItem onClick={handleHelp} className='text-black h-[50px]' key="">Ayuda & Feedback</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </div>
        )
    }
    return (
        <div id='NavBar' data-testid="NavBar"  className='max-w-screen h-16 sm:h-20 flex items-center justify-evenly p-2 sm:p-0 bg-emerald-400 overflow-hidden md:gap-3 overflow-x-hidden' >
            <Link href='/'>
                <div className='overflow-hidden md:min-w-[200px]'>
                    <Image width={200} src={logo} alt="logo-recipify" className='hidden pt-2 sm:pt-0 sm:block logo-mobile'  priority={true} />
                    <Image width={70} src={logoMobile} alt="logo-recipify" className='block sm:hidden logo-mobile'  priority />
                </div>
            </Link>

            <SearchBar className="items-center mr-2 ml-2 sm:mr-2 sm:ml-0 sm:w-[400px] md:min-w-[450px] lg:w-[700px] xl:w-[800px] 2xl:w-[900px]"></SearchBar>

            <Dropdown className='shadow-xl' placement='bottom-end'>
                    <DropdownTrigger className='w-[30px] sm:w-[40px] cursor-pointer sm:mr-2 md:mr-2'>
                        <FontAwesomeIcon icon={faBars} className='text-[35px] text-[#02020294]' />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Menu Actions" variant="faded">
                        <DropdownItem onClick={handleRegister} className='text-black h-[50px]'>Registrate</DropdownItem>
                        <DropdownItem onClick={handleLogin} className='text-black h-[50px]'>Iniciá Sesión</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            


        </div>
    )
}

export default NavBar