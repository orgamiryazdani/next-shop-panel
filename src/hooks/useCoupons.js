import { addNewCoupon, getAllCoupons, getOneCoupon, removeCoupon, updateCoupon } from "@/services/couponService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCoupons = () => useQuery({ queryKey: ["get-coupons"], queryFn: getAllCoupons, retry: false })

export const useGetOneCoupon = (id) => useQuery({ queryKey: ["get-coupon", id], queryFn: () => getOneCoupon(id), retry: false })

export const useRemoveCoupon = () => useMutation({ mutationFn: removeCoupon })

export const useAddNewCoupon = () => useMutation({ mutationFn: addNewCoupon })

export const useUpdateCoupon = () => useMutation({ mutationFn: updateCoupon })