'use client'
import logo from '../../Assets/images/freshcart-logo.svg'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {

  let [isUserLoggedIn, setIsUserLoggedIn] = useState(Boolean(Cookies.get("token")))
  let pathName = usePathname()
  let route = useRouter()

  function logout () {
    Cookies.remove("token")
    setIsUserLoggedIn(false)
    route.push("/auth/login")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/home">
            <Image src={logo} alt="Fresh_cart_logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="container collapse navbar-collapse" id="navbarSupportedContent">
            {isUserLoggedIn ?
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${pathName == '/home' ? " active" : ""}`} href='/home'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${pathName == '/products' ? " active" : ""}`} href='/products'>Products</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${pathName == '/brands' ? " active" : ""}`} href='/brands/64089fe824b25627a25315d1'>Brands</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${pathName == '/categories' ? " active" : ""}`} href='/categories/6439d5b90049ad0b52b90048'>Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${pathName == '/cart' ? " active" : ""}`} href='/cart'><i className='fa-solid fa-cart-shopping'></i></Link>
                </li>
              </ul> : null}
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item d-flex align-items-center'>
                <i className='fab mx-2 fa-facebook'></i>
                <i className='fab mx-2 fa-twitter'></i>
                <i className='fab mx-2 fa-instagram'></i>
                <i className='fab mx-2 fa-youtube'></i>
                <i className='fab mx-2 fa-tiktok'></i>
              </li>

              {!isUserLoggedIn ? <>
                <li className="nav-item">
                  <Link className="nav-link" href='/auth/login'>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href='/auth/register'>Register</Link>
                </li>
              </>
                :
                <li className="nav-item">
                  <span onClick={logout} className="nav-link cursor-pointer">Logout</span>
                </li>
              }

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
