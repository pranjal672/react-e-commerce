import React from 'react'
import ReactDOM from "react-dom/client"
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from "./containers/Layout"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Account from "./pages/Account"
import Products from "./pages/Products"
import Search from "./pages/Search"
import Profile from "./pages/Profile"
import Orders from "./pages/Orders"
import { CartProvider } from "./context/CartContext"
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from "./context/SessionContext"
import 'react-toastify/dist/ReactToastify.css'
import Redirect from "./component/Redirect"
import Missing from "./component/Missing"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route exact path='/' element={<App />} />
      <Route path='login' element={<Login />} />
      <Route path='account' element={<Account />} />
      <Route path='cart' element={<Cart />} />
      <Route path='products' element={<Redirect />} />
      <Route path='products/:id' element={<Products />} />
      <Route path='search' element={<Search />} />
      <Route path='profile' element={<Profile />} />
      <Route path='orders' element={<Orders />} />
      <Route path='*' element={<Missing />} />
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
