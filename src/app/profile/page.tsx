"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
  const router = useRouter()
  const [data, setdata] = useState("Nothing")
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success("Logout succesful")
      router.push('/login')
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    //dabut user login informaciju sev?
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setdata(res.data.data._id)

  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <p>Profile Page</p>
      <h2 className='p-1 rounded bg-green-500'>{data === 'Nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr/>

      <button
      onClick={logout}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded'>Logout</button>

      <button
      onClick={getUserDetails}
      className='bg-green-900 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded'>Get User Details</button>
    </div>
  )
}

export default ProfilePage
