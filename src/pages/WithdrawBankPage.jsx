"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const WithdrawBankPage = () => {
  const [selectedBank, setSelectedBank] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Check if user is logged in
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      navigate("/login")
    }
  }, [navigate])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  // List of Nigerian banks
  const banks = [
    "Access Bank",
    "Fidelity Bank",
    "First Bank",
    "First City Monument Bank",
    "Guaranty Trust Bank",
    "Opay",
    "Palmpay",
    "Polaris Bank",
    "Stanbic IBTC Bank",
    "Sterling Bank",
    "Union Bank",
    "United Bank for Africa",
    "Wema Bank",
    "Zenith Bank",
  ]

  // Function to handle account number validation and name retrieval
  const handleAccountNumberChange = (e) => {
    const value = e.target.value
    setAccountNumber(value)

    // Clear any previous error
    setErrorMessage("")

    // Reset account name when account number changes
    setAccountName("")

    // Basic validation for account number format
    if (value.length === 10) {
      // In a real app, you would make an API call to verify the account number
      // and retrieve the account name
      // For this demo, we'll simulate a delay and set a mock account name
      if (selectedBank) {
        setIsLoading(true)
        setTimeout(() => {
          // Mock account verification
          if (value === "0123456789") {
            setAccountName("JOHN DOE")
          } else if (value === "9876543210") {
            setAccountName("JANE SMITH")
          } else {
            // Simulate a random name for demo purposes
            const mockNames = ["EMMANUEL OLADIMEJI", "SARAH JOHNSON", "MICHAEL WILLIAMS", "DAVID BROWN"]
            const randomName = mockNames[Math.floor(Math.random() * mockNames.length)]
            setAccountName(randomName)
          }
          setIsLoading(false)
        }, 1000)
      } else {
        setErrorMessage("Please select a bank first")
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedBank) {
      setErrorMessage("Please select a bank")
      return
    }

    if (!accountNumber || accountNumber.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit account number")
      return
    }

    if (!accountName) {
      setErrorMessage("Account name could not be verified")
      return
    }

    setIsLoading(true)
    // Here you would typically make an API call to save the bank details
    setTimeout(() => {
      toast.success("Bank account details saved successfully!")
      setIsLoading(false)

      // Navigate back to withdraw page
      setTimeout(() => {
        navigate("/withdraw")
      }, 500)
    }, 1000)
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
          <Link to="/withdraw" className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <h1 className="text-xl font-semibold text-center flex-1">Update Bank</h1>
        </nav>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Banner Image */}
        <div className="w-full h-40 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl mb-6 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold">Bank Details</h2>
            <p className="mt-2">Add your bank account for withdrawals</p>
          </div>
        </div>

        {/* Bank Details Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bank Selection Dropdown */}
            <div className="space-y-2" ref={dropdownRef}>
              <label htmlFor="bank" className="text-gray-700 font-medium block">
                Select Bank
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={selectedBank ? "text-gray-800" : "text-gray-400"}>
                    {selectedBank || "Select bank"}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <ul className="py-1 text-gray-800">
                      {banks.map((bank, index) => (
                        <li
                          key={index}
                          className="cursor-pointer select-none py-2 px-3 hover:bg-emerald-50"
                          onClick={() => {
                            setSelectedBank(bank)
                            setIsDropdownOpen(false)
                            // Clear account name when bank changes
                            setAccountName("")
                          }}
                        >
                          {bank}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Account Number Input */}
            <div className="space-y-2">
              <label htmlFor="accountNumber" className="text-gray-700 font-medium block">
                Account Number
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
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="accountNumber"
                  type="text"
                  minLength="10"
                  maxLength="10"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  placeholder="Enter 10-digit account number"
                  className="pl-10 w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{errorMessage}</div>}

            {/* Account Name Display */}
            <div className="space-y-2">
              <label htmlFor="accountName" className="text-gray-700 font-medium block">
                Account Name
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
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="accountName"
                  type="text"
                  readOnly
                  value={accountName}
                  placeholder="Account name will appear here"
                  className="pl-10 w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              {accountNumber.length === 10 && !accountName && !errorMessage && isLoading && (
                <p className="text-sm text-emerald-600">Verifying account number...</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-md"
              disabled={isLoading || !accountName}
            >
              {isLoading ? "Processing..." : "Save Bank Details"}
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

export default WithdrawBankPage

