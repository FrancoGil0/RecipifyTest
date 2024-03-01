"use client"
import Link from "next/link";
import { titleFont } from "@/app/layout";

function SuccessComponent() {
  return(
   <>

    <div className="min-h-screen pt-24  transition-all">

      <div className={"bg-neutral-300 h-fit cursor-default w-[480px] py-3 flex flex-col mx-auto shadow-md rounded-lg shadow-neutral-600 " + titleFont.className}>
        <p className="text-center text-2xl font-bold p-b   text-zync-700">Restablecimiento de Contraseña</p>
        <p className="text-center  text-zinc-500 py-2 ">Si el correo electrónico no aparece, revisa tu carpeta de spam</p>
        <Link className="ml-1 text-blue-700" href={"/api/login/signin"}>Volver a iniciar sesión</Link>
    </div>
     </div>
   </>
  );
};
export default SuccessComponent;