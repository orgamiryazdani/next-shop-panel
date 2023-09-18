import { categoryListTableTHeads } from '@/constants/tableHeads'
import { useRemoveCategory } from '@/hooks/useCategories'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-hot-toast'
import { HiEye, HiTrash } from 'react-icons/hi'
import { RiEdit2Line } from 'react-icons/ri'

function CategoryListTable({ categories }) {

    const { mutateAsync } = useRemoveCategory()
    const queryClient = useQueryClient()
    const removeProductHandler = async (id) => {
        try {
            const { message } = await mutateAsync(id)
            toast.success(message)
            queryClient.invalidateQueries({ queryKey: ["get-categories"] })
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="shadow-lg rounded-xl bg-white overflow-auto my-8">
            <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
                <thead>
                    <tr>
                        {categoryListTableTHeads.map((item) => {
                            return <th key={item.id} className="whitespace-nowrap table__th">
                                {item.label}
                            </th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((category, index) => {
                            return <tr key={category._id}>
                                <td className="table__td">{index}</td>
                                <td className="table__td whitespace-nowrap font-bold">{category.title}</td>
                                <td className="table__td">{category.description}</td>
                                <td className="table__td">{category.englishTitle}</td>
                                <td className="table__td">
                                    <span className='badge badge--secondary'>{category.type}</span>
                                </td>
                                <td className="table__td font-bold text-lg">
                                    <div className="flex gap-x-4 items-center">
                                        <button onClick={() => removeProductHandler(category._id)}>
                                            <HiTrash className="text-rose-600 w-6 h-6" />
                                        </button>
                                        <Link href={`/admin/categories/edit/${category._id}`}>
                                            <RiEdit2Line className="text-primary-900 w-6 h-6" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CategoryListTable