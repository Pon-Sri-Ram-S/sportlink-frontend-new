import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAthlete, getAchievements, sendConnectionRequest } from '../api/sportlink'
import { AthleteProfile, Achievement } from '../types'
import { useAuth } from '../context/AuthContext'

const medalColors: Record<string, string> = {
  GOLD: 'bg-yellow-100 text-yellow-800',
  SILVER: 'bg-gray-100 text-gray-700',
  BRONZE: 'bg-orange-100 text-orange-800',
  CERTIFICATE: 'bg-blue-100 text-blue-800',
  OTHER: 'bg-gray-100 text-gray-600',
}

export default function AthleteProfilePage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [athlete, setAthlete] = useState<AthleteProfile | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [showConnect, setShowConnect] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!id) return
    Promise.all([getAthlete(id), getAchievements(id)])
      .then(([a, ach]) => {
        setAthlete(a.data)
        setAchievements(ach.data)
      })
      .finally(() => setLoading(false))
  }, [id])

  const handleConnect = async () => {
    if (!id) return
    await sendConnectionRequest(id, message)
    setSent(true)
    setShowConnect(false)
  }

  const initials = athlete?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? 'AT'

  if (loading) return <div className="text-center py-20 text-gray-400">Loading profile...</div>
  if (!athlete) return <div className="text-center py-20 text-gray-500">Athlete not found.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header card */}
      <div className="card mb-4">
        <div className="h-20 bg-gradient-to-r from-brand-500 to-brand-700 rounded-lg mb-4 -mx-4 -mt-4 px-4"></div>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center -mt-10 border-4 border-white flex-shrink-0">
            <span className="text-brand-700 text-lg font-semibold">{initials}</span>
          </div>
          <div className="flex-1 pt-1">
            <h1 className="text-xl font-bold text-gray-900">{athlete.fullName}</h1>
            <p className="text-sm text-gray-500">
              {athlete.sport} · {athlete.city}, {athlete.state} · {athlete.age} years
            </p>
            {athlete.sponsorshipStatus === 'OPEN' && (
              <span className="inline-block mt-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Open to sponsorship
              </span>
            )}
          </div>
          {user?.role === 'SPONSOR' && (
            <div className="flex gap-2 pt-1">
              {sent ? (
                <span className="text-sm text-brand-500 font-medium">✓ Request sent</span>
              ) : (
                <button onClick={() => setShowConnect(true)} className="btn-primary">
                  Sponsor this athlete
                </button>
              )}
            </div>
          )}
        </div>

        {/* Connect dialog */}
        {showConnect && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Introduce yourself
            </label>
            <textarea
              className="input resize-none"
              rows={3}
              placeholder="Tell the athlete about your company and what you're offering..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <button onClick={handleConnect} className="btn-primary">Send request</button>
              <button onClick={() => setShowConnect(false)} className="btn-outline">Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* About */}
      {athlete.bio && (
        <div className="card mb-4">
          <h2 className="font-semibold text-gray-900 mb-2">About</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{athlete.bio}</p>
        </div>
      )}

      {/* Records */}
      {athlete.personalBest && (
        <div className="card mb-4">
          <h2 className="font-semibold text-gray-900 mb-3">Best records</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-brand-700">{athlete.personalBest}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                Personal best ({athlete.personalBestUnit})
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="card mb-4">
          <h2 className="font-semibold text-gray-900 mb-3">Achievements</h2>
          <div className="space-y-3">
            {achievements.map(a => (
              <div key={a.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${medalColors[a.medal]}`}>
                  {a.medal}
                </span>
                <div>
                  <div className="text-sm font-medium text-gray-900">{a.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {a.competition} · {a.location} · {a.year}
                  </div>
                </div>
                <span className="ml-auto text-xs text-gray-400">{a.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
