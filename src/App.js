
import './App.css';
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { Offline } from 'react-detect-offline';
import { Toaster } from 'react-hot-toast';
import { CartContextProvider } from './Context/CartContext.js';
import { ProductsContextProvider } from './Context/ProductsContext.js';
import { AuthenticationContextProvider } from './Context/AuthenticationContext.js';
import Layout from './components/Layout/Layout.jsx';
import Home from './components/Home/Home.jsx';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import BrandSlider from './components/BrandSlider/BrandSlider';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Categories from './components/Categories/Categories';
import NotFound from './components/NotFound/NotFound';
import Brands from './components/Brands/Brands';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import Checkout from './components/Checkout/Checkout';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import WishList from './components/WishList/WishList';
import AllOrders from './components/AllOrders/AllOrders';



function App() {

  const [userData, setUserData] = useState(null);
  function saveUserDate() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    const token = encodedToken;
  const decoded = jwtDecode(token);
  
  console.log(decoded);
  }

  let router = createBrowserRouter([
    {
      path: '', element: <Layout userData={userData} setUserData={setUserData} saveUserDate={saveUserDate} />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: 'categories/:id', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands/:id', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'BrandSlider', element: <ProtectedRoute><BrandSlider /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><AllOrders userData={userData} /></ProtectedRoute> },
        { path: 'login', element: <Login saveUserDate={saveUserDate} /> },
        { path: 'register', element: <Register /> },
        { path: 'forgetPassword', element: <ForgetPassword /> },
        { path: 'resetPassword', element: <ResetPassword /> },
        { path: '*', element: <NotFound /> },
      ]
    },
  ]);

  return <>
    <div>
      <Offline>
        <div className='offline'>
          You are offline
          <i className="fa-solid fa-face-frown fa-xl ms-2"></i>
        </div>
      </Offline>
    </div>
    <Toaster />

    <AuthenticationContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartContextProvider>
      </ProductsContextProvider>
    </AuthenticationContextProvider>
  </>
}

export default App;
