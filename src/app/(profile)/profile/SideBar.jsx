"use client"

import { logout } from "@/services/authServices"
import Link from "next/link"
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi"
import { ImProfile } from "react-icons/im"
import { CgProfile } from "react-icons/cg"
import { MdOutlineIntegrationInstructions } from "react-icons/md"
import { usePathname } from "next/navigation"

function SideBar() {
    const logoutHandler = async () => {
        await logout()
        document.location.href = '/'
    }
    const pathname = usePathname();

    return (
        <div className="">
            <ul className="flex flex-col space-y-8 text-white">
                <li>
                    <Link className="menu-item" href='/'>
                        <HiOutlineHome className="ml-2" />
                        صفحه اصلی
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname == "/profile" ? "bg-blue-900" : ""} menu-item`} href='/profile'>
                        <CgProfile className="ml-2" />
                        داشبورد
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname == "/profile/me" ? "bg-blue-900" : ""} menu-item`} href='/profile/me'>
                        <ImProfile className="ml-2" />
                        اطلاعات کاربری
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname == "/profile/payments" ? "bg-blue-900" : ""} menu-item`} href='/profile/payments'>
                        <MdOutlineIntegrationInstructions className="ml-2" />
                        سفارشات
                    </Link>
                </li>
                <li className="menu-item">
                    <HiOutlineLogout className="ml-2" />
                    <button onClick={logoutHandler}>خروج از حساب کاربری</button>
                </li>
            </ul>
        </div>
    )
}

export default SideBar