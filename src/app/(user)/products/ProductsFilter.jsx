"use client"
import CheckBox from "@/common/CheckBox"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { HiMinus, HiPlus } from "react-icons/hi"

function ProductsFilter({ categories }) {

    const [showFilter, setShowFilter] = useState(true)
    const [showMoreCategories, setShowMoreCategories] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [selectedCategories, setSelectedCategories] = useState(
        searchParams.get("category")?.split(",") || []
    )

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
            return params.toString()
        }, [searchParams]
    )

    const categoryHandler = (e) => {
        const value = e.target.value;
        if (selectedCategories.includes(value)) {
            const categories = selectedCategories.filter(c => c !== value)
            setSelectedCategories(categories)
            router.push(pathname + "?" + createQueryString("category", categories))
        } else {
            setSelectedCategories([...selectedCategories, value])
            router.push(pathname + "?" + createQueryString("category", [...selectedCategories, value]))
        }
    }

    return (
        <div className="bg-white w-full md:w-56 p-2 rounded-2xl shadow-lg mb-10">
            <div className="font-bold flex items-center justify-between cursor-pointer" onClick={() => {
                setShowFilter(!showFilter)
                setShowMoreCategories(false)
            }}>دسته بندی ها
                <div className={`${showFilter === true ? "rotate-180" : ""} transition-all duration-300 ease-in-out`}>
                    <BsChevronDown />
                </div>
            </div>
            <div className={`${showFilter === true ? "h-40" : "h-0"} ${showMoreCategories === true ? "h-auto" : ""} overflow-hidden transition-he duration-300 ease-in-out`}>
                <ul className="space-y-4">
                    {categories.map((category) => {
                        return (
                            <CheckBox
                                key={category._id}
                                id={category._id}
                                value={category.englishTitle}
                                name="product-type"
                                label={category.title}
                                onChange={categoryHandler}
                                checked={selectedCategories.includes(category.englishTitle)}
                            />
                        )
                    })}
                </ul>
            </div>
            {
                showFilter === true ?
                    <span onClick={() => setShowMoreCategories(!showMoreCategories)} className="text-blue-500 text-sm pr-2 pt-1 flex cursor-pointer">
                        {showMoreCategories === false ? <p className="flex items-center justify-start">موارد بیشتر <HiPlus /></p> : <p className="flex items-center justify-start">موارد کمتر <HiMinus /></p>}
                    </span>
                    : null
            }
        </div>
    )
}

export default ProductsFilter