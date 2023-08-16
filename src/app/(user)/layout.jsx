import vazirFont from "@/constants/localFonts"
import Header from "../Header"
import "../globals.css"
import { Toaster } from "react-hot-toast"
import Providers from "../Providers"

export const metadata = {
  title: 'next shop panel',
  description: 'next.js amir yazdani',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body suppressContentEditableWarning={true} className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster />
          <Header />
          <div className="container xl:max-w-screen-xl">
            {children}
          </div>
        </Providers>
      </body>
    </html >
  )
}
