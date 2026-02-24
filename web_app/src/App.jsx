import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ProductScan from './pages/ProductScan'
import DIYGenerator from './pages/DIYGenerator'
import ReportAnalysis from './pages/ReportAnalysis'
import './App.css'

const navLinks = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/scan', label: 'Scan Product', icon: '📦' },
  { to: '/diy', label: 'DIY Generator', icon: '🛠️' },
  { to: '/reports', label: 'Report Analysis', icon: '📋' },
]

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <nav className="bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <NavLink to="/" className="flex items-center gap-2 group">
                <span className="text-2xl">🌱</span>
                <span className="text-xl font-extrabold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                  EcoVation
                </span>
              </NavLink>
              <div className="flex gap-1 p-1 bg-emerald-50/80 rounded-xl">
                {navLinks.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'text-emerald-700 hover:bg-emerald-100'
                      }`
                    }
                  >
                    <span>{icon}</span>
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scan" element={<ProductScan />} />
            <Route path="/diy" element={<DIYGenerator />} />
            <Route path="/reports" element={<ReportAnalysis />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
