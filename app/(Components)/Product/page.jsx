"use client"
import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react'
import { toast } from 'react-toastify';


export default function Product({ product }) {


  async function addProductToCart(productId) {
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart?', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: Cookies.get("token"),
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return <>

    <div className="col-md-2">
      <div className="product overflow-hidden p-2 cursor-pointer">
        <Link className='cursor-pointer' href={'/products/' + product._id}>
          <img className='w-100' src={product.imageCover} alt="" />
          <h5 className='font-sm text-main py-2'>{product.category.name}</h5>
          <h4>{product.title.split(" ").splice(0, 2).join(" ")}</h4>
          <p className='d-flex justify-content-between'>
            <span>{product.price} EGP</span>
            <span className='rating-color'><i className='fas fa-star me-1'></i>{product.ratingsAverage}</span>
          </p>
        </Link>
        <button onClick={() => addProductToCart(product._id)} className='btn w-100 text-white bg-main'>Add to cart</button>
      </div>
    </div>

  </>

}
