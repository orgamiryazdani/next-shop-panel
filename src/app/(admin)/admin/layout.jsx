"use client"
import vazirFont from "@/constants/localFonts"
import { Toaster } from "react-hot-toast"
import Providers from "@/pages/Providers"
import "../../globals.css"
import AdminSideBar from "./AdminSideBar"
import { IoIosArrowBack } from "react-icons/io"
import { useState } from "react"

export const metadata = {
    title: 'پروفایل ادمین',
    description: 'پروفایل ادمین',
}

export default function RootLayout({ children }) {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <html lang="fa" dir="rtl">
            <body suppressContentEditableWarning={true} className={`${vazirFont.variable} font-sans w-[100vw] h-[100vh] 2xl:flex items-center justify-center`}>
                <Providers>
                    <Toaster />
                    <div className="grid grid-cols-6 bg-white h-screen">
                    <div className={`col-span-1 h-full xl:relative absolute p-4 transition-all duration-300 ease-in-out bg-blue-700 ${showMenu === false ? "-right-[210px] xl:-right-0" : "-right-[0px]"}`}>
                            <div onClick={() => setShowMenu(!showMenu)} className="w-12 h-12 rounded-2xl !z-20 rotate-45 xl:hidden bg-blue-700 cursor-pointer flex items-center justify-center text-white absolute -left-4 top-5">
                                <IoIosArrowBack className={`-rotate-45 mr-7 mt-6 transition-all duration-400 ease-in-out ${showMenu === true ? "rotate-[135deg]" : ""}`} />
                            </div>
                            <AdminSideBar />
                        </div>
                        <div className="xl:col-span-5 col-span-6 overflow-y-auto p-4">
                            {children}
                        </div>
                    </div>
                </Providers>
            </body>
        </html >
    )
}
