import React, { useEffect } from 'react';
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
import Protected from './features/auth/components/Protected';
import {useDispatch, useSelector} from 'react-redux'
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNptFound from './pages/PageNptFound';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserProfile from './features/user/components/UserProfile';
import UserOrder from './features/user/components/UserOrder';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserByIdAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHomePage from './pages/AdminHomePage';
import AdminProductDetails from './features/admin/components/AdminProductDetails';
import ProductForm from './features/admin/components/ProductForm';
import AdminOrdersPage from './pages/AdminOrdersPage';
const router = createBrowserRouter([
  
  {
    path:"/",
    element:<Protected><Home/></Protected>,
  },
  {
    path:"/admin",
    element:<ProtectedAdmin><AdminHomePage/></ProtectedAdmin>,
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
    element:<Protected><CartPage/></Protected>,
  },
  {
    path:"/checkout",
    element:<Protected><CheckoutPage/></Protected>,
  },
  {
    path:"/product-detail/:id",
    element:<Protected><ProductDetail/></Protected>,
  },
  {
    path:"/admin/product-detail/:id",
    element:<ProtectedAdmin><AdminProductDetails/></ProtectedAdmin>,
  },
  {
    path:"/admin/product-form",
    element:<ProtectedAdmin><ProductForm/></ProtectedAdmin>,
  },
  {
    path:"/admin/orders",
    element:<ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>,
  },
  {
    path:"/admin/product-form/edit/:id",
    element:<ProtectedAdmin><ProductForm/></ProtectedAdmin>,
  },
  {
    path:"/order-success/:id",
    element:<OrderSuccessPage/>,
  },
  {
    path:"/profile",
    element:<UserProfilePage/>,
  },
  {
    path:"/orders",
    element:<UserOrdersPage/>,
  },
  {
    path:"/forgot-password",
    element:<ForgotPasswordPage/>,
  },
  {
    path:"/logout",
    element:<Logout/>,
  },
  {
    path:"*",
    element:<PageNptFound/>,
  },
])

function App() {

  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  useEffect(()=>{
    if(user){
      // console.log("userid ",user);
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserByIdAsync(user.id))
    }
  },[dispatch,user && user.id])
  return (
    <div className="App">
      
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
