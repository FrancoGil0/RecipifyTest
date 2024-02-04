import { categoriasInterface } from "./categoriasInterface"
import { iFavorite, iReported, iReview } from "./reviewsInterfaces"
import { IUserInfo } from "./userInterfaces"

export interface iRecipeInfo {
    id: number,
    title: string,
    photo:string,
    pasos:string,
    description:string,
    ingredients: string,
    author: IUserInfo,
    authorID: number,
    createdAt: string,
    updatedAt:  string,
    categoria: categoriasInterface,
    categoriaID: number
    visibility:boolean,
};

export interface iRecipeAndRelations extends iRecipeInfo{
    rating:number;
    reviews:iReview[];
    favorites:iFavorite[];
    reports:iReported[];
}

export interface ingredient{
    id:number|string,
    name:string,
    cuantity:string
}

export interface iSearchedRecipe{
    searchedWords:string,
}