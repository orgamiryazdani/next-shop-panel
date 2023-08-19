import Loading from "@/common/Loading"
import { getPayment } from "@/services/paymentService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"

function CartSummery({ payDetail }) {
    const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail
    const { isLoading, mutateAsync } = useMutation({ mutationFn: getPayment })
    const queryClient = useQueryClient()

    const createPaymentHandler = async () => {
        try {
            const { message } = await mutateAsync()
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["get-user"] })
        } catch (error) {
            if (error?.response?.data) {
                toast.error(error.response.data.message)
            }
        }
    }

    return (
        <div className="border p-2 rounded-xl">
            <p className="mb-4 font-bold">اطلاعات پرداخت</p>
            <div className="mb-4 flex items-center justify-between">
                <span>جمع کل</span>
                <span>{totalGrossPrice}</span>
            </div>
            <div className="mb-4 flex items-center justify-between">
                <span>تخفیف</span>
                <span>{totalOffAmount} - </span>
            </div>
            <div className="mb-6 flex items-center justify-between font-bold">
                <span>مبلغ قابل پرداخت</span>
                <span>{totalPrice}</span>
            </div>
            <div>
                {isLoading ? <Loading /> : <button className="btn btn--primary w-full" onClick={createPaymentHandler}>ثبت سفارش</button>}
            </div>
        </div>
    )
}

export default CartSummery