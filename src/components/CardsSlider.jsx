"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { useGetProducts } from '@/hooks/useProducts';
import { toLocalDateStringShort } from '@/utils/toLocalData';
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/toPersianNumbers';
import Link from 'next/link';
import LikeProduct from '@/pages/(user)/products/LikeProduct';
import AddToCart from '@/pages/(user)/products/[slug]/AddToCart';

function CardsSlider() {
    const { data } = useGetProducts()
    const { products } = data || {}
    return (
        <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="cardsSlider"
        >
            {products ? products.slice(0, 3).map((product) => {
                return (
                    <SwiperSlide key={product.id}>
                        <div className='w-full h-full text-black p-2 flex flex-col justify-between'>
                            <div className="flex items-center justify-between my-1">
                                <h2 className="font-bold text-lg mb-4">{product.title}</h2>

                            </div>

                            <div className="flex items-center justify-between flex-col">
                                <Link
                                    className="text-primary-700 font-bold mb-4 block border-b border-primary-700 text-sm"
                                    href={`/products/${product.slug}`}
                                >
                                    مشاهده
                                </Link>
                                <div>
                                    <div>
                                        قیمت :&nbsp;
                                        <span
                                            className={`${product.discount ? "line-through text-gray-500" : "font-bold"
                                                }`}
                                        >
                                            {toPersianNumbersWithComma(product.price)}
                                        </span>
                                    </div>
                                    {!!product.discount && (
                                        <div className="flex items-center gap-x-2 mt-2">
                                            <p className="font-bold">
                                                {toPersianNumbersWithComma(product.offPrice)}
                                            </p>
                                            <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                                                {toPersianNumbers(product.discount)} %
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-end justify-between h-auto">

                                <div className="text-sm text-secondary-300">
                                    <span className="font-bold">
                                        {toLocalDateStringShort(product.createdAt)}
                                    </span>
                                </div>

                                <div>
                                    <LikeProduct product={product} />
                                    <AddToCart product={product} />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            }) : null}
        </Swiper>
    )
}

export default CardsSlider