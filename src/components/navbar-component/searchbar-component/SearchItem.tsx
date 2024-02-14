import { iRecipeInfo } from "@/interfaces/recipeInterfaces";
import Image from "next/image";

// import { faShare } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { titleFont } from "@/app/layout";
import { GoIcon } from "@/components/icons";

const SearchItem = (recipe: iRecipeInfo) => {

    return (
        <div className="w-full min-h-[100px] max-h-[180px] bg-neutral-300 text-xl flex items-center justify-between rounded-lg p-3 hover:shadow-lg shadow-neutral-600">
            <div className="w-[25%] ">
                <div className="overflow-hidden rounded-lg w-full  max-h-[90px] shadow-lg shadow-neutral-300">
                    <Image className="w-full h-full object-cover" src={recipe.photo} alt={"recipe photo"} width={160} height={80}></Image>
                </div>
            </div>
            <div className="w-[40%] ">
                <h6 className={"text-3xl  first-letter:uppercase " + titleFont.className}>{recipe.title}</h6>
                <div>
                <p className={"text-[20px]  text-gray-600 inline-block "+titleFont.className}>Subida por:</p><p className="text-[20px]  text-gray-600 inline-block ml-1 first-letter:uppercase"> {recipe.author.name}</p>
                </div>
                <div>
                <p className={"text-[16px]  text-gray-600 inline-block "+ titleFont.className}>En: </p><p className="text-[16px] ml-1 text-gray-600 inline-block first-letter:uppercase"> {recipe.categoria.name}</p>
                </div>
            </div>
            <div className="w-[10%]">
                <div className="bg-green-600  rounded-md flex-col justify-center text-center ">
                    <Link className={` text-2xl flex items-center justify-center text-neutral-300 hover:text-neutral-200`} rel="stylesheet" href={`/recetas/${recipe.id}`}>
                    <span className="py-2 hover:scale-110 rotate-[35deg]"><GoIcon title="Ver Receta" /></span>
                        </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchItem