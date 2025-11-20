import { createContext, useContext, useState, useEffect } from 'react'

const CurrencyContext = createContext()

// Exchange rates (relative to INR)
const EXCHANGE_RATES = {
  INR: 1,
  USD: 0.012,    // 1 INR = 0.012 USD
  EUR: 0.011,    // 1 INR = 0.011 EUR
  GBP: 0.0095    // 1 INR = 0.0095 GBP
}

const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£'
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('selectedCurrency') || 'INR'
  })

  useEffect(() => {
    localStorage.setItem('selectedCurrency', currency)
  }, [currency])

  const convertPrice = (priceInINR) => {
    const rate = EXCHANGE_RATES[currency]
    return priceInINR * rate
  }

  const formatPrice = (priceInINR, showDecimals = false) => {
    const convertedPrice = convertPrice(priceInINR)
    const symbol = CURRENCY_SYMBOLS[currency]
    
    if (currency === 'INR') {
      // Format Indian Rupees with K notation
      const inThousands = convertedPrice / 1000
      return `${symbol}${inThousands.toFixed(0)}K`
    } else {
      // Format other currencies with proper decimals
      if (showDecimals) {
        return `${symbol}${convertedPrice.toFixed(2)}`
      } else {
        return `${symbol}${Math.round(convertedPrice).toLocaleString()}`
      }
    }
  }

  const value = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    currencySymbol: CURRENCY_SYMBOLS[currency]
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
