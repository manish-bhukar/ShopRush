import React, { useEffect } from 'react';
import './App.css';


import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Checkout from './Pages/Checkout';
import ProductDetailPage from './Pages/ProductDetail';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import CartPage from './Pages/CartPage';
import Protected from './features/Auth/Protected';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './Pages/404';
import OrderSucessPage from './Pages/OrderSuccessPage';
import UserOrdersPage from './Pages/UserOrderspage';
import UserProfilePage from './Pages/UserProfile';
import { fetchLoggedInUserAsync, selectUserInfo } from './User/userSlice';
import Logout from './features/Auth/Logout';
import ForgotPassword from './features/Auth/ForgotPassword';
import AdminHome from './Pages/AdminHome';
import AdminProductDetailPage from './Pages/adminProductDetail';
import AdminProductFormpage from './Pages/AdminProductFormpage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { selectloggedInUser } from './features/Auth/authSlice';
const options = {
  position: positions.BOTTOM_LEFT,
  timeout: 5000,
};
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <Protected>
        <AdminHome></AdminHome>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <Protected>
        <AdminProductDetailPage></AdminProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <Protected>
        <AdminProductFormpage></AdminProductFormpage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <Protected>
        <AdminProductFormpage></AdminProductFormpage>
      </Protected>
    ),
  },
  {
    path: "/Cart",
    element: (
      <Protected>
        {" "}
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSucessPage></OrderSucessPage>
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Logout></Logout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ForgotPassword></ForgotPassword>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user=useSelector(selectloggedInUser);
  // console.log('user is '+user);
  useEffect(()=>{
    if(user){
 dispatch(fetchItemsByUserIdAsync())
   dispatch(fetchLoggedInUserAsync())
    }
   
  },[dispatch,user]
  )
  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
