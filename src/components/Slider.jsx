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
            className="slider"
        >
            <SwiperSlide>
                <img src='././2.jpg' alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src='././image1.jpg' alt="" />
            </SwiperSlide>
        </Swiper>
    )
}

export default Slider