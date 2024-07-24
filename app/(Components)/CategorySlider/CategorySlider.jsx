'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function CategotySlider({ categories, categoriesLoading }) {

    return <>
        {categoriesLoading ? <div className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></div> : null}

        <div className='mb-5'>
            <Swiper className='pb-5' spaceBetween={0} slidesPerView={5}  pagination={{ clickable: true }} modules={[ Pagination]}  >
                <div className='mb-5'>
                    {categories.map((category) => {
                        return <div key={category._id}>
                            <SwiperSlide>
                                <div className='d-flex flex-column justify-content-center align-items-center '>
                                    <Image className='w-100 px-1' width={250} height={300} src={category.image} alt={category.name} />
                                    <h5 className='font-sm  text-main'>{category.name}</h5>
                                </div>
                            </SwiperSlide>
                        </div>
                    })}
                </div>
            </Swiper>
        </div>
    </>
}

