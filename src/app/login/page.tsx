"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, logUser] = React.useState({
    email: "",
    password: ""
})

const [buttonDisabled, setButtonDisabled] = React.useState(false)
const [loading, setLoading] = React.useState(false);

const onLogin = async() => {
  try {
    setLoading(true);
    const response = await axios .post("api/users/login", user)
    console.log("Login succes", response.data)
    toast.success("Login succes");
    router.push("/profile")
  } catch (error: any) {
    console.log("Login Failed", error.message);
    toast.error(error.message)
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  if (user.email.length > 0 && user.password.length > 0) {
    setButtonDisabled(false)
  } else {
    setButtonDisabled(true)
  }
}, [user])



  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
    <h1>{loading ? "Processing" : "Login"}</h1>
    <hr />


    <label htmlFor="email">email</label>
    <input
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => logUser({...user, email: e.target.value})}
        placeholder="email"
        />


<label htmlFor="password">password</label>
    <input
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => logUser({...user, password: e.target.value})}
        placeholder="password"
        />
        <button
        onClick={onLogin}
        className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
          Login here
        </button>
        <Link href={"/signup"}>Dont Have Account?</Link>
        <Link href={"/"}>Back Home</Link>
  </div>
  )
}

export default LoginPage