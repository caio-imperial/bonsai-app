import { useState } from 'react'

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const login = async (username: string, password: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        throw new Error('Login failed')
      }
      return response.json()
    } catch {
      throw new Error('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return { login, loading }
}
