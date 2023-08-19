import { userPaymentTHeads } from "@/constants/tableHeads"
import { toLocalDateStringShort } from "@/utils/toLocalData"

function PaymentTable({payments}) {
    return (
        <div className="shadow-sm overflow-auto my-8">
            <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
                <thead>
                    <tr>
                        {userPaymentTHeads.map((item) => {
                            return <th key={item.id} className="whitespace-nowrap table__th">
                                {item.label}
                            </th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        payments.map((payment, index) => {
                            return <tr key={payment._id}>
                                <td className="table__td">{index}</td>
                                <td className="table__td whitespace-nowrap truncate">{payment.invoiceNumber}</td>
                                <td className="table__td max-w-[280px] whitespace-nowrap truncate">{payment.description}</td>
                                <td className="table__td">
                                    <div className="flex flex-col gap-y-2 items-start">
                                        {payment.cart.productDetail.map((product) => {
                                            return <span className="badge badge--secondary" key={product._id}>{product.title}</span>
                                        })}
                                    </div>
                                </td>
                                <td className="table__td">{payment.amount}</td>
                                <td className="table__td">{toLocalDateStringShort(payment.createdAt)}</td>
                                <td className="table__td">{payment.status === "COMPLETED" ? <span className="badge badge--success">موفق</span> : <span className="badge badge--error">نا موفق</span>}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PaymentTable