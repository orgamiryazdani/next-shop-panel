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
            <div className="flex items-center justify-between flex-wrap  gap-x-8 flex-1">
            <span className="text-xs md:text-base font-bold mb-5 md:mb-0">{cartItem.title}</span>
                <div className="text-xs md:text-base mr-5 md:mr-0 mb-5 md:mb-0">
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
                            <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-xs md:text-sm">
                                {toPersianNumbers(cartItem.discount)} %
                            </div>
                        </div>
                    )}
                </div>

                <span className="border-r-2 pr-2 text-xs md:text-base">
                    تعداد : {toPersianNumbers(cartItem.quantity)}
                </span>
                <div className="flex md:gap-x-3 gap-x-1">
                    <button
                        onClick={addToCartHandler}
                        className="btn btn--primary md:p-2 p-1 ml-2"
                    >
                        <HiPlus className="md:w-4 md:h-4 w-3 h-3" />
                    </button>
                    <button onClick={decrementHandler} className="">
                        {cartItem.quantity > 1 ? (
                            <div className="rounded-full text-white bg-secondary-100 md:p-2 p-1">
                                <HiMinus className="md:w-4 md:h-4 w-3 h-3" />
                            </div>
                        ) : (
                            <FaTrash className=" text-rose-500 md:w-5 md:h-5 w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem