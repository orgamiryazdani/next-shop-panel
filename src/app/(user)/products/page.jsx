import { getCategories } from "@/services/categoryService"
import { getProducts } from "@/services/productService"
import CategorySidebar from "./[slug]/categorySidebar"
import queryString from "query-string"
import { toLocalDateStringShort } from "@/utils/toLocalData"
import Link from "next/link"
import AddToCart from "./[slug]/AddToCart"
import LikeProduct from "./LikeProduct"
import { cookies } from 'next/headers'
import { toStringCookies } from "@/utils/toStringCookies"

export const dynamic = "force-dynamic"

async function Products({ searchParams }) {
    // const { products } = await getProducts(queryString.stringify(searchParams))
    // const { categories } = await getCategories()

    const cookieStore = cookies()
    const strCookies = toStringCookies(cookieStore)
    const productsPromise = await getProducts(queryString.stringify(searchParams), strCookies)
    const categoriesPromise = await getCategories()
    const [{ products }, { categories }] = await Promise.all([productsPromise, categoriesPromise])

    return (
        <div>
            <h1 className="text-xl font-bold mb-6">صفحه محصولات</h1>
            <div className="gird grid-cols-4">
                <CategorySidebar categories={categories} />
                <div className="col-span-3">
                    <div className="grid grid-cols-3 gap-4">
                        {
                            products.map((product) => {
                                return (
                                    <div
                                        key={product._id}
                                        className="col-span-1 border rounded-xl shadow-md p-4"
                                    >
                                        <h2 className="font-bold text-xl mb-4">{product.title}</h2>
                                        <div className="mb-4">
                                            <span>تاریخ ساختن : </span>
                                            <span className="font-bold">
                                                {toLocalDateStringShort(product.createdAt)}
                                            </span>
                                        </div>
                                        <Link href={`/products/${product.slug}`} className="text-primary-900 font-bold">
                                            مشاهده محصول
                                        </Link>
                                        <LikeProduct product={product} />
                                        <AddToCart product={product} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products