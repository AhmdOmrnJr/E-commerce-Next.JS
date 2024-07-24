import fetchData from '@/app/Hooks/UseGetApi'
import Link from 'next/link'
import React from 'react'


export default async function Layout({children}) {

  const { data: categories, loading: categoriesLoading } = await fetchData('categories')

  return <>
  {categoriesLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
  <div className='row'>
    <div className="col-md-2">
      {categories?.map((category) => {
        return <div key={category._id}  >
          <div className="product overflow-hidden p-2 cursor-pointer">
            <Link className='cursor-pointer' href={'/categories/' + category._id} >
              <h5 className='font-sm text-main'>{category.name}</h5>
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
