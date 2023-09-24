"use client"

import { logout } from "@/services/authServices"
import Link from "next/link"
import { CgProfile } from "react-icons/cg"
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi"
import { MdOutlineIntegrationInstructions } from "react-icons/md"
import { PiUsersThreeFill } from "react-icons/pi"
import { BsFillBoxSeamFill } from "react-icons/bs"
import { BiSolidCategory, BiSolidDiscount } from "react-icons/bi"
import { usePathname } from "next/navigation"

function SideBar() {
    const logoutHandler = async () => {
        await logout()
        document.location.href = '/'
    }
    const pathname = usePathname();

    return (
        <div>
            <ul className="flex flex-col space-y-8 text-white relative">
                <li>
                    <Link className="menu-item !z-40 absolute w-full" href='/'>
                        <HiOutlineHome className="ml-2" />
                        صفحه اصلی
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname == "/admin" ? "bg-blue-900" : ""} menu-item mt-8`} href='/admin'>
                        <CgProfile className="ml-2" />
                        داشبورد
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname == "/admin/users" ? "bg-blue-900" : ""} menu-item`} href='/admin/users'>
                        <PiUsersThreeFill className="ml-2"/>
                        کاربران
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname == "/admin/products" ? "bg-blue-900" : ""} menu-item`} href='/admin/products'>
                        <BsFillBoxSeamFill className="ml-2"/>
                        محصولات
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname == "/admin/categories" ? "bg-blue-900" : ""} menu-item`} href='/admin/categories'>
                        <BiSolidCategory className="ml-2"/>
                        دسته بندی
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname == "/admin/coupons" ? "bg-blue-900" : ""} menu-item`} href='/admin/coupons'>
                        <BiSolidDiscount className="ml-2"/>
                        کد تخفیف
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname == "/admin/payments" ? "bg-blue-900" : ""} menu-item`} href='/admin/payments'>
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