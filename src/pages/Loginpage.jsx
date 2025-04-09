"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!phoneNumber || !password) {
      toast.error("Please fill in all fields")
      return
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u) => u.phoneNumber === phoneNumber)

    if (!user) {
      toast.error("User not found. Please sign up first.")
      setTimeout(() => {
        navigate("/register")
      }, 2000)
      return
    }

    // Check if password matches
    if (user.password !== password) {
      toast.error("Invalid password. Please try again.")
      return
    }

    // Set current user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(user))

    // Login successful
    toast.success("Login successful!")

    // Navigate to main page after successful login
    setTimeout(() => {
      navigate("/main")
    }, 1000) // Short delay to show the success toast
  }

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      navigate("/main")
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-emerald-50 to-white">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="mb-12 w-64 h-32 flex items-center justify-center">
          <div className="text-4xl font-bold">
            <span className="text-gray-800">FUND</span>
            <span className="text-emerald-500">STACK</span>
          </div>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-gray-700 font-medium block">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="pl-10 w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-gray-700 font-medium block">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full p-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-md"
              >
                Login
              </button>
            </form>
          </div>

          <div className="py-4 bg-gray-50 text-center">
            <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

