import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signIn } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await signIn(email, password)
      
      if (error) {
        setError(error.message)
      } else {
        navigate('/')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-sans font-bold text-ink mb-3">
            Welcome Back
          </h1>
          <p className="text-lg text-accent font-serif">
            Sign in to manage your thoughts
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg
                         font-sans text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block font-sans text-sm font-medium text-ink mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg
                       font-serif text-base text-ink bg-paper
                       focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                       transition-all"
              placeholder="your@email.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block font-sans text-sm font-medium text-ink mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg
                       font-serif text-base text-ink bg-paper
                       focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                       transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-paper font-sans font-medium py-3 rounded-lg
                     hover:bg-accent transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Setup Note */}
        <div className="mt-8 p-4 bg-stone-100 rounded-lg">
          <p className="font-sans text-sm text-accent">
            <strong className="text-ink">Admin Access:</strong> Create your account through the 
            Supabase Dashboard (Authentication → Users → Add User).
          </p>
        </div>
      </div>
    </div>
  )
}
