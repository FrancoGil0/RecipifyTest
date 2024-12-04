

export default function CopyToClipboardButton  (url:string)  {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => alert('¡Enlace copiado al portapapeles!'))
      .catch(err => console.error('Error al copiar al portapapeles: ', err));
  };

  return (
    <button className="font-bold cursor-pointer" onClick={copyToClipboard}>Copiar Enlace</button>
  );
};

