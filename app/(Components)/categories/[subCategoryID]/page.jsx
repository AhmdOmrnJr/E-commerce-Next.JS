import fetchData from '@/app/Hooks/UseGetApi'
import React from 'react'
import Product from '../../Product/page'

export default async function SubCategory({params}) {

    let subCategoryID = params.subCategoryID

    const { data: products, error, loading: productsLoading } = await fetchData('products')
    const { data: categories, loading: categoriesLoading } = await fetchData('categories')

    return <>
        <div>
            {categoriesLoading || productsLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
            <div className="row">
                {products?.map((product) => {
                    if (product.category._id == subCategoryID) {
                        return <Product key={product._id} product={product} />
                    }
                })}
            </div>
        </div>
    </>
}
