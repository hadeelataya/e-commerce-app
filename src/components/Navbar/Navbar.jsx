import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import logo from '../../Assets/freshcart-logo.svg'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext.js'

export default function Navbar({ userData, logOut }) {

    let { numOfCartItems, numOfFavoriteItems } = useContext(cartContext);
    return <>
        <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" />
                </Link>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    {userData !== null ?
                        <ul className="navbar-nav me-auto ms-5 mt-2 mb-lg-0 fw-bold">
                            <li className="nav-item ms-5 ">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="Products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="BrandSlider">Brands</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="Cart">Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="wishlist">wishlist</Link>
                            </li>
                      
                        </ul> : null}
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

                        {userData == null ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="signin">SignIn</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="signup">SignUp</Link>
                                </li>
                            </> : <>
                                <li className="nav-item position-relative">
                                    <Link className="nav-link" to="wishlist">
                                        <i className="fa-solid fa-heart fa-xl text-danger my-2 mx-1 px-2"></i>
                                        {
                                            numOfFavoriteItems > 0 ? <span className='badge bg-main text-white position-absolute top-0 end-0'>{numOfFavoriteItems}</span> : null
                                        }
                                    </Link>
                                </li>
                                <li className="nav-item position-relative">
                                    <Link className="nav-link" to="Cart">
                                        <i className='fas fa-shopping-cart fa-xl text-black my-2 mx-1 px-2'></i>
                                        {
                                            numOfCartItems > 0 ? <span className='badge bg-main text-white position-absolute top-0 end-0'>{numOfCartItems}</span> : null
                                        }
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link ms-1" onClick={() => { logOut("Bay bay 😢"); }} >Log out</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>

    </>
}
