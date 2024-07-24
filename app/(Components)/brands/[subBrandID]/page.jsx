import fetchData from '@/app/Hooks/UseGetApi'
import React from 'react'
import Product from '../../Product/page'

export default async function SubBrand({params}) {

    let subBrandID = params.subBrandID

    const { data: products, error, loading: productsLoading } = await fetchData('products')
    const { data: brands, loading: brandsLoading } = await fetchData('brands')

    return <>
        <div>
            {brandsLoading || productsLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
            <div className="row">
                {products?.map((product) => {
                    if (product.brand._id == subBrandID) {
                        return <Product key={product._id} product={product} />
                    }
                })}
            </div>
        </div>
    </>
}
