"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setAuthToken, clearAuthToken, getAuthToken } from '@/lib/api-client'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      // Check for stored token
      const storedToken = localStorage.getItem('stomaton_token')
      
      if (storedToken) {
        setAuthToken(storedToken)
        setIsAuthenticated(true)
      } else {
        clearAuthToken()
        setIsAuthenticated(false)
      }
      
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const logout = () => {
    localStorage.removeItem('stomaton_token')
    clearAuthToken()
    setIsAuthenticated(false)
    router.push('/login')
  }

  return {
    isAuthenticated,
    isLoading,
    logout
  }
} 