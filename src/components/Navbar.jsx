import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="border-b border-stone-200 bg-paper sticky top-0 z-50 backdrop-blur-sm bg-paper/95">
      <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link to="/" className="group">
          <h1 className="font-sans text-2xl font-bold text-ink hover:text-accent transition-colors">
            MyThoughts
          </h1>
        </Link>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Write Button */}
              <Link
                to="/editor"
                className="px-4 py-2 bg-ink text-paper font-sans text-sm font-medium rounded-md
                         hover:bg-accent transition-colors"
              >
                Write
              </Link>
              
              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="text-sm font-sans text-accent hover:text-ink transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            /* Login Button */
            <Link
              to="/login"
              className="px-4 py-2 text-accent hover:text-ink font-sans text-sm font-medium
                       transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
