import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout.jsx'
import { validateEmail } from '../../utils/helper.js'
import axiosInstance from '../../utils/axioInstance.js'
import { useNavigate } from "react-router-dom"


export const SignUp = () => {
const navigate = useNavigate()
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error, setError] = useState(null)

const handleSubmit = async (e) => {
    e.preventDefault() // Stopped page refresh!

    // Validation checks
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return // Stop running the rest of the code
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError(null) // Clear error if inputs are valid
    console.log("Ready to send data to server:", { email, password })

    try {
      const response = await axiosInstance.post( 
      "http://localhost:5175/api/auth/sign-in", 
      { email, password }, 
      { withCredentials: true } 
      ) 

        console.log(response.data) // Test server response
      // Redirect based on server response
        navigate("/user/dashboard")
      
      
    } catch (error) {
      // Handle server error response
      if (error.message) {
        setError(error.message)
      } else {
        setError("Something went wrong. Please try again!")
      }
    }
  }

  return (
    <AuthLayout>
     <div className="w-full max-w-md">
      <div className='bg-white rounded-xl shadow-2xl overflow-hidden'>
        <div className="h-2 bg-linear-to-r from-blue-600 to-blue-400"></div>

          <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <label htmlFor='email' className='block'>Email Address</label>
                <input id="email" 
                 className="border"
                 type="email" 
                 value={email} 
                 onChange={(e)=>setEmail(e.target.value)}/>
                
                <label htmlFor="password"className='block'>Password</label>
                <input 
                id="password" 
                className="border" 
                type="password" 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
                
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button type="submit" className='block'>submit</button>
              </form>
          </div>

      </div>
     </div>
    </AuthLayout>
  )
}
