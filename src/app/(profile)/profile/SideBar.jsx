"use client"

import { logout } from "@/services/authServices"
import Link from "next/link"
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi"
import { ImProfile } from "react-icons/im"
import { CgProfile } from "react-icons/cg"
import { MdOutlineIntegrationInstructions } from "react-icons/md"

function SideBar() {
    const logoutHandler = async () => {
        await logout()
        document.location.href = '/'
    }
    return (
        <div className="">
            <ul className="flex flex-col space-y-8 text-white">
                <li>
                    <Link className="menu-item bg-blue-900" href='/'>
                        <HiOutlineHome className="ml-2" />
                        صفحه اصلی
                    </Link>
                </li>
                <li>
                    <Link className="menu-item" href='/profile'>
                        <CgProfile className="ml-2"/>
                        داشبورد
                    </Link>
                </li>
                <li>
                    <Link className="menu-item" href='/profile/me'>
                        <ImProfile className="ml-2"/>
                        اطلاعات کاربری
                    </Link>
                </li>
                <li>
                    <Link className="menu-item" href='/profile/payments'>
                        <MdOutlineIntegrationInstructions className="ml-2"/>
                        سفارشات
                    </Link>
                </li>
                <li className="menu-item">
                    <HiOutlineLogout className="ml-2"/>
                    <button onClick={logoutHandler}>خروج از حساب کاربری</button>
                </li>
            </ul>
        </div>
    )
}

export default SideBar