import NextAuth, {AuthOptions}  from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserI{
  id:string,
  email:string,
  name: string,
  visibility?: Boolean
}

export const authOptions:AuthOptions={
  providers: [
//se ejecutan varias veces no una sola vez en cada petición lo llama
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "email", type: "email", placeholder: "jsmith" },
          password: { label: "password", type: "password" }
        },
        async authorize(credentials, _req) {
          // Add logic here to look up the user from the credentials supplied
          const res=await fetch("http://localhost:3000/api/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password
            })
          })
          const user:UserI=await res.json()
    
          if (user== null) {
            // Any object returned will be saved in user property of the JWT 
            throw new Error( JSON.stringify("Contraseña o correo incorrecto"))
          } else if(user.visibility == true){
            
            return user
          }else {
            // If you return null then an error will be displayed advising the user to check their details.
            throw new Error( JSON.stringify("Su cuenta esta suspendida"))
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
      }
      )
  ],
//tendremos un objeto en la devolución de la llamada se ejecuta a medida que se va ////
//estableciendo la cookie en el navegador
  callbacks: {
//user son los datos del usuario
    async jwt({ token, user }) {
//combinaremos token con el user
      return { ...token, ...user };
    },
//definimos el objeto de session 
//ya le pasamos unimos los datos pero no se muestra en la sessión x eso esto
    async session({ session, token }) {
//dado que el tipo de token es jwt y el user es un objeto con atributos string lo 
//ponemos tipo any para no tener error
      session.user = token as any;
      return session;
    },

  },
  pages:{
    signIn: "/api/login/signin"
  }
}


const handler= NextAuth(authOptions)
//obtendremos solicitudes get y post
export {handler as GET, handler as POST}