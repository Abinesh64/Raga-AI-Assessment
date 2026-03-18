import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export function Layout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()

  const doLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 shadow-sm border-b border-slate-200">
        <div className="text-lg font-bold text-slate-900">Health SaaS</div>
        <nav className="flex flex-wrap items-center gap-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to="/patients"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            Patients
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{user?.email ?? 'Anonymous'}</span>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-100" onClick={doLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className="page-content mx-auto w-full max-w-7xl p-4">{children}</main>
    </div>
  )
}
