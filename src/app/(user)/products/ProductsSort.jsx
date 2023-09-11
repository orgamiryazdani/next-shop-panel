"use client"
import RadioInput from "@/common/RadioInput"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"

const sortOptions = [
    {
        id: 1,
        value: "latest",
        label: "جدید ترین"
    },
    {
        id: 2,
        value: "earliest",
        label: "قدیمی ترین"
    },
    {
        id: 3,
        value: "popular",
        label: "محبوب ترین"
    }
]

function ProductsSort() {

    const [showFilter, setShowFilter] = useState(true)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [sort, setSort] = useState("")

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
            return params.toString()
        }, [searchParams]
    )

    const sortHandler = (e) => {
        const value = e.target.value;
        setSort(value)
        router.push(pathname + "?" + createQueryString("sort", value))
    }

    useEffect(() => {
        setSort(searchParams.get("sort") || "")
    }, [])

    return (
        <div className="bg-white w-56 p-2 rounded-2xl shadow-lg mr-20 mt-10">
            <div className="font-bold flex items-center justify-between cursor-pointer" onClick={() => setShowFilter(!showFilter)}>مرتب سازی محصولات
                <div className={`${showFilter === true ? "rotate-180" : ""} transition-all duration-300 ease-in-out`}>
                    <BsChevronDown />
                </div>
            </div>
            <div className={`${showFilter === true ? "h-28" : "h-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
                {
                    sortOptions.map((item) => {
                        return <RadioInput
                            id={item.id}
                            key={item.id}
                            label={item.label}
                            name="product-sort"
                            value={item.value}
                            checked={sort === item.value}
                            onChange={sortHandler}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default ProductsSort