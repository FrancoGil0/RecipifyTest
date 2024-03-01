export {default } from "next-auth/middleware"
//pondremos las rutas que no queremos que visiten los usuarios no autenticados




export const config = {
    matcher: ["/recetas"],
}