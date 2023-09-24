"use client";

import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import CartItem from "./CartItem";
import CartSummery from "./CartSummery";

function CartPage() {
    const { data, isLoading } = useGetUser()
    const { user, cart } = data || {}
    if (isLoading) return <Loading />
    if (!user || !data) return (
        <div className="container w-full h-[90vh] flex items-center justify-center flex-col text-2xl">
            <p className="font-bold mb-4">برای مشاهده سبد خرید لطفا لاگین کنید</p>
            <Link href="/auth" className="font-bold text-primary-900">
                رفتن به صفحه لاگین؟
            </Link>
        </div>
    )

    if (!user.cart?.products || user.cart?.products.length === 0)
        return <div className="w-[100vw] h-[91vh] flex items-center justify-center flex-col text-3xl">
            <p>سبد خرید خالیه!</p>
            <Link href="/products" className="font-bold text-primary-900 mt-5 border-b-2 border-primary-900">
                رفتن به صفحه محصولات
            </Link>
        </div>

    return (
        <div className="w-[99vw] flex items-center justify-center">
            <div className="lg:grid flex flex-wrap grid-cols-4 gap-8 md:p-10 p-5 w-full max-w-screen-2xl">
                <div className="lg:col-span-3 space-y-5 min-w-[200px] w-full">
                    {cart && cart.productDetail.map((item) => {
                        return <CartItem key={item.id} cartItem={item} />
                    })}
                </div>
                <div className="lg:col-span-1 w-full min-w-[230px]">
                    <CartSummery payDetail={cart.payDetail} />
                </div>
            </div>
        </div>
    )
}

export default CartPage