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
import { selectloggedInUser } from './features/Auth/authSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
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
    element: <Protected><Checkout></Checkout></Protected>
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage></ProductDetailPage></Protected> ,
  },
  {
    path: "/Cart",
    element: <Protected> <CartPage></CartPage></Protected>,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user=useSelector(selectloggedInUser);
  useEffect(()=>{
    if(user){
 dispatch(fetchItemsByUserIdAsync(user.id))
    }
   
  },[dispatch,user]
  )
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
