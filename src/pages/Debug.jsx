import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Debug() {
  const { user, loading } = useAuth()
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })
  }, [])

  return (
    <div className="min-h-screen bg-paper p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Auth Debug</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="font-bold mb-2">useAuth() Hook:</h2>
          <p>Loading: {loading ? 'true' : 'false'}</p>
          <p>User: {user ? user.email : 'null'}</p>
          <p>User ID: {user ? user.id : 'null'}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="font-bold mb-2">Direct Session:</h2>
          <p>Session exists: {session ? 'true' : 'false'}</p>
          <p>Session user: {session?.user?.email || 'null'}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-2">Environment:</h2>
          <p>Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? 'Set ✅' : 'Missing ❌'}</p>
          <p>Supabase Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set ✅' : 'Missing ❌'}</p>
          <p>Gemini Key: {import.meta.env.VITE_GEMINI_API_KEY ? 'Set ✅' : 'Missing ❌'}</p>
        </div>
      </div>
    </div>
  )
}
