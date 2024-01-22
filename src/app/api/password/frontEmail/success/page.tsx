"use client"
import Link from "next/link";

function SuccessComponent() {
  return(
   <>
   <div>
        <h1>Restablecimiento de Contraseña</h1>
        <p>Si el correo electrónico no aparece, revisa tu carpeta de spam.</p>
        <Link style={{color: 'blue'}}href={"/api/login/signin"}>Volver a iniciar sesión</Link>
   </div>
   </>
  );
};
export default SuccessComponent;