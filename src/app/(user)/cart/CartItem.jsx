"use client"
import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart"
import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumbers"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { HiMinus, HiPlus } from "react-icons/hi"
import { FaTrash } from "react-icons/fa"

function CartItem({ cartItem }) {
    const queryClient = useQueryClient()
    const { mutateAsync: addToCartAsync } = useAddToCart()
    const { mutateAsync: decFromCartAsync } = useDecrementFromCart()

    const addToCartHandler = async () => {
        try {
            const { message } = await addToCartAsync(cartItem._id)
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["get-user"] })
        } catch (error) {
            if (error?.response?.data) {
                toast.error(error.response.data.message)
            }
        }
    }

    const decrementHandler = async () => {
        try {
            const { message } = await decFromCartAsync(cartItem._id)
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["get-user"] })
        } catch (error) {
            if (error?.response?.data) {
                toast.error(error.response.data.message)
            }
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-xl p-4 flex justify-between">
            <span className="flex-1 font-bold">{cartItem.title}</span>
            <div className="flex items-center justify-between  gap-x-8 flex-1">
                <div>
                    <div>
                        قیمت : 
                        <span
                            className={`${cartItem.discount ? "line-through text-gray-500" : "font-bold"
                                }`}
                        >
                            {toPersianNumbersWithComma(cartItem.price)}
                        </span>
                    </div>
                    {!!cartItem.discount && (
                        <div className="flex items-center gap-x-2 mt-2">
                            <p className="font-bold">
                                {toPersianNumbersWithComma(cartItem.offPrice)}
                            </p>
                            <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                                {toPersianNumbers(cartItem.discount)} %
                            </div>
                        </div>
                    )}
                </div>

                <span className="border-r-2 pr-2">
                    تعداد : {toPersianNumbers(cartItem.quantity)}
                </span>
                <div className="flex gap-x-3">
                    <button
                        onClick={addToCartHandler}
                        className="btn btn--primary p-2 ml-2"
                    >
                        <HiPlus className="w-4 h-4" />
                    </button>
                    <button onClick={decrementHandler} className="">
                        {cartItem.quantity > 1 ? (
                            <div className="rounded-full text-white bg-secondary-100 p-2">
                                <HiMinus className="w-4 h-4" />
                            </div>
                        ) : (
                            <FaTrash className=" text-rose-500 w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem