"use client"

import Loading from "@/common/Loading"
import { useGetProductById } from "@/hooks/useProducts"
import { useParams } from "next/navigation"

function Page() {
    const { id } = useParams()
    const { data, isLoading } = useGetProductById(id)
    const { product } = data || {}
    if (isLoading) return <Loading />
    //fetch based on Product Id to get product detail

    return (
        <div>
            <h1 className="mb-4 font-bold text-xl">{product.title}</h1>
        </div>
    )
}

export default Page