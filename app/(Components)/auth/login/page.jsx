"use client"
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import Link from 'next/link'

export default function Login() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function login() {
        setErrorMessage('')
        setIsLoading(true)

        try {
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formik.values),
            })
            const result = await response.json()

            if (result.message === "success") {
                Cookies.set('token', result.token)
                router.push('/home')
            } else {
                setErrorMessage(result.message)
            }
        } catch (error) {
            console.error('Error:', error)
            setErrorMessage(error.response.message)
        }

        setIsLoading(false)
    }

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
        password: Yup.string().required('Password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Must have at least one number, at least one special character and must be greater than 8 characters and max 18 characters'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: login,
        validationSchema
    })

    return (
        <div className='w-75 m-auto my-5'>
            <h1>Login :</h1>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="email">Email:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id='email' name='email' className='form-control mb-3' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

                <label htmlFor="password">Password:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id='password' name='password' className='form-control mb-3' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

                {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : null}

                {isLoading ?
                    <button disabled type="button" className='btn bg-main text-white px-3 ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
                    :
                    <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white px-3 ms-auto d-block'>Log in</button>}
                <Link className='text-main' href='/auth/forgotPassword'>Forgot Password ...</Link>
                <br />
                <Link className='text-main' href='/auth/register'>Register now ...</Link>
            </form>
        </div>
    )
}
