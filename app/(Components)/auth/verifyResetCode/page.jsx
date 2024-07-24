'use client'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as Yup from 'yup'


export default function VerifyResetCode() {

  const router = useRouter()
  let [errorMessage, setErrorMessage] = useState('')
  let [isLoading, setisLoading] = useState(false)

  async function resetPassword() {
    setErrorMessage('')
    setisLoading(true)
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formik.values)
      })
      const result = await response.json()
      console.log(result)
      if (result.status == "Success") {
        setisLoading(false)
        router.push('/auth/resetPassword')
      }
    } catch (error) {
      setErrorMessage = (error.response.message)
    }
  }

  let validationSchema = Yup.object({
    resetCode: Yup.string().required('Enter code'),
  })


  let formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: resetPassword,
    validationSchema
  })

  return <>
    <div className='w-75 m-auto my-5'>
      <h1>Reset code had been sent to your e-mail</h1>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="resetCode">Reset code:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="text" id='resetCode' name='resetCode' className='form-control mb-3' />
        {formik.errors.resetCode && formik.touched.resetCode ? <div className='alert alert-danger'>{formik.errors.resetCode}</div> : null}

        {errorMessage? <div className='alert alert-danger'>{errorMessage}</div> : null}

        {isLoading ? 
        <button disabled type="button" className='btn bg-main text-white px-3 ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
        :
        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white px-3 ms-auto d-block'>Send code</button>}


      </form>
    </div>
  </>
}
