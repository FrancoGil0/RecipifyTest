"use client"

import { Input } from '@nextui-org/react'

import { SearchIcon } from '../SearchIcon'

import { useEffect, useState } from 'react'

import { iRecipeInfo } from '@/interfaces/recipeInterfaces'

import SearchItem from './SearchItem'

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useForm, SubmitHandler } from 'react-hook-form'
import { CloseIcon } from '@/components/icons'

// import { Rings } from 'react-loading-icons'

const SearchBar = ({ className }: { className: string }) => {

 

    type FormValues = {

        search: string

    }

const [recipes, setRecipes] = useState([] as Array<iRecipeInfo>)

 

    // const [loading, setLoading] = useState(false)

 

    const [SearchedRecipes, setSearchedRecipes] = useState([] as Array<iRecipeInfo>)

const { register, handleSubmit } = useForm<FormValues>()

useEffect(() => {

 

        const getDataSearch = async () => {

            try {

                const response = await fetch('http://localhost:3000/api/search/', {

                    method: 'GET',

                    headers: {

                        "Content-Type": "application/json"

                    },

                    mode: "cors"

                })

                const searchResult = await response.json();

 

                setRecipes(searchResult)

 

            } catch (error) {

                console.log(error)

            }

        }

        getDataSearch()
    }, [])

const handleSearch: SubmitHandler<FormValues> = (data) => {

        // setLoading(true)

 

        const toSearch = data.search

 

        const results = recipes.filter((recipe) => {

            return (

                recipe.title.toUpperCase().includes(toSearch.toUpperCase()) ||

                recipe.categoria.name.toUpperCase().includes(toSearch.toUpperCase())

            );

        })

 

        // const re = recipes.filter((recipe) => {

        //     return (

        //       recipe.title.toUpperCase().includes(toSearch.toUpperCase()) ||

        //       recipe.categoria.name.toUpperCase().includes(toSearch.toUpperCase())

        //     );

        //   })

        console.log("trajo informacion")

 

        // console.log("estos son los resultados")

        // console.log(results)

        // setLoading(false)

        setSearchedRecipes(results)

 

    }

return (

        <search>

            <form

                onSubmit={handleSubmit(handleSearch)}

                className={className}>

                <Input

                    {...register("search")}

                    id='search'

                    name='search'

                    classNames={{

                        base: "max-w-full h-10",

                        mainWrapper: "h-full",

                        input: "text-small",

                        inputWrapper: "h-full font-normal text-default-500 bg-white dark:bg-default-500/20",

                    }}

                    placeholder="¿Qué tenés en la heladera?"

                    size="md"

                    onClear={() => setSearchedRecipes([])}

                    // startContent={<button type='submit'><SearchIcon size={18} width={18} height={18} /></button>}

                    endContent={<button type='submit'><SearchIcon size={18} width={18} height={18} /></button>}

                    type="search"

                />

 

                {/* {loading&&<Rings className='w-[20px] h-[20px]' stroke='#333' fill='#333'/>} */}

 

            </form>

 

            {SearchedRecipes.length !== 0 ?

                <div className="z-50 bg-[#747676bb] absolute flex flex-col px-3 pt-3 gap-2 rounded-xl h-fit mt-2 w-[220px] sm:w-[400px] md:w-[450px] lg:w-[700px] xl:w-[800px] 2xl:w-[900px] pb-5 ">

                    <div className='self-end w-[25px] h-[25px] flex justify-center items-center cursor-pointer'

                        onClick={() => setSearchedRecipes([] as Array<iRecipeInfo>)}

                    >

                        <CloseIcon/>

                    </div>

 

                    {SearchedRecipes.map((recipe) => {

                        console.log(recipe)

                        if (recipes.length !== 0) {

                            return <SearchItem {...recipe} key={recipe.id} />
                          

                        }

                        return <></>

                    })}

                </div> : <></>}

</search>

    )

}

 

export default SearchBar