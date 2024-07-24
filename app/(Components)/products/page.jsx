import React from 'react'
import Product from '../Product/page'
import fetchData from '@/app/Hooks/UseGetApi';

export default async function Products() {

  const { data: products, error, loading: productsLoading } = await fetchData('products')

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <>
  {productsLoading ? <div className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></div> : null}
  <div className='row'>
    {products?.map((product) => (
      <Product key={product._id} product={product} />
    ))}
  </div>
</>
}
