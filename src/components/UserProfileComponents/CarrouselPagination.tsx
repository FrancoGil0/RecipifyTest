"use client"
import { iPaginationData } from "@/interfaces/paginationInterface"
import 'bulma/css/bulma.css'
import '@/components/pagination-component/PaginationStyles.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons"

const CarrouselPagination = ({ recipesPerPage, currentPage, setCurrentPage, totalRecipes }: iPaginationData) => {

    const pageNumbers = []
    for (
        let i = 1;
        i <= Math.ceil(totalRecipes / recipesPerPage);
        i++
    ) {
        pageNumbers.push(i)
    }

    // const handlePage = (page: number) => {
    //     setCurrentPage(page)
    // }

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1)
    }
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }


    return (

        <nav className="w-full h-full   flex text-[#333] items-center text-lg justify-between lg:justify-center lg:gap-3" role="navigation" aria-label="pagination">
                <button className="disabled:text-gray-500 text-emerald-700 h-[40px] drop-shadow-xl shadow-black w-[40px]" disabled={currentPage === 1 ? true : false} onClick={handlePreviousPage}><FontAwesomeIcon className="w-full h-full  " icon={faCircleLeft} /></button>
                <button className="disabled:text-gray-500 text-emerald-700 h-[40px] drop-shadow-xl shadow-black w-[40px]" disabled={currentPage >= pageNumbers.length ? true : false} onClick={handleNextPage}><FontAwesomeIcon className="w-full h-full" icon={faCircleRight} /></button>
        </nav>

    )

}

export default CarrouselPagination

{/* <ul className="flex md:gap-6 p-2">
                {pageNumbers.map((numPage: number, index) => {
                    return (
                        <li key={index} className={` w-8 text-center rounded-md cursor-pointer ${numPage === currentPage ? 'bg-emerald-200' : ""}`}>
                            <a className="text-[#333]" onClick={() => handlePage(numPage)}>{numPage}</a>
                        </li>
                    )
                })}
            </ul> */}