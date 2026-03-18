import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitTried, setSubmitTried] = useState(false)
  const { login, user, error, loading } = useAuthStore()

  useEffect(() => {
    document.title = 'Login | Health SaaS'
  }, [])

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitTried(true)
    if (!email.trim() || !password.trim()) return

    await login(email, password)
  }

  return (
    <section className="grid min-h-screen place-items-center bg-gradient-to-r from-indigo-50 via-slate-50 to-cyan-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-indigo-100">
        <h1 className="mb-5 text-3xl font-bold text-slate-900">Provider Login</h1>
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@example.com"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-slate-700">
          Password
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="secret123"
          />
        </label>

        {submitTried && !email && <p className="mt-2 text-sm text-rose-600">Email is required.</p>}
        {submitTried && !password && <p className="mt-2 text-sm text-rose-600">Password is required.</p>}
        {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="mt-3 text-xs text-slate-500">Use your Firebase user credentials.</p>
        <div className="mt-3 text-center text-sm text-slate-500">
          Don’t have an account?{' '}
          <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-700">
            Sign up
          </a>
        </div>
      </form>
    </section>
  )
}
