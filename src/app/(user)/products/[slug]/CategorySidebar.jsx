"use client"
import ProductsFilter from "../ProductsFilter"
import ProductsSort from "../ProductsSort"

function CategorySidebar({ categories }) {
    return (
        <div className="md:col-span-1 col-span-6 px-5 md:px-0 md:mr-20 flex justify-around md:justify-start md:items-start items-start flex-wrap md:flex-col">
            <ProductsFilter categories={categories} />
            <ProductsSort />
        </div>
    )
}

export default CategorySidebar