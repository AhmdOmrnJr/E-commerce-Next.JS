'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'

export default function Cart() {
  let [errorMessage, setErrorMessage] = useState("")
  let [cartProducts, setCartProducts] = useState([])
  let [isLoading, setIsLoading] = useState(false)
  let [requestTimeOut, setRequestTimeOut] = useState()
  let [totalCartPrice, setTotalCartPrice] = useState(0)
  let [cartId, setCartId] = useState(0)

  useEffect(() => {
    getLoggedInUserCart()
  }, [])

  async function getLoggedInUserCart() {
    setIsLoading(true)
    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: Cookies.get("token")
        }
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setCartProducts(data.data.products)
      setTotalCartPrice(data.data.totalCartPrice)
      setCartId(data.data._id)
    } catch (error) {
      console.error('error:', error)
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function removeProductFromCart(productId) {
    setIsLoading(true)
    try {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          token: Cookies.get("token")
        }
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setCartProducts(data.data.products)
      setTotalCartPrice(data.data.totalCartPrice)
    } catch (error) {
      console.error('error:', error)
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function ClearCart() {
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: 'DELETE',
        headers: {
          token: Cookies.get("token")
        }
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setCartProducts([])
      setTotalCartPrice(0)
    } catch (error) {
      console.error('error:', error)
      setErrorMessage(error.message)
    }
  }

  function updateProductCount(productId, count, index) {
    let newProducts = [...cartProducts]
    newProducts[index].count = count
    setCartProducts(newProducts)

    clearTimeout(requestTimeOut)

    setRequestTimeOut(setTimeout(async () => {
      try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            token: Cookies.get("token")
          },
          body: JSON.stringify({ count })
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setCartProducts(data.data.products)
        setTotalCartPrice(data.data.totalCartPrice)
      } catch (error) {
        console.error('error:', error)
        setErrorMessage(error.message)
      }
    }, 1000))
  }

  return (
    <>
      {isLoading ? (
        <div className='text-center'>
          <i className='fas fa-spinner fa-spin fa-2x py-5 my-5 '></i>
        </div>
      ) : (
        <>
          {cartProducts.length === 0 ? (
            <h1 className='alert alert-danger text-center m-5'>No products added to the cart</h1>
          ) : (
            <div className='my-5'>
              <div>
                <button onClick={ClearCart} className='btn btn-danger d-block ms-auto'>Clear Cart</button>
                {cartProducts?.map((product, index) => (
                  <div key={product._id} className='cart-product shadow rounded-2 my-3'>
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <img className='w-100' src={product.product.imageCover} alt="" />
                      </div>
                      <div className="col-md-8">
                        <h2>{product.product.title}</h2>
                        <h5>{product.product.category.name}</h5>
                        <p>
                          <span>{product.price} EGP</span>
                          <span className='ms-3'><i className='fas fa-star rating-color me-1'></i>{product.product.ratingsAverage}</span>
                        </p>
                        <p><span className='fw-bolder'>Total price: </span>{product.count * product.price}</p>
                      </div>
                      <div className="col-md-2 p-1">
                        <div className="d-flex align-items-center">
                          <button onClick={() => updateProductCount(product.product._id, product.count + 1, index)} className='btn bg-main text-white mx-2'>+</button>
                          <span>{product.count}</span>
                          <button onClick={() => updateProductCount(product.product._id, product.count - 1, index)} className='btn bg-main text-white mx-2'>-</button>
                          <button onClick={() => removeProductFromCart(product.product._id)} className='btn text-bg-danger'>Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='d-flex justify-content-between'>
                <Link href={`/cart/${cartId}`} className='btn bg-main text-white'>Checkout</Link>
                <p>Total cart price: {totalCartPrice} EGP</p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
