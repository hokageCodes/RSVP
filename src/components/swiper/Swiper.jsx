
import { Swiper, SwiperSlide } from "swiper/react";
import './swiper.css'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function MainSwiper() {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                clickable: true,
                }}
                autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mainSwiper"
            >
                {[...Array(9).keys()].map((i) => (
                <SwiperSlide key={i}>
                    <img src={`../../../public/images/swiper/${i + 1}.jpeg`} alt="" />
                </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}