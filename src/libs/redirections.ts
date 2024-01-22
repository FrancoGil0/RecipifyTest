import { useRouter } from "next/navigation"

export class RedirectionHelper{
    
    router=useRouter();

    registerRedirection(){
        return this.router.push('/api/register')
    }
    loginRedirection(){
        return this.router.push('/api/login/signin')
    }
    perfilRedirection(){
        return this.router.push('/api/perfil')
    }
    helpRedirection(){
        return this.router.push('/help')
    }
    recetasrediRection(){
        return this.router.push('/recetas')
    }
    crearRecetasRedirection(){
        return this.router.push('/recetas/crear')
    }
    crearCategoriaRedirection(){
        return this.router.push('/api/categoria')
    }



}