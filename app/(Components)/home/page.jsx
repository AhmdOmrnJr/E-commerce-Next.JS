import fetchData from '@/app/Hooks/UseGetApi';
import React from 'react'
import Product from '../Product/page';
import MainSlider from '../MainSlider/MainSlider';
import CategotySlider from '../CategorySlider/CategorySlider';
// import dynamic from 'next/dynamic';

// const Product = dynamic(() => import('../Product/page'), { ssr: false });

export default async function Home() {


  const { data: products, error, loading: productsLoading } = await fetchData('products')
  const { data: categories, loading: categoriesLoading } = await fetchData('categories')

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <>

    {productsLoading ? <div className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></div> : null}
    <MainSlider />
    <CategotySlider key={categories._id} categories={categories} categoriesLoading={categoriesLoading} />
    <div className='row'>
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>

  </>
}
