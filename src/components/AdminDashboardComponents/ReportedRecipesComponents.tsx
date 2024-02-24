"use client"

import Link from "next/link";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import {AdminInterface} from '@/app/api/admin/route'
import { AlertIcon, DeleteRecipeIcon, DeleteReportIcon, EyeIcon } from "../icons";
import { ListLoader, TableLoader } from "../UserProfileComponents/perfilLoadingComponents";
import { Spinner } from "@nextui-org/react";



interface Reportes {

    id: number;

    recipeID: string;

    reportedBy: {

        id: string;

        name: string;

    };

    reportedRecipe: {

        id: string;

        title: string;

    };

}



export default function ReportedRecipes() {

    const [reports, setReports] = useState([] as Reportes[]);
    const [loading, setLoading] = useState(true);

    type confirmationObject={
        visibility:Boolean,
        recipeId:number
        reportId:number
    }


    const [confirmationDiv, setConfirmationDiv] = useState({} as confirmationObject);

    const router = useRouter();



    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:3000/api/admin", {
                method: "GET",
            });
            const reportesExistentes = await response.json();
            setLoading(false);
            setReports(reportesExistentes);

        };
        fetchUsers();


    }, [reports]);



    const onDeleteReportes = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();



        const res = await fetch("http://localhost:3000/api/admin", {

            method: "DELETE",

        });



        if (res.ok) {

            router.push("/admin");

        }

    };



    const onDeleteRecipe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const idRecipe = ((event.currentTarget.elements.namedItem("idRecipe") as HTMLInputElement).value)
        const idReported = ((event.currentTarget.elements.namedItem("idReported") as HTMLInputElement).value)
        const res = await fetch("http://localhost:3000/api/recetas", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idRecipe,
                idReported,
            }),
        });
        if (res.ok) {
            router.push("/admin");
        }
        setConfirmationDiv({
            visibility:false,
            recipeId:0,
            reportId:0
        })
    };


    const handleDivConfirmation = ({visibility,recipeId,reportId}:confirmationObject) => {
        setConfirmationDiv({
            visibility,
            recipeId,
            reportId
        })
    }

    const handleDeleteReport =async  ({idReporte}:AdminInterface) => {
        const res = await fetch("http://localhost:3000/api/admin", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idReporte,
                action:"deleteReport"
            }),
        });

        if (res.ok) {
            router.push("/admin");
        }

    }

    


    



    return (

        <div className="lg:min-h-[700px]  py-12">
            {loading && 
            <div className="w-full flex items-center justify-center h-full">
            <Spinner></Spinner>
        </div>
            }
            {reports.length > 0 ? (

                <div className="relative lg:w-[950px] lg:h-[500px]  mx-auto">
                    <table className=" w-full table-fixed ">
                        <thead>
                            <tr className="bg-neutral-400 w-full text-center">
                                <th className="w-1/3 p-2">Reportada por:</th>
                                <th className="w-1/3 p-2">Receta Reportada</th>
                                <th className="w-1/3 p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="gap-3 h-full ">
                            {reports.map((report, i) => (
                                <tr className={i % 2 === 0 ? "text-center h-[10px] hover:bg-emerald-400  transition-all bg-emerald-100 rounded-[50px]" : "text-center hover:bg-emerald-400  h-[15px] transition-all  rounded-[50px] bg-emerald-200"} key={report.id}>
                                    <td className="lg:min-w-1/3 lg:w-1/3 lg:max-w-1/3 mx-auto p-1">{report.reportedBy.name}</td>
                                    <td className=" lg:min-w-1/3 lg:w-1/3 lg:max-w-1/3 mx-auto p-1">{report.reportedRecipe.title}</td>
                                    <td className=" lg:min-w-1/3 lg:w-1/3 lg:max-w-1/3 mx-auto p-1">
                                        <div className="flex gap-6 justify-center items-center ">
                                            <Link className="pt-2" href={`/recetas/${report.reportedRecipe.id}`}>
                                                <button className="hover:animate-spin"><EyeIcon /></button>
                                            </Link>
                                            <button className="hover:animate-bounce" onClick={()=>handleDivConfirmation({visibility:true,recipeId:+report.recipeID,reportId:report.id})}><DeleteRecipeIcon /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr className="w-full">
                                <td></td>
                                <td></td>
                                <td className="w-full"><form className="w-full  lg:h-12 flex p-2" onSubmit={(event) => onDeleteReportes(event)}>
                                    <button type="submit" className="mx-auto px-3 rounded-lg bg-red-600 text-white ">
                                        Borrar todos los reportes
                                    </button>
                                </form></td>
                            </tr>
                        </tbody>
                    </table>
                    {confirmationDiv.visibility && <div className="absolute flex flex-col items-center justify-between top-3 right-[28%] pt-6  w-[400px] h-[300px] bg-neutral-700">
                        <div  className="text-center text-2xl text-red-500 mx-auto flex items-center justify-center w-full">
                            <AlertIcon className={"h-16 w-16 animate-ping text-center"}></AlertIcon>
                        </div>
                        <p className="text-white text-center mt-3 text-[50px]">Alerta</p>
                        <p className="text-white text-center">Al confirmar, borrarás la receta definitivamente.</p>
                        <p className="text-white text-center">¿Deseas continuar?</p>
                        <form className="w-full flex items-center justify-center h-[30px]  bg-red-50" onSubmit={(event) => onDeleteRecipe(event)}>
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


