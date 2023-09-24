import TextField from "@/common/TextField"
import { TagsInput } from "react-tag-input-component"
import Select from 'react-select';
import Loading from "@/common/Loading";

const productsFormData = [
    {
        id: 1,
        label: "عنوان",
        name: "title",
    },
    {
        id: 2,
        label: "توضیحات",
        name: "description",
    },
    {
        id: 3,
        label: "اسلاگ",
        name: "slug",
    },
    {
        id: 4,
        label: "برند",
        name: "brand",
    },
    {
        id: 5,
        label: "قیمت",
        name: "price",
    },
    {
        id: 6,
        label: "تخفیف",
        name: "discount",
    },
    {
        id: 7,
        label: "قیمت روی تخفیف",
        name: "offPrice",
    },
    {
        id: 8,
        label: "موجودی",
        name: "countInStock",
    },
    {
        id: 9,
        label: "لینک عکس محصول",
        name: "imageLink",
    },
]

function ProductForm({ onSubmit, tags, setTags, productData, productDataOnChange, categories, selectedCategory = "", setSelectedCategory, isLoading }) {
    return (
        <div className="w-full md:px-10">
            <form onSubmit={onSubmit} className="space-y-4">
                {
                    productsFormData.map((item) => {
                        return <TextField
                            key={item.id}
                            label={item.label}
                            name={item.name}
                            value={productData[item.name] ?? ""}
                            onChange={productDataOnChange}
                        />
                    })
                }
                <div>
                    <label htmlFor="tags" className="mb-2">تگ محصولات</label>
                    <TagsInput
                        id="tags"
                        value={tags}
                        onChange={setTags}
                        name="tags"
                    // placeHolder="تگ"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="mb-2">دسته بندی</label>
                    <Select
                        id="category"
                        onChange={setSelectedCategory}
                        options={categories}
                        getOptionLabel={(option) => option.title}
                        getOptionValue={(option) => option._id}
                        defaultValue={selectedCategory}
                    />
                </div>
                <div>
                    {
                        isLoading ? <Loading /> :
                            <button className="btn btn--primary w-full mt-4">تایید</button>
                    }
                </div>
            </form>
        </div>
    )
}

export default ProductForm