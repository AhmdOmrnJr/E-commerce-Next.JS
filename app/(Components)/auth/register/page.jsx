"use client"
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

export default function Register() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function register() {
        setErrorMessage('')
        setIsLoading(true)

        try {
            const respone = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formik.values),
            })
            const result = await respone.json()

            if (result.message === "success") {
                router.push('/auth/login')

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
        name: Yup.string().required('Name is required').min(3, 'Min length 3 characters').max(20, 'Max length 20 characters'),
        email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
        password: Yup.string().required('Password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Must have at least one number, at least one special character and must be greater than 8 characters and max 18 characters'),
        rePassword: Yup.string().required('RePassword is required').oneOf([Yup.ref('password')], 'Password and RePassword must be identical'),
        phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },
        onSubmit: register,
        validationSchema
    })

    return (
        <div className='w-75 m-auto my-5'>
            <h1>Register now:</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" id='name' name='name' className='form-control mb-3' />
                {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null}

                <label htmlFor="email">Email:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id='email' name='email' className='form-control mb-3' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

                <label htmlFor="password">Password:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id='password' name='password' className='form-control mb-3' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

                <label htmlFor="rePassword">Re-Password:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" id='rePassword' name='rePassword' className='form-control mb-3' />
                {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null}

                <label htmlFor="phone">Phone:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" id='phone' name='phone' className='form-control mb-3' />
                {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}

                {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : null}

                {isLoading ?
                    <button disabled type="button" className='btn bg-main text-white px-3 ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
                    :
                    <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white px-3 ms-auto d-block'>Register</button>}
            </form>
        </div>
    )
}
