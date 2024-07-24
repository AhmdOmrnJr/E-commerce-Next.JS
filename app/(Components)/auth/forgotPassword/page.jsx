'use client'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as Yup from 'yup'

export default function ForgotPasswords() {

  const router = useRouter()
  let [errorMessage, setErrorMessage] = useState('')
  let [isLoading, setisLoading] = useState(false)

  async function sendCode() {
    setErrorMessage('')
    setisLoading(true)
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formik.values)
      })
      const result = await response.json()
      console.log(result)
      if (result.statusMsg == "success") {
        setisLoading(false)
        router.push('/auth/verifyResetCode')
      }
    } catch (error) {
      setErrorMessage = (error.message)
    }
  }


  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
  })


  let formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: sendCode,
    validationSchema
  })

  return <>
    <div className='w-75 m-auto my-5'>
      <h1>Enter Your Email:</h1>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">Email:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id='email' name='email' className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

        {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : null}

        {isLoading ?
          <button disabled type="button" className='btn bg-main text-white px-3 ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
          :
          <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white px-3 ms-auto d-block'>Send code</button>}


      </form>
    </div>
  </>
}
