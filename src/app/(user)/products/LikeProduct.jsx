"use client"

import { likeProduct } from "@/services/productService"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast"
import { GoHeartFill } from "react-icons/go"

function LikeProduct({ product }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const likeHandler = async () => {
        try {
            const { message } = await likeProduct(product._id)
            toast.success(message)
            router.refresh(pathname + "?" + searchParams.toString())
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <div>
            <button onClick={likeHandler}>{product.isLiked ? <GoHeartFill className="fill-red-500 w-6 h-6" /> : <GoHeartFill className="text-secondary-300 w-6 h-6" />}</button>
        </div>
    )
}

export default LikeProduct