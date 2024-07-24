import fetchData from '@/app/Hooks/UseGetApi'
import Link from 'next/link'
import React from 'react'


export default async function Layout({children}) {

  const { data: brands, loading: brandsLoading } = await fetchData('brands')

  return <>
  {brandsLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
  <div className='row'>
    <div className="col-md-2">
      {brands?.map((brand) => {
        return <div key={brand._id}  >
          <div className="product overflow-hidden p-2 cursor-pointer">
            <Link className='cursor-pointer' href={'/brands/' + brand._id} >
              <h5 className='font-sm text-main'>{brand.name}</h5>
            </Link>
          </div>
        </div>
      })}
    </div>
    <div className="col-md-10 ps-3 py-3">
        {children}
    </div>
  </div>
</>
}
