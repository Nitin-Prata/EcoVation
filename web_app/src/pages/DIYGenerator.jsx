import { useState } from 'react'
import { generateDIY } from '../services/api'

export default function DIYGenerator() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState('Easy')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await generateDIY(file)
      setResult(data)
      setSelectedLevel('Easy')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const project = result?.Projects?.[selectedLevel]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          DIY Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Upload an image of an item to get DIY project ideas at Easy, Medium, and Hard levels.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-emerald-50 p-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Item Image</label>
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              file ? 'border-emerald-400 bg-emerald-50/50' : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="text-4xl block mb-3">🛠️</span>
            <p className="text-gray-600 font-medium">
              {file ? file.name : 'Click or drag to upload'}
            </p>
            <p className="text-sm text-gray-500 mt-1">PNG, JPG, etc.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={!file || loading}
          className="mt-6 w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
        >
          {loading ? 'Generating...' : '✨ Generate DIY Projects'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl font-medium">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="flex gap-2 p-1 bg-emerald-50 rounded-xl w-fit">
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  selectedLevel === level
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {project && (
            <div className="bg-white rounded-2xl shadow-xl border border-emerald-50 p-8 space-y-6">
              <h2 className="text-2xl font-bold text-emerald-800">{project.DIY_Product}</h2>

              {project.generated_image && (
                <img
                  src={`data:image/png;base64,${project.generated_image}`}
                  alt="Generated"
                  className="w-full max-w-md rounded-xl shadow-lg border border-emerald-100"
                />
              )}

              <div className="p-4 rounded-xl bg-emerald-50">
                <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
                  <span>📎</span> Materials Required
                </h3>
                <ul className="space-y-2">
                  {(project.Materials_Required || []).map((m, i) => (
                    <li key={i} className="flex gap-2 text-gray-700">
                      <span className="text-emerald-500 font-bold">•</span>
                      {m.Material}: <span className="font-semibold">{m.Quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
                  <span>📝</span> Steps
                </h3>
                <ol className="space-y-4">
                  {(project.Steps || []).map((s) => (
                    <li key={s.Step_Number} className="flex gap-4 p-4 rounded-xl bg-gray-50">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
                        {s.Step_Number}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">{s.Description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          ⏱️ {s.Estimated_Time} · 🛡️ {s.Safety_Tips}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50">
                <h3 className="font-bold text-emerald-700 mb-2">Difficulty</h3>
                <p className="text-gray-700">{project.Difficulty_Level?.Explanation}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
