import { useState } from 'react'
import { analyseReport } from '../services/api'

export default function ReportAnalysis() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyseReport(file, 'demo')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Report Analysis
        </h1>
        <p className="text-gray-600 text-lg">
          Upload a medical report (PDF, image, or video) for AI-powered extraction and categorization.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-emerald-50 p-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Report File</label>
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              file ? 'border-emerald-400 bg-emerald-50/50' : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30'
            }`}
          >
            <input
              type="file"
              accept=".pdf,image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="text-4xl block mb-3">📋</span>
            <p className="text-gray-600 font-medium">
              {file ? file.name : 'Click or drag to upload'}
            </p>
            <p className="text-sm text-gray-500 mt-1">PDF, images, or video</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={!file || loading}
          className="mt-6 w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
        >
          {loading ? 'Analyzing...' : '🔍 Analyze Report'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl font-medium">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-50 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-emerald-800">Analysis Result</h2>
          <div className="p-4 rounded-xl bg-emerald-50">
            <h3 className="font-bold text-emerald-700 mb-2 flex items-center gap-2">
              <span>📑</span> Report Category
            </h3>
            <p className="text-gray-800 font-medium">{result['report-category']}</p>
          </div>
          <div>
            <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
              <span>📄</span> Extracted Content
            </h3>
            <ul className="space-y-2">
              {(result['report-content'] || []).map((item, i) => (
                <li key={i} className="p-3 rounded-lg bg-gray-50 text-gray-700 flex gap-2">
                  <span className="text-emerald-500 font-bold">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
