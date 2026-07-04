import { useState, useEffect } from 'react'
import { getAthletes } from '../api/sportlink'
import { AthleteProfile } from '../types'
import AthleteCard from '../components/AthleteCard'

const SPORTS = ['All', 'Cricket', 'Athletics', 'Football', 'Kabaddi', 'Wrestling', 'Badminton', 'Boxing']

export default function Discover() {
  const [athletes, setAthletes] = useState<AthleteProfile[]>([])
  const [sport, setSport] = useState('')
  const [state, setState] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchAthletes = async () => {
    setLoading(true)
    try {
      const res = await getAthletes(sport || undefined, state || undefined)
      setAthletes(res.data)
    } catch {
      setAthletes([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAthletes() }, [sport])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Find athletes</h1>
        <p className="text-gray-500 text-sm mt-1">Discover talented athletes looking for sponsorship</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3 mb-4">
        <input
          className="input max-w-sm"
          placeholder="Search by state..."
          value={state}
          onChange={e => setState(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchAthletes()}
        />
        <button onClick={fetchAthletes} className="btn-primary">Search</button>
      </div>

      {/* Sport filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {SPORTS.map(s => (
          <button
            key={s}
            onClick={() => setSport(s === 'All' ? '' : s)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              (s === 'All' && !sport) || sport === s
                ? 'bg-brand-500 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-500'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading athletes...</div>
      ) : athletes.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🏃</div>
          <div className="text-gray-500">No athletes found. Try a different search.</div>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{athletes.length} athletes found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {athletes.map(a => <AthleteCard key={a.id} athlete={a} />)}
          </div>
        </>
      )}
    </div>
  )
}
