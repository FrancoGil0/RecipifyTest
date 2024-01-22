import { iRecipeInfo } from "@/interfaces/recipeInterfaces";
import Image from "next/image";

// import { faShare } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { titleFont } from "@/app/layout";

const SearchItem = (recipe: iRecipeInfo) => {

    return (
        <div className="w-full h-[100px] bg-green-200  text-xl flex items-center justify-between rounded-lg p-3 hover:shadow-lg shadow-green-600">
            <div className="w-[25%] ">
                <div className="overflow-hidden rounded-md w-[160px] h-[80px] border-[1px] border-[#00000044] shadow-md shadow-green-300">
                    <Image className="w-full h-full object-cover" src={recipe.photo} alt={"recipe photo"} width={160} height={80}></Image>
                </div>
            </div>
            <div className="w-[40%] ">
                <h6 className="text-3xl first-letter:font-bold first-letter:uppercase">{recipe.title}</h6>
                <div>
                <p className="text-[20px]  text-gray-600 inline-block">Subida por:</p><p className="text-[20px]  text-gray-600 inline-block ml-1 first-letter:uppercase"> {recipe.author.name}</p>
                </div>
                <div>
                <p className="text-[16px]  text-gray-600 inline-block">En: </p><p className="text-[16px] ml-1 text-gray-600 inline-block first-letter:uppercase"> {recipe.categoria.name}</p>
                </div>
            </div>
            <div className="w-[20%]">
                <div className="bg-neutral-600  rounded-md flex-col justify-center text-center ">
                    <Link className={`${titleFont.className} text-2xl  text-neutral-300 hover:text-neutral-200`} rel="stylesheet" href={`/recetas/${recipe.id}`}>Ver Receta</Link>
                </div>
            </div>
            {/* <div className="w-[5%] flex items-center justify-end">
        <FontAwesomeIcon className="w-[40px] h-[40px] inline-block text-green-400 drop-shadow-xl shadow-black" icon={faShare} flip="vertical" />
            </div> */}
        </div>
    );
}

export default SearchItem