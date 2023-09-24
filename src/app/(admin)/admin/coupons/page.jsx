"use client"

import Link from "next/link"
import CouponListTable from "./CouponListTable"
import { HiPlusCircle } from "react-icons/hi"
import { useGetCoupons } from "@/hooks/useCoupons"
import Loading from "@/common/Loading"

function Page() {
    const { isLoading, data } = useGetCoupons()
    const { coupons } = data || {}
    console.log(coupons);

    if (isLoading) return <Loading />
    return (
        <div>
            <div className="mb-5 flex items-center justify-between">
                <h1 className="md:text-xl text-md font-bold mb-5">کد های تخفیف</h1>
                <Link className="font-bold text-primary-900 text-sm md:text-base flex items-center gap-x-2" href="/admin/coupons/add">
                    <HiPlusCircle className="w-6 h-6" /> <span>اضافه کردن کد تخفیف</span>
                </Link>
            </div>
            <CouponListTable coupons={coupons} />
        </div>
    )
}

export default Page