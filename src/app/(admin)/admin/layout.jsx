import vazirFont from "@/constants/localFonts"
import { Toaster } from "react-hot-toast"
import Providers from "@/pages/Providers"
import "../../globals.css"
import AdminSideBar from "./AdminSideBar"

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
                    <div className="grid grid-cols-6 bg-white h-screen">
                        <div className="col-span-1 overflow-y-auto p-4 bg-blue-700">
                            <AdminSideBar />
                        </div>
                        <div className="col-span-5 overflow-y-auto p-4">
                            {children}
                        </div>
                    </div>
                </Providers>
            </body>
        </html >
    )
}
