"use client"
import { useGetUser } from "@/hooks/useAuth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CiSearch } from "react-icons/ci"
import { BsCart2 } from "react-icons/bs"
import { HiOutlineMenuAlt1 } from "react-icons/hi"
import { MdOutlineClose } from "react-icons/md"
import { useState } from "react"

function Header() {
    const { data, isLoading } = useGetUser()
    const { user, cart } = data || {}
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(true)

    return (
        <header className={`static top-0 w-full transition-all duration-200 bg-white ${isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"}`}>
            <nav>
                <ul className="flex items-center justify-start py-2 container xl:max-w-screen-xl text">
                    <div className={`${showMenu !== true ? "-right-[0%] w-0" : "-right-[100%] w-3/4"} text-sm lg:text-base md:w-[37%] md:relative md:-right-[0%] md:h-10 md:shadow-none transition-all duration-300 flex md:items-center md:justify-between bg-white md:bg-transparent p-2 absolute top-0 text-black shadow-2xl flex-col md:flex-row w-3/4 h-[100vh] items-start`}>
                        <li>
                            <Link className="md:block flex flex-col md:pt-2 p-2 pt-5 w-full rounded-xl" href="/">
                                خانه
                                <div className={pathname == "/" ? "w-1/2 rounded-xl bg-blue-400 h-[2px]" : ""}></div>
                            </Link>
                        </li>
                        <li>
                            <Link className="md:block flex flex-col md:pt-2 p-2 pt-5 w-full rounded-xl" href="/products">
                                محصولات
                                <div className={pathname == "/products" ? "w-1/2 rounded-xl bg-blue-400 h-[2px]" : ""}></div>
                            </Link>
                        </li>
                        <li>
                            <Link className="block md:pt-2 p-2 pt-5" href="/profile">
                                پنل کاربر
                            </Link>
                        </li>
                        <li>

                            <Link className="block md:pt-2 p-2 pt-5" href="/admin">
                                پنل ادمین
                            </Link>
                        </li>
                    </div>
                    <SearchHandler />
                    <div className="flex items-center justify-between md:w-[13%] w-[35%]">
                        {
                            user ?
                                <span className="text-xs whitespace-nowrap truncate md:text-base">{user.name}</span>
                                :
                                <li>
                                    <Link className="flex pt-0 border-b text-sm border-black md:bg-black md:text-white md:hover:bg-slate-800 md:transition-all duration-300 hover:shadow-xl ease-in-out shadow-slate-600 md:w-20 md:h-9 md:rounded-md md:items-center md:justify-center" href="/auth">
                                        ورود
                                    </Link>
                                </li>
                        }
                        <li>
                            <Link className="py-2 flex relative" href="/cart">
                                <BsCart2 className="md:text-2xl text-xl mx-2" />
                                {cart ? cart.payDetail.productIds.length >= 1 &&
                                    <div className="md:w-5 md:h-5 w-3 h-3 text-center left-5 bottom-5 md:text-xs text-[8px] bg-rose-500 rounded-full flex items-center justify-center absolute text-white">
                                        {cart ? cart.payDetail.productIds.length : 0}
                                    </div>
                                    : null}
                            </Link>
                        </li>
                        <button className="text-2xl cursor-pointer md:hidden" onClick={() => setShowMenu(!showMenu)}>
                            {showMenu !== true ?
                                <MdOutlineClose />
                                :
                                <HiOutlineMenuAlt1 />
                            }
                        </button>
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Header

function SearchHandler() {
    return (
        <div className="md:w-[50%] w-[65%] flex items-center justify-center h-full">
            <input type="search" className="outline-none bg-gray-100 w-4/6 rounded-r-xl border-none placeholder:text-gray-400 h-9 p-2" placeholder="جستجو..." />
            <div className="w-10 h-9 rounded-l-xl flex items-center justify-center bg-gray-100 cursor-pointer">
                <CiSearch />
            </div>
        </div>
    )
}