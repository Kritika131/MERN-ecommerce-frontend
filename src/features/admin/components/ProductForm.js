import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectAllCategories, selectBrands, selectProductById, updateProductAsync } from '../../productList/productListSlice'
import {useDispatch, useSelector} from "react-redux"
import { useForm } from 'react-hook-form'
import {useParams} from "react-router-dom"
import { useEffect } from 'react'

export default function ProductForm() {

  const brands = useSelector(selectBrands)
  const categories = useSelector(selectAllCategories)
  const dispatch = useDispatch()
  const {id} = useParams();
  const {register,handleSubmit,setValue,reset,formState:{errors},} = useForm()
  const selectedProduct = useSelector(selectProductById)

  useEffect(()=>{
    if(id){
      dispatch(fetchProductByIdAsync(id))
     
    }else{
      dispatch(clearSelectedProduct())
     
    }
  },[id,dispatch])
  useEffect(()=>{
    if(selectedProduct && id){

      setValue('title',selectedProduct.title);
      setValue('description',selectedProduct.description);
      setValue('price',selectedProduct.price);
      setValue('rating',selectedProduct.rating);
      setValue('discount',selectedProduct.discount);
      setValue('thumbnail',selectedProduct.thumbnail);
      setValue('stock',selectedProduct.stock);
      setValue('image1',selectedProduct.images[0]);
      setValue('image2',selectedProduct.images[1]);
      setValue('image3',selectedProduct.images[2]);
      setValue('image4',selectedProduct.images[3]);
      setValue('brand',selectedProduct.brand);
      setValue('category',selectedProduct.category);
    }
  },[selectedProduct,id,dispatch])

  const handleDelete=()=>{
    const product = {...selectedProduct};
    product.deleted=true;
    dispatch(updateProductAsync(product))
  }
  return (
    <form noValidate onSubmit={handleSubmit((data)=>{
      // console.log("product added,  ", data);
      const product = {...data}
      product.images = [product.image1,product.image2,product.image3,product.image4];
      product.rating=0;
      delete product['image1']
      delete product['image2']
      delete product['image3']
      delete product['image4']
      product.price=+product.price;
      product.stock=+product.stock;
      product.discount=+product.discount;
      // console.log("product added,  ", product);

      if(id){
        product.id = id
        product.rating= selectedProduct.rating || 0;
          dispatch(updateProductAsync(product))
          reset()
      } else{

        dispatch(createProductAsync(product))
        reset()

         //TODO : on product successfully added clear fields and show a msg
      }
    })}>
      <div className="space-y-12 bg-white p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900"> Add Product</h2>
        

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
               Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                 
                  <input
                    type="text"
                    {...register('title',{required:"title is required"})}
                    id="title"
                    autoComplete="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register('description',{required:"description is required"})}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences description about product.</p>
            </div>
       
            <div className="sm:col-span-full">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
               Brand
              </label>
              <div className="mt-2">
               <select     {...register('brand',{required:"brand is required"})}>
                <option value="">--choose brand--</option>
                {brands.map((item,i)=>(

                <option value={item.value}>{item.label}</option>
                ))}
               </select>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
               Category
              </label>
              <div className="mt-2">
               <select     {...register('category',{required:"category is required"})}>
                <option value="">--choose Category--</option>
                {categories.map((item,i)=>(

                <option value={item.value}>{item.label}</option>
                ))}
               </select>
              </div>
            </div>
           

<div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
               Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                 
                  <input
                    type="number"
                    {...register('price',{required:"price is required",min:1,max:10000})}
                    id="price"
                    autoComplete="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="price"
                  />
                </div>
              </div>
            </div>
<div className="sm:col-span-2">
              <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
              Discount Percentage
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                 
                  <input
                    type="text"
                    {...register('discount',{required:"discount is required",min:0,max:100})}
                    id="discount"
                    autoComplete="discount"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="discount"
                  />
                </div>
              </div>
            </div>
<div className="sm:col-span-2">
              <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
               Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                 
                  <input
                    type="text"
                    {...register('stock',{required:"stock is required",min:0})}
                    id="stock"
                    autoComplete="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="stock"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
               Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                 
                  <input
                    type="text"
                    {...register('thumbnail',{required:"thumbnail is required"})}
                    id="thumbnail"
                    autoComplete="thumbnail"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="thumbnail"
                  />
                </div>
              </div>
            </div>

             {/* <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>
          */}
           <div className="sm:col-span-full">
              <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
               Image1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                 
                  <input
                    type="text"
                    {...register('image1',{required:"image1 is required"})}
                    id="image1"
                    autoComplete="image1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="image1"
                  />
                </div>
              </div>
            </div>

           <div className="sm:col-span-full">
              <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
               Image2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                 
                  <input
                    type="text"
                    {...register('image2',{required:"image2 is required"})}
                    id="image2"
                    autoComplete="image2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="image2"
                  />
                </div>
              </div>
            </div>
           <div className="sm:col-span-full">
              <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
               Image3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                 
                  <input
                    type="text"
                    {...register('image3',{required:"image3 is required"})}
                    id="image3"
                    autoComplete="image3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="image3"
                  />
                </div>
              </div>
            </div>
           <div className="sm:col-span-full">
              <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
               Image4
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                 
                  <input
                    type="text"
                    name="image4"
                    {...register('image4',{required:"image4 is required"})}
                    autoComplete="image4"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="image4"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>
        

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div> */}

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>
          

          {/* <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
          
          </div> */}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        
        {selectedProduct && 
         <button
         
         onClick={handleDelete}
         className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
       >
         Delete
       </button>
        }
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}