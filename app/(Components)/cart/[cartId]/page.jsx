'use client'
import { useFormik } from 'formik'
import Cookies from 'js-cookie';
import React from 'react'

export default function Address({ params }) {

  const cartId = params.cartId
  console.log(params);
  async function Order(shippingAddress) {
    const response = await fetch (`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        token: Cookies.get("token")
      },
      body: JSON.stringify({shippingAddress})
    })
    const data = await response.json()
    window.location.href = data.session.url
  }


  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: Order

  })


  return (

    <form className='w-75 m-auto my-5' onSubmit={formik.handleSubmit}>

      <label htmlFor="details">Details:</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" id='details' name='details' className='form-control mb-3' />

      <label htmlFor="phone">Phone:</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" id='phone' name='phone' className='form-control mb-3' />

      <label htmlFor="city">City:</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" id='city' name='city' className='form-control mb-3' />

      <button type="submit" className='btn bg-main text-white px-3 ms-auto d-block'>Order</button>


    </form>
  )
}
