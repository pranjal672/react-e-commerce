import React from 'react'
import ReactDOM from "react-dom/client"
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from "./containers/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Products from "./pages/Products"
import Search from "./pages/Search"
import { CartProvider } from "./context/CartContext"
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='/' element={<App />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='cart' element={<Cart />} />
      <Route path='products/:id' element={<Products />} />
      <Route path='search' element={<Search />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
    <ToastContainer />
  </React.StrictMode>
)
