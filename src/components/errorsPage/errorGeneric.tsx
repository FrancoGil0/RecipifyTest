import React from 'react'
interface Props{
    error:string
}


function ErrorGeneric({error}:Props) {
  return (
    <div>Error Status: {error}</div>
  )
}

export default ErrorGeneric