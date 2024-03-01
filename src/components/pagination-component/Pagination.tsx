"use client"
import { iPaginationData } from "@/interfaces/paginationInterface"
import 'bulma/css/bulma.css'
import './PaginationStyles.scss'

const Pagination = ({ recipesPerPage, currentPage, setCurrentPage, totalRecipes }: iPaginationData) => {

    const pageNumbers = []
    for (
        let i = 1;
        i <= Math.ceil(totalRecipes / recipesPerPage);
        i++
    ) {
        pageNumbers.push(i)
    }

    const handlePage = (page: number) => {
        setCurrentPage(page)
    }

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1)
    }
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }


    return (

        <nav className="w-screen flex text-[#333] items-center text-2xl md:text-3x md:h-[70px] justify-evenly" role="navigation" aria-label="pagination">
                <button className="" disabled={currentPage === 1 ? true : false} onClick={handlePreviousPage}>Anterior</button>
            <ul className="flex md:gap-6 p-2">
                {pageNumbers.map((numPage: number, index) => {
                    return (
                        <li key={index} className={` w-8 text-center rounded-md cursor-pointer ${numPage === currentPage ? 'bg-emerald-200' : ""}`}>
                            <a className="text-[#333]" onClick={() => handlePage(numPage)}>{numPage}</a>
                        </li>
                    )
                })}
            </ul>
                <button className="" disabled={currentPage >= pageNumbers.length ? true : false} onClick={handleNextPage}>Siguiente</button>
        </nav>

    )

}

export default Pagination