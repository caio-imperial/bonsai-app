import AuthLoginCard from './components/Card'
import useAuthLogin from './hooks/useAuthLogin'

const AuthLoginPage = () => {
  const {
    username,
    password,
    error,
    handleSubmit,
    setUsername,
    setPassword,
    loading,
  } = useAuthLogin()

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthLoginCard
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        error={error}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default AuthLoginPage
