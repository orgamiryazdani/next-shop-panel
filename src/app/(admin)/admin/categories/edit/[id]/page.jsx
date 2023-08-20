"use client"

import Loading from "@/common/Loading"
import CategoryForm, { categoryType } from "@/components/CategoryForm"
import { useGetCategoryById, useUpdateCategory } from "@/hooks/useCategories"
import { includeObj } from "@/utils/objectUtils"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const includesCategoryKey = ["title", "englishTitle", "description"]

function Page() {
    const { id } = useParams()
    const { data, isLoading: isLoadingCategory } = useGetCategoryById(id)
    const { category } = data || {}
    const [selectedType, setSelectedType] = useState("")
    const [formData, setFormData] = useState({})
    const { isLoading, mutateAsync } = useUpdateCategory()
    const router = useRouter()

    useEffect(() => {
        if (category) {
            setSelectedType(categoryType.find((c) => c.value === category.type))
            setFormData(includeObj(category, includesCategoryKey))
        }
    }, [data])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { message } = await mutateAsync({ id: category._id, data: { ...formData, type: selectedType.value } })
            toast.success(message)
            router.push('/admin/categories')
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    if (isLoadingCategory) return <Loading />

    return (
        <div>
            <h1 className="mb-6 font-bold text-xl">ویرایش دسته بندی</h1>
            <CategoryForm
                category={formData}
                selectedType={categoryType.find((c) => c.value === category.type)}
                setSelectedType={setSelectedType}
                isLoading={isLoading}
                handleChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default Page