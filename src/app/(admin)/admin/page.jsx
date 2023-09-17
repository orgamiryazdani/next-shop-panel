"use client"
import Loading from "@/common/Loading"
import { useGetUser } from "@/hooks/useAuth"
import { toLocalDateString } from "@/utils/toLocalData"

function Admin() {
  const { data, isLoading } = useGetUser()
  const { user } = data || {}
  if (isLoading) return <Loading />
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="font-bold text-xl">صفحه ادمین</h1>
      <div className="bg-white shadow-lg rounded-xl w-[800px] h-96 mt-16 px-4 flex flex-col justify-around">
        <div className="flex items-center justify-between text-secondary-400">
        <h1 className="font-bold text-xl text-black">{user.name}</h1>
        <span>{toLocalDateString(user.createdAt)}</span>
        </div>
        <p className="border-b border-primary-500">سطح شما : {user.role}</p>
        <p className="border-b border-primary-500">ایمیل : {user.email}</p>
        <p className="border-b border-primary-500">شماره همراه : {user.phoneNumber}</p>
        <p className="border-b border-primary-500">درباره شما : {user.biography}</p>
      </div>
    </div>
  )
}

export default Admin