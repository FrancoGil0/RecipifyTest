import { useState } from "react"
import ItemCarrousel, { CarrouselLoader } from "./ItemCarrousel"
import CarrouselPagination from "./CarrouselPagination";
import { iRecipeAndRelations } from "@/interfaces/recipeInterfaces";

export default function ProfileCarrousel({recipeList}:{recipeList: iRecipeAndRelations[]}) {

    const [recipesPerPage, _setRecipesPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * recipesPerPage;
    const firstIndex = lastIndex - recipesPerPage;





    return (
        <div className="CARROUSEL w-full h-full lg:h-[300px]  flex flex-col  relative pb-8 lg:pb-0">
            <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-3 lg:px-3 justify-center items-center">
            {recipeList?recipeList.map((recipe,id) => {
                return (
                    <ItemCarrousel title={recipe.title} foto={recipe.photo} rating={recipe.rating} key={id}/>
                    )
                }).slice(firstIndex, lastIndex):<CarrouselLoader/>}
                </div>
            <div className="w-full h-[5%] absolute top-[50%] px-3 lg:top-[65%]">
                <CarrouselPagination   currentPage={currentPage} recipesPerPage={recipesPerPage} setCurrentPage={setCurrentPage} totalRecipes={1}></CarrouselPagination>
            </div>

        </div>
    )
}