"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const PlanCard = ({ plan }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()

  const handlePurchase = () => {
    // Extract the numeric value from the price string
    const priceValue = Number.parseInt(plan.price.replace(/[^\d]/g, ""))

    // Navigate to recharge page with the plan price
    navigate("/recharge", { state: { amount: priceValue } })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <h4 className="font-semibold text-gray-800">{plan.name}</h4>
          <p className="text-sm text-gray-500">{plan.duration}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-xs text-gray-500">Daily Profit</p>
            <p className="font-semibold text-emerald-600">{plan.dailyProfit}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Price</p>
              <p className="font-semibold text-gray-800">{plan.price}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Total Return</p>
              <p className="font-semibold text-gray-800">
                {(() => {
                  const dailyProfit = Number.parseInt(plan.dailyProfit.replace(/[^\d]/g, ""))
                  return `₦ ${(dailyProfit * 30).toLocaleString()}`
                })()}
              </p>
            </div>
          </div>

          <button
            onClick={handlePurchase}
            className="w-full py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            Purchase Plan
          </button>
        </div>
      )}
    </div>
  )
}

export default PlanCard

