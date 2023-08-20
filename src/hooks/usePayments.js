import { getAllPayments, getOnePaymentById } from "@/services/paymentService"
import { useQuery } from "@tanstack/react-query"

export const useGetPayments = () => useQuery({ queryKey: ["payments"], queryFn: getAllPayments, retry: false })

export const useGetPaymentById = (id) =>
    useQuery({
        queryKey: ["payments", id],
        queryFn: () => getOnePaymentById(id),
        retry: false,
        refetchOnWindowFocus: true,
    });