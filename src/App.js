import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import ProductList from './features/productList/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetail from './pages/ProductDetail';
import Navbar from './features/navbar/Navbar';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
  },
  {
    path:"/login",
    element:<LoginPage/>,
  },
  {
    path:"/signup",
    element:<SignUpPage/>,
  },
  {
    path:"/cart",
    element:<CartPage/>,
  },
  {
    path:"/checkout",
    element:<CheckoutPage/>,
  },
  {
    path:"product-detail",
    element:<ProductDetail/>,
  },
])

function App() {
  return (
    <div className="App">
      
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
