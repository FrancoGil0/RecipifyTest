"use client"

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
function SignInButton({inString,outString}:{inString:string,outString:string}) {
  
  const {data: session}= useSession()
  if(session && session.user){
    return (
    <button onClick={()=>signOut({callbackUrl: "/"})} className='text-red-500'>
    {session.user.name} {outString}
    </button>
    )
  }
  return <button className='font-semibold'>
    <Link href={"/api/auth/signin"} >
      {inString}
    </Link>
  </button>
}

export default SignInButton