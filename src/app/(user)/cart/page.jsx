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
        <div className="container lg:max-w-screen-lg">
            <p className="font-bold mb-4">برای مشاهده سبد خرید لطفا لاگین کنید</p>
            <Link href="/auth" className="text-lg font-bold text-primary-900">
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
        <div className="grid grid-cols-4 gap-8 p-10 w-[99vw]">
            <div className="col-span-3 space-y-5">
                {cart && cart.productDetail.map((item) => {
                    return <CartItem key={item.id} cartItem={item} />
                })}
            </div>
            <div className="col-span-1">
                <CartSummery payDetail={cart.payDetail}/>
            </div>
        </div>
    )
}

export default CartPage