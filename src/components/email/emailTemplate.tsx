interface EmailTemplateProps {
    firstName: string;
    token: string;
  }
  
  // Arreglar para produccion
  // const PROTOCOL= 'production' ? 'https' : 'http'
  const PROTOCOL= process.env.PROTOCOL
  const domain= process.env.DOMAIN
  export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    token,
  }) => (
    <div className="bg-slate-500">
      <h1 className="text-4xl font-bold">Bienvenido {firstName}!</h1>
      <p>Haz click aqui para cambiar la contraseña de tu cuenta:</p>
      <a href={`${PROTOCOL}://${domain}/api/password/frontEmail/success/${token}`}>Click Aqui!</a>
    </div>
  ); 