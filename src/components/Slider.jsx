"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Slider() {
    return (
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
    )
}

export default Slider