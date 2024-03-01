import { iRecipeInfo } from "./recipeInterfaces";

export interface userLogin {
  email: string;
  password: string;
}

export interface iFavorite {

    id: number;
    userID: number;
    recipeID: number;
    likedRecipe: iRecipeInfo;
      
}

export interface IUserInfo {
  id?: number;
  visibility?: boolean;
  profileDescription?: string;
  photo?: string;
  email: string;
  name: string;
  password: string;
  repeatPassword?: string;
  country: string;
  role: string;
}

export interface iUserWithRecipes extends IUserInfo {
  posts: iRecipeInfo[];
}
// export interface iUserWithFavorites extends iUserWithRecipes {
//   favorites:iFavorite[];
// }
