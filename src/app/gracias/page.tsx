"use client"

import { titleFont } from "../layout"

export default function GraciasView(){

    return(
        <div className={titleFont.className + " min-h-[100svh] bg-zinc-800 py-24"}>
            <div className="text-center lg:w-[600px] mx-auto py-5  bg-zinc-700">
            <p className="text-5xl text-green-400 ">¡Gracias por tu apoyo!</p>
            <p className="font-sans text-white">Tu donación nos ayuda a seguir en linea!</p>

            </div>
        </div>
    )
}