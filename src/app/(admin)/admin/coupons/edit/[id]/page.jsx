"use client"

import Loading from "@/common/Loading"
import CouponForm from "@/components/CouponForm"
import { useGetOneCoupon, useUpdateCoupon } from "@/hooks/useCoupons"
import { useGetProducts } from "@/hooks/useProducts"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

function Page() {
    const { id } = useParams()
    const { isLoading, data } = useGetOneCoupon(id)
    const { data: productsData } = useGetProducts()
    const { coupon } = data || {}
    const { products } = productsData || {}
    const [formData, setFormData] = useState({})
    const [type, setType] = useState("percent")
    const [productIds, setProductIds] = useState([])
    const [expireDate, setExpireDate] = useState(new Date())
    const { isLoading: isUpdatingCoupon, mutateAsync } = useUpdateCoupon()
    const router = useRouter()

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { message } = await mutateAsync({
                id: coupon._id,
                data: { ...formData, type, expireDate: new Date(expireDate).toISOString(), productIds: productIds.map((p) => p._id) }
            })
            toast.success(message)
            router.push("/admin/coupons")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        if (coupon) {
            setType(coupon.type);
            setProductIds(coupon.productIds); //? TO DO
            setFormData({
                code: coupon.code,
                amount: coupon.amount,
                usageLimit: coupon.usageLimit,
            })
            setExpireDate(new Date(coupon.expireDate))
        }
    }, [coupon])

    if (isLoading) return <Loading />
    return (
        <div>
            <h1 className="mb-4 font-bold text-xl">ویرایش کردن کد تخفیف</h1>
            <CouponForm
                isLoading={isUpdatingCoupon}
                expireDate={expireDate}
                setExpireDate={setExpireDate}
                type={type}
                setType={setType}
                formData={formData}
                onChangeSelect={setProductIds}
                onFormChange={handleFormChange}
                onSubmit={handleSubmit}
                options={products}
                defaultValue={coupon.productIds}
            />
        </div>
    )
}

export default Page