
import { Providers } from "./providers";
import './normalize.css'
import './layout.css'
import './globals.css'
import NavBar from "@/components/navbar-component/NavBar";
import Footer from "./Footer";
import localFont from 'next/font/local'

export const titleFont=localFont({
  src:'./fonts/titleFont.ttf',
  display:'swap',
  variable:'--font-title'
});



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={"bg-neutral-200 overflow-x-hidden  flex flex-col min-h-screen max-h-fit relative"}>
        <Providers>
          <NavBar/>
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
