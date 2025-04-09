"use client"

import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Loginpage from "./pages/Loginpage"
import Signinpage from "./pages/Signinpage"
import Mainpage from "./pages/Mainpage"
import RechargePage from "./pages/RechargePage"
import RechargeConfirmationPage from "./pages/RechargeConfirmationPage"

import WithdrawPage from "./pages/WithdrawPage"
import WithdrawBankPage from "./pages/WithdrawBankPage"

import "./App.css"

function App() {
  // Initialize localStorage if it doesn't exist
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]))
    }
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Signinpage />} />
          <Route path="/main" element={<Mainpage />} />
          <Route path="/recharge" element={<RechargePage />} />
          <Route path="/recharge/confirmation" element={<RechargeConfirmationPage />} />

          <Route path="/withdraw" element={<WithdrawPage />} />
          <Route path="/withdraw/bank" element={<WithdrawBankPage />} />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

