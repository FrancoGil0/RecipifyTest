import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";





export default function ItemCarrousel(recipe: { title: string ,foto: string, rating: number}) {


    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(18, 234, 180, 0.25),rgba(85,85,85,.6),rgba(18, 234, 180, 0.25)), 
        url(${recipe.foto})`
        }}
            className="CARD shadow-md shadow-[#33333384] bg-cover antialiased bg-center bg-no-repeat min-h-[150px] w-[250px] xl:max-w-[300px] max-h-[250px]  flex flex-col justify-between items-center text-center rounded-lg overflow-hidden transition-all hover:scale-110 cursor-default ">

            <div className="text-white h-3/4 px-3 py-4 flex flex-col items-center justify-center hyphens-auto">
                <p className="text-3xl font-bold">{recipe.title}</p>
                <p className="font-thing lg:font-bold mt-1 text-white">Rating:{recipe.rating}</p>
            </div>
            <div className=" flex items-center justify-center gap-2 text-xl text-emerald-100 hover:text-white hover:bg-gradient-to-b from-[#fff0]  to-[#2d362f82] font-bold h-1/4 w-full pt-2   cursor-pointer">
                Ver más <FontAwesomeIcon icon={faEye} className="text-[15px]" />
            </div>
        </div>
    )
}



export function CarrouselLoader() {


    return (
        <div className="CARROUSEL w-full h-full lg:h-[300px]  flex flex-col  relative pb-8 lg:pb-0">
            <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-3 lg:px-3 justify-center items-center">
            {[1,2,3].map((index) => {
                return (
                    <div key={index} className="CARD pulsation bg-cover antialiased bg-center bg-no-repeat min-h-[150px] w-[250px] xl:max-w-[300px] max-h-[250px]  flex flex-col justify-between items-center text-center rounded-lg overflow-hidden cursor-default ">
                    </div>
                    )
                })}
                </div>
            <div className="w-full h-[5%] absolute top-[50%] px-3 lg:top-[65%]">
                {/* <CarrouselPagination   currentPage={currentPage} recipesPerPage={recipesPerPage} setCurrentPage={setCurrentPage} totalRecipes={1}></CarrouselPagination> */}
            </div>

        </div>
    )
}