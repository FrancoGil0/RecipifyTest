import { iRecipeInfo } from "./recipeInterfaces";

export interface categoriasInterface{
    id?: string|number;
    name:string;
    recipes?:iRecipeInfo[];
}