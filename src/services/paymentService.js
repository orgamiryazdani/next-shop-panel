import http from "./httpService"

export function getPayment() {
    return http.post('/payment/create').then(({ data }) => data.data)
}