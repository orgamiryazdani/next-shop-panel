import { adminPaymentListTableTHeads } from "@/constants/tableHeads";
import { toLocalDateStringShort } from "@/utils/toLocalData";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";

function PaymentListTable({ payments }) {
    return (
        <div className="shadow-lg rounded-xl bg-white overflow-auto my-8">
            <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
                <thead>
                    <tr>
                        {adminPaymentListTableTHeads.map((item) => {
                            return (
                                <th className="whitespace-nowrap table__th" key={item.id}>
                                    {item.label}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => {
                        return (
                            <tr key={payment._id}>
                                <td className="table__td">{index + 1}</td>
                                <td className="table__td  whitespace-nowrap truncate">
                                    {payment.invoiceNumber}
                                </td>
                                <td className="table__td  max-w-[280px] whitespace-nowrap truncate">
                                    {payment.description}
                                </td>
                                <td className="table__td  whitespace-nowrap truncate">
                                    <div className="flex flex-col gap-y-2">
                                        <span> {payment.user.name}</span>
                                        <span> {payment.user.email}</span>
                                        <span className="font-bold">
                                            {payment.user.phoneNumber}
                                        </span>
                                    </div>
                                </td>
                                <td className="table__td">
                                    <div className="flex flex-col gap-y-2 items-start">
                                        {payment.cart.productDetail.map((product) => {
                                            return (
                                                <span
                                                    className="badge badge--secondary"
                                                    key={product._id}
                                                >
                                                    {product.title}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </td>
                                <td className="table__td font-bold text-lg">
                                    {toPersianNumbersWithComma(payment.amount)}
                                </td>
                                <td className="table__td">
                                    {toLocalDateStringShort(payment.createdAt)}
                                </td>
                                <td className="table__td">
                                    {payment.status === "COMPLETED" ? (
                                        <span className="badge badge--success">موفق</span>
                                    ) : (
                                        <span className="badge badge--error">ناموفق</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default PaymentListTable;
