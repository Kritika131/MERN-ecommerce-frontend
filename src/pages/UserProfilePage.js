import React from 'react'
import UserProfile from '../features/user/components/UserProfile'
import Navbar from '../features/navbar/Navbar'

const UserProfilePage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-2xl">My Profile</h1>
        <UserProfile/>
      </Navbar>
    </div>
  )
}

export default UserProfilePage