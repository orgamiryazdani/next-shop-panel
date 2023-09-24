"use client"

import { useGetUser } from "@/hooks/useAuth"
import { toLocalDateString } from "@/utils/toLocalData"
import PaymentTable from "./payments/PaymentTable"
import Link from "next/link"
import Loading from "@/common/Loading"

function Profile() {
  const { data, isLoading } = useGetUser()
  const { user, payments } = data || {}
  if (isLoading) return <Loading />
  return (
    <div>
      <div className="flex items-center justify-between text-xs md:text-base font-bold mt-5 mr-3 xl:mr-0">
        <h1>{user.name} خوش آمدید</h1>
        <p className="text-secondary-500">
          <span>تاریخ پیوستن </span>
          <span>{toLocalDateString(user.createdAt)}</span>
        </p>
      </div>
      <div className="text-xs md:text-base mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">آخرین سفارشات کاربر</h2>
          <Link href='/profile/payments' className="text-primary-900">مشاهده همه سفارشات</Link>
        </div>
        <PaymentTable payments={payments
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)}
        />
      </div>
    </div>
  )
}

export default Profile