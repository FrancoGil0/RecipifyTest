"use client"

import DeletedRecipes from "@/components/AdminDashboardComponents/DeletedRecipes"
import ReportedRecipes from "@/components/AdminDashboardComponents/ReportedRecipesComponents"
import { useSession } from "next-auth/react"
import { titleFont } from "../layout";
import { useState } from "react";
import UsersListComponent from "@/components/AdminDashboardComponents/UsersComponent";

type NavCase = {
    case: "Reportes" | "Usuarios" | "Recetas"
}


export default function AdminDashboard() {

    const session = useSession();

    const user = session.data?.user

    const defaultCase: NavCase = { case: "Reportes" }

    const [caso, setCaso] = useState<NavCase>(defaultCase)

    const navItemStyle = "cursor-pointer hover:bg-neutral-300 hover:text-black text-neutral-500 py-1 px-2 rounded-lg"


    const handleCase = (newCase: "Reportes" | "Usuarios" | "Recetas") => {

        setCaso({
            case: newCase
        })
    }

    return (

        <div className="w-full min-h-screen flex flex-col cursor-default">
            <div className={`mx-auto text-center w-full`}>
                <h1 className={`lg:text-4xl mt-6 font-extralight ${titleFont.className}`}>Bienvenido <span className="lg:text-5xl capitalize text-emerald-500">{user ? user?.name : "Administrador"}</span></h1>
                <p className="lg:p-3">¿Que querés hacer hoy?</p>
                <ul className="flex lg:w-[600px] lg:h-[40px] mx-auto items-center justify-evenly">
                    <li className={navItemStyle + " group transition duration-500"}
                        onClick={() => handleCase("Reportes")}>
                        Examinar Reportes
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-600"></span>
                    </li>
                    <li className={navItemStyle + " group transition duration-500"}
                        onClick={() => handleCase("Recetas")}>
                        Ver Recetas Eliminadas
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-600"></span>
                    </li>
                    <li className={navItemStyle + " group transition duration-500"}
                        onClick={() => handleCase("Usuarios")}>
                        Administrar Usuarios
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-600">
                        </span>
                    </li>
                </ul>
            </div>
            <div className="w-full h-fit ">
                {caso.case === "Reportes" ? <ReportedRecipes></ReportedRecipes> : caso.case === "Recetas" ? <DeletedRecipes></DeletedRecipes> : <UsersListComponent/>}
            </div>
            <div className="w-full h-300px bg-blue-600">
            </div>

        </div>
    )



}