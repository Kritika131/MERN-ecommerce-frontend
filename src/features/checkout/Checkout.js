import React from "react";
import { Link,Navigate } from "react-router-dom";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import Navbar from "../navbar/Navbar"
import { deleteCartItemsAsync, selectCartItem, updateCartItemsAsync } from '../cart/cartSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useForm } from "react-hook-form";
import { selectLoggedInUser } from "../auth/authSlice";
import { createOrderAsync, selectCurrentOrder } from "../order/orderSlice";
import { selectfetchloggedInUser, updateUserAsync } from "../user/userSlice";
import { discountedPrice } from "../../app/constants";


// const products = [
//   {
//     id: 1,
//     name: "Throwback Hip Bag",
//     href: "#",
//     color: "Salmon",
//     price: "$90.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
//     imageAlt:
//       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
//   },
//   {
//     id: 2,
//     name: "Medium Stuff Satchel",
//     href: "#",
//     color: "Blue",
//     price: "$32.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
//     imageAlt:
//       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
//   },
//   // More products...
// ];

// const addresses = [
//   {
//     name: "Abc xzy",
//     street: "11th Main",
//     city: "Buxar",
//     pincode: 121323,
//     state: "Bihar",
//     phone: 7878787878,
//   },
//   {
//     name: " xzAbcy",
//     street: "11th Main",
//     city: "Banglore",
//     pincode: 344523,
//     state: "Banglore",
//     phone: 558785478,
//   },
// ];

const Checkout = () => {
  const [open, setOpen] = useState(true)

  const items = useSelector(selectCartItem)
  const dispatch = useDispatch()

  const {register,handleSubmit,reset,formState:{errors}} = useForm()

  const [selectedAddress,setSelectedAddress] = useState(null)
  const [selectedPayment,setSelectedPayment] = useState('cash')

  const user = useSelector(selectLoggedInUser)
  console.log("user-",user);

  const orderPlaced = useSelector(selectCurrentOrder)
  console.log("orderplsact",orderPlaced);
  const totalAmount = items.reduce((amount,item)=>discountedPrice(item.product.price)*item.quantity+amount,0)
  const totalItems = items.reduce((total,item)=>item.quantity+ total,0)

  const handleQuantity=(e,item)=>{
    dispatch(updateCartItemsAsync({id:item.id, quantity:+e.target.value}))
  }

  const handleRemove=(e,itemId)=>{
    dispatch(deleteCartItemsAsync(itemId))
  }
  const handleSelectedAddress=(e)=>{
    setSelectedAddress(user.addresses[e.target.value])
  }

  const handlePayment = (e)=>{
    handlePayment(e.target.value)
  }
  const handleOrder=(e)=>{
    const order = {items,totalAmount,totalItems,user:user.id,selectedPayment,selectedAddress,status:'pending'}
    dispatch(createOrderAsync(order))
    // TODO: redirect to order success page
    // clear cart after order
    // on server change the stock number of items
  }

  return (
    <>
    {!items?.length && <Navigate to='/' replace={true}/>}
    {orderPlaced && <Navigate to={`/order-success/${orderPlaced.id}`} replace={true}/>}
    <div className="mx-auto mt-12   max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form noValidate onSubmit={handleSubmit((data)=>{
           
            dispatch(
                updateUserAsync({...user,addresses:[...user.addresses,data]})
            );
            reset();
          })} className="bg-white px-6 py-10 mt-4">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="  text-3xl   font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('name',{required:'name is required!'})}
                        id="name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register('email',{required:'email is required!'})}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        {...register('phone',{required:'phone is required!'})}
                       id="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                   
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('street',{required:'street is required!'})}
                       id="street"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('city',{required:'city is required!'})}
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('state',{required:'state is required!'})}
                        id="state"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('pinCode',{required:'pin code is required!'})}
                        id="pinCode"
                        
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="  flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Address
              </button>
            </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Addresses
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from Existing addresses.
                </p>
                {/* ------Address List---------- */}
                <ul role="list">
                  {user.addresses && user.addresses.map((address,idx) => (
                    <li
                      key={idx}
                      className="flex justify-between gap-x-6 py-5 px-5  border border-solid border-2 border-gray-200"
                    >
                      <div className="flex   min-w-0 gap-x-4">
                        <input
                          type="radio"
                          onChange={handleSelectedAddress}
                          value={idx}
                          name="address"
                          className="h-4 w-4 mt-[0.40rem] border-gray-400 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.street}
                          </p>
                            {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Phone: {address.phone}
                        </p>

                        <p className="text-sm leading-6 text-gray-500">
                          {address.city}
                        </p>
                      </div>
                     
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose One
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          onChange={handlePayment}
                          value="cash"
                          checked={selectedPayment==="cash"}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          name="payments"
                          onChange={handlePayment}
                          value="card"
                          checked={selectedPayment==="cart"}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

           
          </form>
        </div>
        {/* --------------------- */}
        <div className="lg:col-span-2">
        <div className='mx-auto mt-12 bg-white max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className=" border-t border-gray-200 px-0 py-6 sm:px-0">
            <h2 className="text-4xl my-5 mx-auto font-bold tracking-tight text-gray-900">Cart</h2>
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.product.thumbnail}
                                    alt={item.product.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={item.thumbnail}>{item.title}</a>
                                      </h3>
                                      <p className="ml-4">${discountedPrice(item.product.price)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="text-gray-500">
                                      <label htmlFor="quantity" className='inline mr-5 font-medium leading-6 text-gray-900'>Qty</label>
                                     <select onChange={(e)=>handleQuantity(e,item)} className='rounded-md   text-xl' value={item.quantity}>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                     </select>
                                    
                                     {/* {product.quantity} */}
                                     </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={(e)=>handleRemove(e,item.id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                   

                    <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$ {totalAmount}</p>
                      </div>
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Total items in cart</p>
                        <p>{totalItems} items</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <div 
                           onClick={handleOrder}
                          
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium cursor-pointer text-white shadow-sm hover:bg-indigo-700"
                        >
                          Order Now
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link to="/">

                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                            </Link>
                        </p>
                      </div>
                    </div>
       </div>
    </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
