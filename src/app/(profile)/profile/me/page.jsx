"use client"

import TextField from "@/common/TextField"
import Loading from "@/common/loading"
import { useGetUser } from "@/hooks/useAuth"
import { updateProfile } from "@/services/authServices"
import { includeObj } from "@/utils/objectUtils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

function MePage() {
    const { data, isLoading } = useGetUser()
    const queryClient = useQueryClient()
    const { isLoading: isUpdating, mutateAsync } = useMutation({ mutationFn: updateProfile })
    const [formData, setFormData] = useState({})
    const { user } = data || {}
    const includesKey = ['name', 'email', 'phoneNumber', 'biography'];
    useEffect(() => {
        if (user) {
            setFormData(includeObj(user, includesKey))
        }
    }, [user])
    if (isLoading) return <Loading />

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { message } = await mutateAsync(formData);
            queryClient.invalidateQueries({ queryKey: ['get-user'] })
            toast.success(message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div>
            <h1 className="font-bold text-lg">اطلاعات کاربری</h1>
            <form className="w-full h-[90vh] flex flex-col justify-between p-5" dir="ltr" onSubmit={submitHandler}>
                {Object.keys(includeObj(user, includesKey)).map((key) => {
                    return <TextField
                        label={key}
                        name={key}
                        key={key}
                        value={formData[key] || ''}
                        onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />
                })}
                <div>
                    {
                        isUpdating ? <Loading /> : <button type="submit" className="btn btn--primary w-full mt-10 rounded-lg">تایید</button>
                    }
                </div>
            </form>
        </div>
    )
}

export default MePage