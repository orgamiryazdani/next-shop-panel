"use client"
import { useGetUser } from "@/hooks/useAuth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CiSearch } from "react-icons/ci"
import { BsCart2 } from "react-icons/bs"

function Header() {
    const { data, isLoading } = useGetUser()
    const { user, cart } = data || {}
    const pathname = usePathname();

    return (
        <header className={`static top-0 w-full transition-all duration-200 bg-white ${isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"}`}>
            <nav>
                <ul className="flex items-center justify-between py-2 container xl:max-w-screen-xl">
                    <div className="w-[37%] flex items-center justify-between">
                        <li>
                            <Link className="block pt-2" href="/">
                                خانه
                                <div className={pathname == "/" ? "w-1/2 rounded-xl bg-blue-400 h-[2px]" : ""}></div>
                            </Link>
                        </li>
                        <li>
                            <Link className="block pt-2" href="/products">
                                محصولات
                                <div className={pathname == "/products" ? "w-1/2 rounded-xl bg-blue-400 h-[2px]" : ""}></div>
                            </Link>
                        </li>
                        <li>
                            <Link className="block pt-2" href="/profile">
                                پنل کاربر
                            </Link>
                        </li>
                        <li>

                            <Link className="block pt-2" href="/admin">
                                پنل ادمین
                            </Link>
                        </li>
                    </div>
                    <SearchHandler />
                    <div className="flex items-center justify-between w-[13%]">
                        {
                            user ?
                                <span>{user.name}</span>
                                :
                                <li>
                                    <Link className="flex pt-0 bg-black text-white hover:bg-slate-800 transition-all duration-300 hover:shadow-xl ease-in-out shadow-slate-600 w-20 h-9 rounded-md items-center justify-center" href="/auth">
                                        ورود
                                    </Link>
                                </li>
                        }
                        <li>
                            <Link className="py-2 flex relative" href="/cart">
                                <BsCart2 className="text-2xl" />
                                {cart ? cart.payDetail.productIds.length >= 1 &&
                                    <div className="w-5 h-5 text-center left-4 bottom-5 text-xs bg-rose-500 rounded-full flex items-center justify-center absolute text-white">
                                        {cart ? cart.payDetail.productIds.length : 0}
                                    </div>
                                    : null}
                            </Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Header

function SearchHandler() {
    return (
        <div className="w-[50%] flex items-center justify-center h-full">
            <input type="search" className="outline-none bg-gray-100 w-4/6 rounded-r-xl border-none placeholder:text-gray-400 h-9 p-2" placeholder="جستجو..." />
            <div className="w-10 h-9 rounded-l-xl flex items-center justify-center bg-gray-100 cursor-pointer">
                <CiSearch />
            </div>
        </div>
    )
}