import NextAuth from "next-auth/next";
//hacemos esto para que el objeto de session tenga más atributos
declare module "next-auth"{
    interface Session{
        user:{
            id: number;
            name:string;
            email:string;
            role:string;
            accessToken:string;
        }
    }
}