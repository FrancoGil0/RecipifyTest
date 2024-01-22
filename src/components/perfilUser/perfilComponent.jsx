"use client"
import React from 'react'
import { useState} from 'react'
function UserPerfil({id,onSubmit,name,email,error}) {

  return (
    <div className="container mt-3 ">
    <div className="card p-3 text-center border border-dark">
      <h4>Editar perfil</h4>
      {error && (
    <div className='mb-2'>
    <p style={{color: "red"}}>{error}</p>
   </div>
  )}
      <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-md-6">
          <div className="inputs">
            <label>Nombre</label>
            <input className="form-control" type="text"  placeholder={name} name="name" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="inputs">
            <label>Email</label>
            <input className="form-control" type="text" placeholder={email} name="email"/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="inputs">
            <label>Password</label>
            <input className="form-control" type="text" placeholder="password" name="password"/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="inputs">
            <label>Repetir password</label>
            <input className="form-control" type="text" placeholder="repeat password" name="repeatPassword"/>
          </div>
        </div>
      </div>

      <div className="mt-3 gap-2 d-flex justify-content-end">
        <button className="px-3 btn btn-sm btn-outline-danger">Atrás</button>
        <button className="px-3 btn btn-sm btn-primary" type="submit">Save</button>
      </div>
      </form>
    </div>
  </div>
  )
}

export default UserPerfil