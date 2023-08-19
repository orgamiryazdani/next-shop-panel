'use client'

import { useParams } from 'next/navigation';

function Page() {
    const { id } = useParams();
    //get user data based on id
    console.log(id);
    return (
        <div>Page</div>
    )
}

export default Page