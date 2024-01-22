import Link from 'next/link'
import {titleFont} from '@/app/layout'

interface props{
    path:string,
    text:string,
    styles:string
}

const LinkButton=(props:props)=>{
    return(
        <div className={'bg-neutral-600  rounded-md m-auto mt-10 flex flex-col justify-center text-center '+ props.styles }>
        <Link className={`${titleFont.className} text-2xl  text-neutral-300 hover:text-neutral-200`} rel="stylesheet" href={props.path}>{props.text}</Link>
        </div>
    )
}

export default LinkButton;