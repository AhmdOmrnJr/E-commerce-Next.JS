'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import img1 from "../../Assets/images/slider-image-1.jpeg"
import img2 from "../../Assets/images/slider-image-2.jpeg"
import img3 from "../../Assets/images/slider-image-3.jpeg"
import img4 from "../../Assets/images/grocery-banner.png"
import img5 from "../../Assets/images/grocery-banner-2.jpeg"
import Image from 'next/image';

export default function MainSlider () {
    return (
        <div className="container">
            <div className="main-slider mt-5 mb-5">
                <div className='row'>
                    <div className='col-md-9 p-0'>
                        <Swiper spaceBetween={0} slidesPerView={1} navigation pagination={{ clickable: true }} modules={[Navigation, Pagination]}  >
                            <SwiperSlide><Image className='w-100' height={400} src={img1} alt="" /></SwiperSlide>
                            <SwiperSlide><Image className='w-100' height={400} src={img2} alt="" /></SwiperSlide>
                            <SwiperSlide><Image className='w-100' height={400} src={img3} alt="" /></SwiperSlide>
                        </Swiper>
                    </div>
                    <div className='col-md-3 p-0'>
                        <Image className='w-100' height={200} src={img4} alt="" />
                        <Image className='w-100' height={200} src={img5} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};