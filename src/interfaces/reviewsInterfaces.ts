import { iRecipeAndRelations } from "./recipeInterfaces";
import { IUserInfo, iUserWithRecipes} from "./userInterfaces";

export interface iFavorite{
    id: number;
    likedBy:IUserInfo;
    userID: number;
    likedRecipe:iRecipeAndRelations;
    recipeID: number;
}

export interface iReview {
    id:number; 
    rating:number; 
    author:IUserInfo
    authorID:number;
    recipe:iRecipeAndRelations;
    recipeID:number;
  }

  export interface iReported{
    id: string|number;
    reportedBy:IUserInfo;
    userID: number;
    reportedRecipe:iRecipeAndRelations;
    recipeID: number;
}