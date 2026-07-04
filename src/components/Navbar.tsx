import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="font-semibold text-gray-900">SportLink</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <Link to="/discover" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            Discover
          </Link>
          <Link to="/sponsors" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            Sponsors
          </Link>
          {user && (
            <Link to="/dashboard" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {user.role === 'ATHLETE' ? '🏃' : '🏢'} {user.email?.split('@')[0] ?? 'Account'}
              </span>
              <button onClick={handleLogout} className="btn-outline text-sm">
                Sign out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Sign in</Link>
              <Link to="/register" className="btn-primary">Join free</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
