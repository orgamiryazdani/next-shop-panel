"use client"

import Loading from "@/common/Loading"
import { useGetProductById } from "@/hooks/useProducts"
import { toLocalDateString } from "@/utils/toLocalData"
import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumbers"
import { useParams } from "next/navigation"

function Page() {
    const { id } = useParams()
    const { data, isLoading } = useGetProductById(id)
    const { product } = data || {}
    if (isLoading) return <Loading />
    //fetch based on Product Id to get product detail

    return (
        <div className="w-full h-full flex md:items-center md:justify-center">
            <div className="bg-white shadow-lg rounded-xl w-96 overflow-auto h-56 p-2 flex flex-col items-start justify-around">
                <div className="flex items-center justify-between w-full">
                    <h1 className="mb-4 font-bold text-xl">{product.title}</h1>
                    <span className="text-secondary-600">{toLocalDateString(product.createdAt)}</span>
                </div>
                <p>{product.description}</p>
                <span>دسته بندی : {product.category.title}</span>
                <div className="flex items-center">
                    <div>
                        قیمت : &nbsp;
                        <span
                            className={`${product.discount ? "line-through text-gray-500" : "font-bold"
                                }`}
                        >
                            {toPersianNumbersWithComma(product.price)}
                        </span>
                    </div>
                    {!!product.discount && (
                        <div className="flex items-center gap-x-2 mr-2">
                            <p className="font-bold">
                                {toPersianNumbersWithComma(product.offPrice)}
                            </p>
                            <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                                {toPersianNumbers(product.discount)} %
                            </div>
                        </div>
                    )}
                </div>
                <div>{product.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-sm text-sm bg-secondary-400 text-white m-2">
                        {tag}
                    </span>
                ))}</div>
            </div>
        </div>
    )
}

export default Page