"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import WelcomePopup from "../components/WelcomePopup"
import PlanCard from "../components/PlanCard"

const MainPage = () => {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [balance, setBalance] = useState(1000)
  const [userName, setUserName] = useState("User")

  // Add authentication check at the top of the component
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      navigate("/login")
    } else {
      // Extract user info if needed
      const user = JSON.parse(currentUser)
      setUserName(user.phoneNumber)
    }
  }, [navigate])

  // Show welcome popup when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Update the handleLogout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    toast.success("Logged out successfully")
    navigate("/login")
  }

  const plans = [
    { id: 1, name: "BSVIP 1", duration: "30 Days", dailyProfit: "₦ 750", price: "₦3000" },
    { id: 2, name: "BSVIP 2", duration: "30 Days", dailyProfit: "₦ 1500", price: "₦6000" },
    { id: 3, name: "BSVIP 3", duration: "30 Days", dailyProfit: "₦ 2500", price: "₦10000" },
    { id: 4, name: "BSVIP 4", duration: "30 Days", dailyProfit: "₦ 5000", price: "₦20000" },
    { id: 5, name: "BSVIP 5", duration: "30 Days", dailyProfit: "₦ 7500", price: "₦30000" },
    { id: 6, name: "BSVIP 6", duration: "30 Days", dailyProfit: "₦ 12500", price: "₦50000" },
    { id: 7, name: "BSVIP 7", duration: "30 Days", dailyProfit: "₦ 17500", price: "₦70000" },
    { id: 8, name: "BSVIP 8", duration: "30 Days", dailyProfit: "₦ 25000", price: "₦100000" },
    { id: 9, name: "BSVIP 9", duration: "30 Days", dailyProfit: "₦ 50000", price: "₦200000" },
    { id: 10, name: "BSVIP 10", duration: "30 Days", dailyProfit: "₦ 125000", price: "₦500000" },
    { id: 11, name: "BSVIP 11", duration: "30 Days", dailyProfit: "₦ 250000", price: "₦1000000" },
  ]

  const recentTransactions = [
    "User +234***219 withdraw 2700",
    "User +234***456 withdraw 1000",
    "User +234***791 withdraw 2700",
    "User +234***829 withdraw 2000",
    "User +234***747 withdraw 1000",
    "User +234***426 withdraw 2500",
    "User +234***262 deposited 3000",
    "User +234***007 withdraw 12500",
    "User +234***750 withdraw 5200",
    "User +234***541 withdraw 5200",
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-xl font-bold">
                <span className="text-white">FUND</span>
                <span className="text-yellow-300">STACK</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-xs text-emerald-100">Welcome</p>
                <p className="font-medium">{userName}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-full transition-colors shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Balance Card */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl shadow-lg p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
          <div className="relative">
            <p className="text-gray-500 text-sm">Available Balance</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">₦ {balance.toLocaleString()}</h2>
            <div className="mt-4 flex space-x-2">
              <Link
                to="/recharge"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 px-4 rounded-lg text-center font-medium transition-colors shadow-sm"
              >
                Deposit
              </Link>
              <Link
                to="/withdraw"
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2.5 px-4 rounded-lg text-center font-medium transition-colors shadow-sm"
              >
                Withdraw
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Slider */}
      <div className="relative h-40 mx-4 mt-4 rounded-xl overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
          <div className="text-center text-white">
            <h3 className="text-xl font-bold">Earn Daily Profits</h3>
            <p className="mt-2">Invest in our plans and earn up to 25% monthly</p>
          </div>
        </div>
      </div>

      {/* Notification Marquee */}
      <div className="mx-4 my-4">
        <div className="border border-emerald-200 bg-emerald-50 rounded-full p-2 flex items-center shadow-sm">
          <div className="bg-emerald-500 rounded-full p-1.5 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div className="w-full block overflow-hidden">
            <div className="whitespace-nowrap animate-marquee">
              {recentTransactions.map((transaction, index) => (
                <span key={index} className="inline-block mx-4 text-gray-700">
                  {transaction}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mx-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emerald-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Link
                to="/recharge"
                className="text-xs text-gray-700"
              >
                Deposit
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8z" />
                </svg>
              </div>
              <Link
                to="/withdraw"
                className="text-xs text-gray-700"
              >
                Withdraw
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs text-gray-700">Check In</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
              </div>
              <span className="text-xs text-gray-700">Mine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="mx-4 mb-20">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Investment Plans</h3>
        <div className="space-y-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full block bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-4 gap-1 bg-white text-gray-600">
          <Link to="/main" className="flex flex-col items-center justify-center py-2 text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link to="/plan/log" className="flex flex-col items-center justify-center py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            <span className="text-xs mt-1">Products</span>
          </Link>

          <Link to="/team/share" className="flex flex-col items-center justify-center py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="text-xs mt-1">Team</span>
          </Link>

          <Link to="/profile" className="flex flex-col items-center justify-center py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>

      {/* Welcome Popup */}
      {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}
    </div>
  )
}

export default MainPage

