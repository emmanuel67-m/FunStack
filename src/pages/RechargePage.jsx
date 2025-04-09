"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const RechargePage = () => {
  const [amount, setAmount] = useState("")
  const navigate = useNavigate()

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!amount) {
      toast.error("Please enter or select an amount")
      return
    }

    // Here you would typically make an API call to process the payment
    toast.success(`Deposit request of ₦${Number(amount).toLocaleString()} submitted successfully!`)

    // Navigate back to main page after successful submission
    setTimeout(() => {
      navigate("/main")
    }, 2000)
  }

  const presetAmounts = [3000, 6000, 10000, 20000, 30000, 50000, 70000, 100000, 200000, 500000, 1000000]

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-emerald-500 text-white shadow-md">
        <nav className="container mx-auto p-4 flex items-center">
          <Link to="/main" className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <h1 className="text-xl font-semibold text-center flex-1">Deposit</h1>
        </nav>
      </header>

      {/* Banner Image */}
      <div className="w-full h-40 bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold">Deposit Funds</h2>
          <p className="mt-2">Add money to your account</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Amount</h3>
          <div className="grid grid-cols-3 gap-3">
            {presetAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                type="button"
                className={`rounded-lg p-3 text-center transition-colors ${
                  amount === presetAmount.toString()
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => handleAmountSelect(presetAmount.toString())}
              >
                <span className="block font-medium">₦{presetAmount.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Or Enter Custom Amount</h3>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-lg">₦</span>
            </div>
            <input
              type="number"
              placeholder="Enter amount"
              className="pl-8 w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/recharge/confirmation", { state: { amount: Number(amount) } })}
          className="w-full p-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-md"
          disabled={!amount}
        >
          Proceed to Payment
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full block bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-4 gap-1 bg-white text-gray-600">
          <Link to="/main" className="flex flex-col items-center justify-center py-2">
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
    </div>
  )
}

export default RechargePage

