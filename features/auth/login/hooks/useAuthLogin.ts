import { useRouter } from 'next/router'
import { useState } from 'react'
import { useLogin } from '@/hooks/useLogin'

const useAuthLogin = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { login, error } = useLogin()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(username, password)
      router.push('/')
    } catch (err: unknown) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    username,
    password,
    error,
    loading,
    handleSubmit,
    setUsername,
    setPassword,
  }
}

export default useAuthLogin
