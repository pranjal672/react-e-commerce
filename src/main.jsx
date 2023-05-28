import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, redirect } from 'react-router-dom';
import Layout from "./containers/Layout";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Products from "./pages/Products";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from "./context/SessionContext";
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import OrdersDetails from './pages/OrdersDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route index element={<App />} />
      <Route path='login' element={<Login />} />
      <Route path='account' element={<Account />}>
        <Route path='profile' element={<Profile />} />
        <Route path='orders' element={<Orders />} />
      </Route>
      <Route path='orderdetails/:id' element={<OrdersDetails />} />
      <Route path='products/:id' element={<Products />} />
      <Route path='cart' element={<Cart />} />
      <Route path='search' element={<Search />} />
      <Route path='checkout' element={<Checkout />} />
      <Route path='success' element={<Success />} />
      <Route path='*' loader={() => redirect("/")} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </SessionProvider>
    <ToastContainer />
  </React.StrictMode>
)
