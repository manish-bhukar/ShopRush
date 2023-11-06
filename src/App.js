import React from 'react';
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

import CartPage from './Pages/CartPage';
import Protected from './features/Auth/Protected';

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
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
