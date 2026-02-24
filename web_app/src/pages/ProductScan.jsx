import { useState } from 'react'
import { scanProduct } from '../services/api'

export default function ProductScan() {
  const [file, setFile] = useState(null)
  const [medicalAilments, setMedicalAilments] = useState('None')
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
      const data = await scanProduct(file, medicalAilments)
      setResult(data)
    } catch (err) {
      const msg = err.message === 'Failed to fetch'
        ? 'Cannot connect to backend. Make sure the backend is running (uvicorn main:app --reload in backend_api folder) and try again.'
        : err.message
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Scan Product
        </h1>
        <p className="text-gray-600 text-lg">
          Upload an image or video of a product to analyze its health and environmental impact.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-emerald-50 p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Product Image/Video</label>
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              file ? 'border-emerald-400 bg-emerald-50/50' : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30'
            }`}
          >
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="text-4xl block mb-3">📦</span>
            <p className="text-gray-600 font-medium">
              {file ? file.name : 'Click or drag to upload'}
            </p>
            <p className="text-sm text-gray-500 mt-1">PNG, JPG, MP4, etc.</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Medical conditions (optional)</label>
          <input
            type="text"
            value={medicalAilments}
            onChange={(e) => setMedicalAilments(e.target.value)}
            placeholder="e.g. None, allergies, diabetes..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
          />
        </div>
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
        >
          {loading ? 'Analyzing...' : '🔍 Scan Product'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl font-medium">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-emerald-800">Results</h2>

          <div className="bg-white rounded-2xl shadow-xl border border-emerald-50 p-6">
            <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
              <span>📋</span> Product Details
            </h3>
            <dl className="grid gap-4">
              <div><dt className="font-semibold text-gray-600 text-sm">Name</dt><dd className="text-gray-800">{result.product_name}</dd></div>
              <div><dt className="font-semibold text-gray-600 text-sm">Description</dt><dd className="text-gray-800">{result.product_description}</dd></div>
              <div><dt className="font-semibold text-gray-600 text-sm">Ingredients</dt><dd className="text-gray-800">{Array.isArray(result.ingridients_used) ? result.ingridients_used.join(', ') : result.ingridients_used}</dd></div>
              <div><dt className="font-semibold text-gray-600 text-sm">Manufacturing</dt><dd className="text-gray-800">{result.manufacturing_location}</dd></div>
            </dl>
          </div>

          {result['enviromental pros and cons'] && (
            <div className="bg-white rounded-2xl shadow-xl border border-emerald-50 p-6">
              <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <span>🌍</span> Environmental Impact
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-green-50">
                  <h4 className="text-green-700 font-bold mb-2">✓ Positives</h4>
                  <ul className="space-y-2">
                    {(result['enviromental pros and cons'].positive_things_about_the_product || []).map((p, i) => (
                      <li key={i} className="text-gray-700 text-sm flex gap-2">
                        <span className="text-green-500">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-red-50">
                  <h4 className="text-red-700 font-bold mb-2">✗ Negatives</h4>
                  <ul className="space-y-2">
                    {(result['enviromental pros and cons'].harmful_things_about_the_product || []).map((p, i) => (
                      <li key={i} className="text-gray-700 text-sm flex gap-2">
                        <span className="text-red-500">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {result['health pros and cons'] && (
            <div className="bg-white rounded-2xl shadow-xl border border-emerald-50 p-6">
              <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <span>❤️</span> Health Impact
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-green-50">
                  <h4 className="text-green-700 font-bold mb-2">✓ Positives</h4>
                  <ul className="space-y-2">
                    {(result['health pros and cons'].positive_things_about_the_product || []).map((p, i) => (
                      <li key={i} className="text-gray-700 text-sm flex gap-2">
                        <span className="text-green-500">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-red-50">
                  <h4 className="text-red-700 font-bold mb-2">✗ Negatives</h4>
                  <ul className="space-y-2">
                    {(result['health pros and cons'].harmful_things_about_the_product || []).map((p, i) => (
                      <li key={i} className="text-gray-700 text-sm flex gap-2">
                        <span className="text-red-500">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
