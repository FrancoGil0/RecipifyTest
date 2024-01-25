"use client"



export default function userProfile() {

    return (
        <div className="min-h-screen max-w-screen bg-green-300 py-10">

            <div className="w-10/12 bg-neutral-400 h-screen mx-auto rounded-2xl flex gap-3 px-3 py-3">
                
                
                <div className=" w-4/12 my-auto pt-10 bg-neutral-500 rounded-xl h-fit">
                    <div className="mx-auto bg-white h-[200px] w-[200px] overflow-hidden rounded-[50%]">
                        <img className="w-full h-full object-contain" src="https://i.pinimg.com/236x/2f/97/f0/2f97f05b32547f54ef1bdf99cd207c90.jpg" alt="perfil" />
                    </div>
                    <div className="text-center text-3xl mt-5">Nombre De Usuario</div>
                    <div className="text-xl text-center">Pequeña descripcion del perfil</div>

                    <div className="w-3/4 mx-auto mt-3 text-center">
                        <p className="text-lg">Detalles:</p>
                        <p>País: {"Argentina"}</p>
                        <p>Mail: {"User@user.com"}</p>
                    </div>
                    <div className="mx-auto text-2xl h-[50px] w-[110px] flex items-center justify-center bg-emerald-600 rounded-3xl mt-10">Seguir</div>
                </div>


                <div className="bg-red-500 w-8/12 h-full rounded-xl overflow-hidden">
                    <div className="bg-blue-500 w-full h-2/5 p-3">
                        <h3 className="text-xl">Recetas más populares</h3>

                    </div>
                    <div className="bg-purple-500 w-full h-3/5 flex gap-5 p-5">
                        <div className="bg-zinc-400 w-1/2 h-full p-3">
                            <h3 className="text-xl text-black text-left">Recetas Subidas</h3>
                            <ul>
                                <li>asd</li>
                                <li>as</li>
                                <li>asd</li>
                            </ul>
                        </div>
                        <div className="bg-zinc-400 w-1/2 h-full p-3">
                            
                            <h3 className="text-xl text-black text-left">Recetas Favoritas</h3>
                            <ul>
                                <li>asd</li>
                                <li>as</li>
                                <li>asd</li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>


        </div>
    )

}