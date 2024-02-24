import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { ProfileMenuIcon } from "../icons";
import Link from "next/link";


interface dropdownProps {
    id: number | string;
    handleEditInfo:Function
}

export default function ProfileDropwdown({ id , handleEditInfo}: dropdownProps) {

    return (
        <Dropdown className='shadow-xl' placement='bottom-end'>
            <DropdownTrigger className='w-[30px] sm:w-[40px] cursor-pointer sm:mr-2 md:mr-2'>
                <button className='outline-none flex items-center justify-center'>
                    <ProfileMenuIcon />
                </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Menu Actions" variant="faded">
                <DropdownItem key="Change_Pass" className="h-14 gap-3">
                    <Link href={`/api/change_pass/${id}`}>Cambiar Contraseña</Link>
                </DropdownItem>
                <DropdownItem key="edit_profile" onClick={()=>handleEditInfo()} className="h-14 gap-3">
                    <p>Editar Perfil</p>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}