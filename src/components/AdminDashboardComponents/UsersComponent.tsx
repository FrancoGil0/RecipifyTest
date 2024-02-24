"use client"

import Link from "next/link";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { AlertIcon, BanIcon, DeleteRecipeIcon, DeleteReportIcon, EyeIcon, UnBanIcon } from "../icons";
import { Spinner, user } from "@nextui-org/react";


import { IUserInfo } from "@/interfaces/userInterfaces";



export default function UsersListComponent() {

    const [users, setUsers] = useState([] as IUserInfo[]);
    const [loading, setLoading] = useState(true);

    type confirmationObject = {
        visibility: Boolean,
        recipeId: number
        reportId: number
    }


    const [confirmationDiv, setConfirmationDiv] = useState({} as confirmationObject);

    const router = useRouter();



    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:3000/api/userback", {
                method: "GET",
            });
            const users = await response.json();
            setLoading(false);
            setUsers(users);

        };
        fetchUsers();


    }, [users]);










    const handleDivConfirmation = ({ visibility, recipeId, reportId }: confirmationObject) => {
        setConfirmationDiv({
            visibility,
            recipeId,
            reportId
        })
    }



    const changeRol = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id=((event.currentTarget.elements.namedItem("id") as HTMLInputElement).value)
        const rol=((event.currentTarget.elements.namedItem("rol") as HTMLInputElement).value)
        const res = await fetch("http://localhost:3000/api/userback/changeRole",{
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              rol
              }),
          }
        );
        if(res.ok){
          router.push("/admin")
        }
      }
      
      const changeVisibility = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id=((event.currentTarget.elements.namedItem("id") as HTMLInputElement).value)
        const visibility=((event.currentTarget.elements.namedItem("visibility") as HTMLInputElement).value)
        const res = await fetch("http://localhost:3000/api/userback/changeVisibility",{
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              visibility
              }),
          }
        );
        if(res.ok){
          router.push("/admin")
        }
      }



    return (

        <div className="lg:min-h-[700px]  py-12">
            {loading &&
                <div className="w-full flex items-center justify-center h-full">
                    <Spinner></Spinner>
                </div>
            }
            {users.length > 0 ? (

                <div className="relative lg:w-[950px] lg:h-[500px]  mx-auto">
                    <table className=" w-full table-fixed ">
                        <thead>
                            <tr className="bg-neutral-400 w-full text-center">
                                <th className="w-1/3 p-2 ">Nombre de Usuario:</th>
                                <th className="w-1/3 p-2 ">Rol / País</th>
                                <th className="w-1/3 p-2">E-mail:</th>
                                <th className="w-1/3 p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="gap-3 h-full ">
                            {users.map((user, i) => (
                                <tr className={i % 2 === 0 ? "text-center h-[10px] hover:bg-emerald-400  transition-all bg-emerald-100 rounded-[50px]" : "text-center hover:bg-emerald-400  h-[15px] transition-all  rounded-[50px] bg-emerald-200"} key={user.id}>
                                    <td className="lg:min-w-1/3 lg:w-1/3 lg:max-w-1/3 mx-auto p-1">{user.name}</td>
                                    <td className=" lg:min-w-1/3 lg:w-1/3 lg:max-w-1/3 mx-auto p-1">{user.role + "/" + user.country}</td>
                                    <td className=" lg:min-w-1/3 lg:w-1/3 lg:max-w-1/3 mx-auto p-1">{user.email}</td>
                                    <td className=" lg:min-w-1/3 lg:w-1/3 lg:max-w-1/3 mx-auto p-1">
                                        <div className="flex gap-6 justify-center items-center ">
                                            <Link className="pt-2" href={`/perfil/${user.id}`}>
                                                <button className="hover:animate-spin"><EyeIcon /></button>
                                            </Link>

                                            <form onSubmit={changeVisibility}  className="p-0 m-0">
                                                <input type="text" id="id" value={user.id}
                                                    readOnly hidden />
                                                <input type="text" id="visibility" value="false"
                                                    readOnly hidden />
                                            <button type="submit" className="hover:animate-bounce" ><BanIcon /></button>
                                            </form>
                                            <form onSubmit={changeVisibility} className="p-0 m-0">
                                                <input type="text" id="id" value={user.id}
                                                    readOnly hidden />
                                                <input type="text" id="visibility" value="true"
                                                    readOnly hidden />
                                            <button type="submit" className="hover:animate-bounce" ><UnBanIcon /></button>
                                            </form>
                                            <form onSubmit={changeRol}>
                                                <input type="text" id="id" hidden value={user.id}></input>
                                                <select name="rol" id="rol" className="outline-none">
                                                    <option defaultChecked disabled >Rol</option>
                                                    <option value="USER">User</option>
                                                    <option value="PREMIUM">Premium</option>
                                                    <option value="ADMIN">Admin</option>
                                                </select>
                                                <button type="submit" className="w-fit h-fit px-[2px] py-[1px] rounded-lg bg-green-500">Cambiar</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {/* <tr className="w-full">
                                <td></td>
                                <td></td>
                            </tr> */}
                        </tbody>
                    </table>
                    {confirmationDiv.visibility && <div className="absolute flex flex-col items-center justify-between top-3 right-[28%] pt-6  w-[400px] h-[300px] bg-neutral-700">
                        <div className="text-center text-2xl text-red-500 mx-auto flex items-center justify-center w-full">
                            <AlertIcon className={"h-16 w-16 animate-ping text-center"}></AlertIcon>
                        </div>
                        <p className="text-white text-center mt-3 text-[50px]">Alerta</p>
                        <p className="text-white text-center">Al confirmar, borrarás la receta definitivamente.</p>
                        <p className="text-white text-center">¿Deseas continuar?</p>
                        <form className="w-full flex items-center justify-center h-[30px]  bg-red-50" >
                            <input type="hidden" name="idReported" value={confirmationDiv.reportId} />
                            <input type="hidden" name="idRecipe" value={confirmationDiv.recipeId} />
                            <button type="submit" className="bg-red-700 text-white w-full h-full">
                                Eliminar Receta
                            </button>
                        </form>
                    </div>}
                </div >
            ) : (
                loading || <div className="w-full flex items-center justify-center h-full">
                    No hay Reportes
                </div>
            )
            }


        </div>

    );

}


