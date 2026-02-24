import { Link } from 'react-router-dom'

const features = [
  {
    to: '/scan',
    icon: '📦',
    title: 'Scan Product',
    desc: 'Upload a product image or video to get health and environmental impact insights.',
    gradient: 'from-emerald-400 to-teal-500',
    bgGlow: 'bg-emerald-400/20',
  },
  {
    to: '/diy',
    icon: '🛠️',
    title: 'DIY Generator',
    desc: 'Turn everyday items into creative DIY projects. Easy, Medium, and Hard levels.',
    gradient: 'from-teal-400 to-emerald-600',
    bgGlow: 'bg-teal-400/20',
  },
  {
    to: '/reports',
    icon: '📋',
    title: 'Report Analysis',
    desc: 'Upload medical reports for AI-powered extraction and categorization.',
    gradient: 'from-green-400 to-emerald-600',
    bgGlow: 'bg-green-400/20',
  },
]

const stats = [
  { value: '3', label: 'Features', icon: '✨' },
  { value: '100%', label: 'Gemini Powered', icon: '🤖' },
  { value: '🌱', label: 'Sustainable', icon: '' },
]

export default function Dashboard() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
          <span>✨</span> AI-Powered Sustainability
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Welcome to EcoVation
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Make sustainable choices with AI-powered product insights, DIY upcycling ideas, and report analysis.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f) => (
          <Link
            key={f.to}
            to={f.to}
            className="group block relative"
          >
            <div className="h-full p-8 bg-white rounded-2xl shadow-lg border-2 border-emerald-50 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`w-14 h-14 rounded-xl ${f.bgGlow} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
                {f.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {f.desc}
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-emerald-600 font-semibold text-sm">
                Get started →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-6 bg-white/80 backdrop-blur rounded-2xl border border-emerald-100 shadow-md text-center"
          >
            <p className="text-4xl font-extrabold text-emerald-600 mb-1">
              {s.value}{s.icon && <span className="ml-1">{s.icon}</span>}
            </p>
            <p className="text-sm font-medium text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
