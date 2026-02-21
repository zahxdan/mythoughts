import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const [waited, setWaited] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setWaited(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading || !waited) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <div className="text-accent font-sans text-lg mb-2">Loading...</div>
          <div className="text-accent font-sans text-sm">Checking authentication</div>
        </div>
      </div>
    )
  }

  if (!user) {
    console.log('No user found, redirecting to login')
    return <Navigate to="/login" replace />
  }

  console.log('User authenticated:', user.email)
  return children
}
