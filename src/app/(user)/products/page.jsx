import CategorySidebar from "./[slug]/categorySidebar"
import { getCategories } from "@/services/categoryService"
import { getProducts } from "@/services/productService"
import queryString from "query-string"
import { toLocalDateStringShort } from "@/utils/toLocalData"
import Link from "next/link"
import AddToCart from "./[slug]/AddToCart"
import LikeProduct from "./LikeProduct"
import { cookies } from 'next/headers'
import { toStringCookies } from "@/utils/toStringCookies"
import { RiProductHuntFill } from "react-icons/ri"
import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumbers"

export const dynamic = "force-dynamic"; // eq to {cache :"no-store"} or SSR in pages Dir. :)

async function Products({ searchParams }) {
  // const { products } = await getProducts(queryString.stringify(searchParams));
  // const { categories } = await getCategories();
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);
  const productsPromise = getProducts(
    queryString.stringify(searchParams),
    strCookies
  );

  const categoryPromise = getCategories();
  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoryPromise,
  ]);

  return (
    <div className="flex items-start justify-center w-[100vw] min-h-[100vh] h-auto pt-10">
      <div className="grid grid-cols-6">
        <CategorySidebar categories={categories} />
        <div className="col-span-5 ml-24 mr-32">
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => {
              return (
                <div
                  className="col-span-1 bg-white rounded-xl shadow-lg p-3"
                  key={product._id}
                >
                  <div className="flex items-center justify-between my-1">
                    <h2 className="font-bold text-lg mb-4">{product.title}</h2>
                    <div className="mb-4 text-xs text-gray-400">
                      <span className="font-bold">
                        {toLocalDateStringShort(product.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between my-1">
                    <Link
                      className="text-primary-700 font-bold mb-4 block border-b border-primary-700 text-sm"
                      href={`/products/${product.slug}`}
                    >
                      مشاهده
                    </Link>
                    <LikeProduct product={product} />
                  </div>
                  <div className="flex items-center justify-between h-auto mt-2">
                    <div className="flex items-center justify-center">
                      <span className="mt-0">{toPersianNumbersWithComma(product.price)} تومان</span>
                      {!!product.discount &&
                        <div className="bg-rose-500 px-2 py-0.5 mr-2 rounded-xl text-white text-sm">
                          {toPersianNumbers(product.discount)} %
                        </div>
                      }
                    </div>
                    <AddToCart product={product} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
