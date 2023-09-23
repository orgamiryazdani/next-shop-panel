"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Slider() {
    return (
        <div className='xl:w-[75%] w-[100%] h-[200px]  xl:h-[500px] px-5 md:h-[500px] lg:px-20 xl:px-5'>
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="slider z-10"
        >
            <SwiperSlide>
                <img src='././images/2.jpg' alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src='././images/3.jpg' alt="" />
            </SwiperSlide>
        </Swiper>
        </div>
    )
}

export default Slider