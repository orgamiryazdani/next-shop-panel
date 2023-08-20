"use client"

import Loading from "@/common/Loading"
import { useGetPaymentById } from "@/hooks/usePayments"
import { useParams } from "next/navigation"

function Page() {
    const { id } = useParams()
    const { data, isLoading } = useGetPaymentById(id)
    const { payment } = data || {}
    console.log(payment);
    if (isLoading) return <Loading />

    return (
        <div>{payment.map((p) => (
            p.description
        ))}</div>
    )
}

export default Page