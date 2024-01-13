import React, { useEffect } from 'react'
import { selectLoggedInUser, signOutAsync } from '../authSlice'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from "react-router-dom"

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  useEffect(()=>{
    dispatchEvent(signOutAsync())
  },[])
  //but useEffect runs after render, so we have to delay navigate part
  return (
    <div>
     {!user && <Navigate to="/login" replace={true} />}
    </div>
  )
}

export default Logout