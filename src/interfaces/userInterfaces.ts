import { iRecipeInfo } from "./recipeInterfaces"

export interface userLogin{
    email:string
    password:string
}


export interface IUserInfo{
    id?:number,
    profileDescription?:string,
    photo?:string,
    email:string,
    name:string,
    password:string,
    repeatPassword?: string,
    country:string,
    role:string,
}

export interface iUserWithRecipes extends IUserInfo{
    posts:iRecipeInfo[]
}


