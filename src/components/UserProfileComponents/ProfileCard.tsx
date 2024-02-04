import NextLink from "next/link";
import { Link } from '@nextui-org/react'
import { useSession } from "next-auth/react";
import { CancelIcon, ConfirmationIcon, EditButton } from "../icons";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function ProfileCard({ name, id, email, country, className, profileDescription }: { name: string, id: number | string, email: string, country: string, className: string, profileDescription: string }) {

    const session = useSession()
    const router = useRouter()
    const params = useParams()


    const photoDefault = "https://i.pinimg.com/236x/2f/97/f0/2f97f05b32547f54ef1bdf99cd207c90.jpg"
    const [photoURL, setPhotoURL] = useState(photoDefault)
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {

        async function getPhoto() {
            const res = await fetch("http://localhost:3000/api/userback/photo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id:Number(params.id)
                })
            })

            const data = await res.json()

            setPhotoURL(data.photo)
        }
        getPhoto()
    }, [photoURL])

    const handleVisibility = () => {
        setVisibility(!visibility)
    }

    const handlePhotoUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const photoURL = ((event.currentTarget.elements.namedItem("InputURL") as HTMLInputElement).value)
        const ID = ((event.currentTarget.elements.namedItem("InputID") as HTMLInputElement).value)
        setPhotoURL(photoURL)
        const res = await fetch("http://localhost:3000/api/userback/perfil", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: ID,
                photo: photoURL,
            }),
        }
        );
        if (res.ok) return router.push("/perfil/" + ID)

        handleVisibility()

    }

    return (
        <div className={className + " relative"} key={id}>
            {id === session.data?.user.id && <div className="w-[50px] h-[50px]"><Link as={NextLink} href={`/api/change_pass/${id}`}>Cambiar Contraseña</Link></div>}
            <div className="mx-auto bg-white h-[200px] w-[200px] overflow-hidden rounded-[50%]">
                <img className="w-full h-full object-contain" src={photoURL} alt="perfil" />
            </div>
            {visibility && <div className="absolute top-[47%] right-[23%]  h-fit">
                <form onSubmit={(event) => handlePhotoUpdate(event)} className="w-fit flex justify-center items-center mx-auto mt-3">
                    <input type="text" name="InputURL" placeholder="https://imagenes.com/foto" className="placeholder:text-[12px]" />
                    <input type="text" hidden name="InputID" value={id} className="placeholder:text-[12px]" />
                    <button type="submit" className="text-white bg-green-500" ><ConfirmationIcon></ConfirmationIcon></button>
                    <div onClick={handleVisibility} className="text-white bg-red-500"><CancelIcon></CancelIcon></div>
                </form>
            </div>}
            {visibility === false && <div onClick={handleVisibility} className="lg:top-[39%] cursor-pointer lg:right-[130px] w-[30px] h-[30px] rounded-[50%] bg-zinc-300 border-[.1px] p-[3.4px] border-orange-600 opacity-80 hover:opacity-100  shadow-xl text-orange-600 flex items-center justify-center lg:absolute">
                <EditButton></EditButton>
            </div>}
            <div className="text-center text-3xl mt-5">{name}</div>
            <div className="text-xl text-center">{profileDescription ? profileDescription : "Hola! Estoy usando Recipify! :D"}</div>

            <div className={"w-3/4 mx-auto mt-3 text-center"}>
                <p className="text-lg">Detalles:</p>
                <p>País: {country}</p>
                <p>Mail: {email}</p>
            </div>
            <div className="mx-auto text-2xl h-[50px] w-[110px] flex items-center justify-center bg-emerald-600 rounded-3xl mt-10">Seguir</div>
        </div>
    )
}