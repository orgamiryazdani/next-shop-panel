"use client"

import CategoryForm from "@/components/CategoryForm"
import { useAddCategory } from "@/hooks/useCategories"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"


function Page() {
    const [category, setCategory] = useState({
        title: "",
        description: "",
        englishTitle: "",
    })
    const [selectedType, setSelectedType] = useState("")
    const router = useRouter()
    const { isLoading, mutateAsync } = useAddCategory()

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { message } = await mutateAsync({ ...category, type: selectedType.value })
            toast.success(message)
            router.push('/admin/categories')
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div>
            <h1 className="mb-6 font-bold text-xl">افزودن دسته بندی جدید</h1>
            <CategoryForm
                category={category}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                isLoading={isLoading}
                handleChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default Page