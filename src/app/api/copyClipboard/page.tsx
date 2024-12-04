// src/app/api/copyClipboard/page.tsx
import CopyToClipboardButton from "@/components/copyToClipboard/copyToClipboardButton";

const Page = () => {
  const url = "https://example.com"; // Aquí podrías definir tu enlace predeterminado.
  
  return (
    <div>
      <h1>Copiar al portapapeles</h1>
      <CopyToClipboardButton url={url} />
    </div>
  );
};

export default Page;
