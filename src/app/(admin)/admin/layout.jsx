import vazirFont from "@/constants/localFonts"
import { Toaster } from "react-hot-toast"
import Providers from "@/pages/Providers"
import "../../globals.css"

export const metadata = {
    title: 'پروفایل ادمین',
    description: 'پروفایل ادمین',
}

export default function RootLayout({ children }) {
    return (
        <html lang="fa" dir="rtl">
            <body suppressContentEditableWarning={true} className={`${vazirFont.variable} font-sans`}>
                <Providers>
                    <Toaster />
                    <div className="container xl:max-w-screen-xl">
                        {children}
                    </div>
                </Providers>
            </body>
        </html >
    )
}
