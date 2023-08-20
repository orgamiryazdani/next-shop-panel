"use client"

import { useParams } from "next/navigation"

function Page() {
    const { id } = useParams()
    return (
        <div>Page</div>
    )
}

export default Page