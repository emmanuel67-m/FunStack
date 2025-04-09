"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import toast from "react-hot-toast"

const RechargeConfirmationPage = () => {
  const [payerName, setPayerName] = useState("")
  const [paymentProof, setPaymentProof] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Get the amount from location state or default to 3000
  const amount = location.state?.amount || 3000

  // Mock bank details
  const bankDetails = {
    bankName: "Access Bank",
    accountName: "Bank",
    accountNumber: "1234567891",
    expiryDate: "2025-04-03 20:56:41",
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!paymentProof) {
      toast.error("Please upload payment proof")
      return
    }

    if (!payerName) {
      toast.error("Please enter payer name")
      return
    }

    setIsLoading(true)

    // Here you would typically make an API call to submit the payment proof
    setTimeout(() => {
      toast.success("Payment proof submitted successfully!")
      setIsLoading(false)

      // Navigate back to home page after successful submission
      setTimeout(() => {
        navigate("/home")
      }, 1500)
    }, 1000)
  }

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber)
    toast.success("Account number copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Loading indicator */}
      <div
        className="nuxt-loading-indicator"
        style={{
          opacity: isLoading ? 1 : 0,
          transform: isLoading ? "scaleX(0.5)" : "scaleX(0)",
        }}
      ></div>

      {/* Header */}
      <header className="bg-emerald-500 text-white shadow-md">
        <nav className="container mx-auto p-4 flex items-center">
          <Link to="/recharge" className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <h1 className="text-xl font-semibold text-center flex-1">Payment Confirmation</h1>
        </nav>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Banner Image */}
        <div className="w-full h-40 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl mb-6 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold">Complete Your Payment</h2>
            <p className="mt-2">Amount: ₦{amount.toLocaleString()}</p>
          </div>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Payment Details</h3>

          <div className="text-sm text-gray-600 mb-4 text-center">
            Kindly send <span className="font-semibold text-emerald-600">₦{amount.toLocaleString()}</span> to the
            account details below.
            <p className="text-red-500 text-xs mt-1">
              (Send exactly ₦{amount.toLocaleString()}, sending more or lesser amount will result in loss of funds)
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Deposit Amount</p>
              <p className="text-emerald-600 font-semibold">₦{amount.toLocaleString()}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Bank Name</p>
              <p className="text-gray-800 font-semibold">{bankDetails.bankName}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Account Name</p>
              <p className="text-gray-800 font-semibold">{bankDetails.accountName}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Account Number</p>
                <p className="text-gray-800 font-semibold">{bankDetails.accountNumber}</p>
              </div>
              <button
                onClick={copyAccountNumber}
                className="p-2 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            Payment expires in <span className="font-semibold">{bankDetails.expiryDate}</span>
          </div>
        </div>

        {/* Payment Confirmation Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Confirmation</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-sm text-emerald-600 text-center mb-4">
              Kindly submit payment proof and payer name below!
            </div>

            {/* Payment Proof Preview */}
            {paymentProof && (
              <div className="flex justify-center mb-4">
                <img
                  src={URL.createObjectURL(paymentProof) || "/placeholder.svg"}
                  alt="Payment Proof"
                  className="max-h-40 rounded-lg border border-gray-200"
                />
              </div>
            )}

            {/* File Upload */}
            <div className="border border-dashed border-emerald-300 rounded-lg p-4 text-center bg-emerald-50">
              <label className="block cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mx-auto text-emerald-500 mb-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">Click to upload payment proof</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>

            {/* Payer Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Enter payer name"
                className="pl-10 w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-md"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Submit Payment Proof"}
            </button>
          </form>
        </div>
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

export default RechargeConfirmationPage

