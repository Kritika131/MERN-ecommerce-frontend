import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductList from '../features/admin/components/AdminProductList'

const AdminHomePage = () => {
  return (
    <div>
      <Navbar/>
       <AdminProductList/>
     
    </div>
  )
}

export default AdminHomePage