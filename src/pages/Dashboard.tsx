import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createAthleteProfile, getMyRequests, respondToRequest } from '../api/sportlink'
import { AthleteProfile, Connection } from '../types'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [requests, setRequests] = useState<Connection[]>([])
  const [profileForm, setProfileForm] = useState<Partial<AthleteProfile>>({
    sponsorshipStatus: 'OPEN'
  })
  const [saved, setSaved] = useState(false)
  const [tab, setTab] = useState<'profile' | 'requests'>('profile')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.role === 'ATHLETE') {
      getMyRequests().then(r => setRequests(r.data)).catch(() => {})
    }
  }, [user])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createAthleteProfile(profileForm)
      setSaved(true)
    } catch {
      alert('Profile may already exist. Try updating instead.')
    }
  }

  const handleRespond = async (id: string, action: 'ACCEPTED' | 'DECLINED') => {
    await respondToRequest(id, action)
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r))
  }

  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {user.role === 'ATHLETE' ? '🏃 Athlete Dashboard' : '🏢 Sponsor Dashboard'}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{user.email}</p>
      </div>

      {user.role === 'ATHLETE' && (
        <>
          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-200 mb-6">
            {(['profile', 'requests'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
                  tab === t
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t} {t === 'requests' && requests.length > 0 && (
                  <span className="ml-1 bg-brand-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {requests.filter(r => r.status === 'PENDING').length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {tab === 'profile' && (
            <div className="card">
              <h2 className="font-semibold text-gray-900 mb-4">Your profile</h2>
              {saved && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2 rounded-lg mb-4">
                  ✓ Profile saved successfully!
                </div>
              )}
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                    <input className="input" placeholder="Arjun Kumar" value={profileForm.fullName ?? ''}
                      onChange={e => setProfileForm(p => ({ ...p, fullName: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                    <input className="input" placeholder="100m Sprint" value={profileForm.sport ?? ''}
                      onChange={e => setProfileForm(p => ({ ...p, sport: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input className="input" placeholder="Kerala" value={profileForm.state ?? ''}
                      onChange={e => setProfileForm(p => ({ ...p, state: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input className="input" placeholder="Kozhikode" value={profileForm.city ?? ''}
                      onChange={e => setProfileForm(p => ({ ...p, city: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input className="input" type="number" placeholder="22" value={profileForm.age ?? ''}
                      onChange={e => setProfileForm(p => ({ ...p, age: +e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal best</label>
                    <input className="input" placeholder="10.84" value={profileForm.personalBest ?? ''}
                      onChange={e => setProfileForm(p => ({ ...p, personalBest: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea className="input resize-none" rows={3}
                    placeholder="Tell sponsors about yourself, your goals and what you need support with..."
                    value={profileForm.bio ?? ''}
                    onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sponsorship status</label>
                  <select className="input" value={profileForm.sponsorshipStatus}
                    onChange={e => setProfileForm(p => ({ ...p, sponsorshipStatus: e.target.value as any }))}>
                    <option value="OPEN">Open to sponsorship</option>
                    <option value="IN_DISCUSSION">In discussion</option>
                    <option value="SPONSORED">Already sponsored</option>
                    <option value="NOT_LOOKING">Not looking</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full py-2.5">Save profile</button>
              </form>
            </div>
          )}

          {tab === 'requests' && (
            <div className="space-y-3">
              {requests.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-3xl mb-2">📬</div>
                  No sponsorship requests yet. Make sure your profile is set to "Open".
                </div>
              ) : requests.map(r => (
                <div key={r.id} className="card">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{r.sponsor?.companyName ?? 'A sponsor'}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{r.sponsor?.sector}</div>
                      {r.message && <p className="text-sm text-gray-600 mt-2 leading-relaxed">"{r.message}"</p>}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      r.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      r.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>{r.status}</span>
                  </div>
                  {r.status === 'PENDING' && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                      <button onClick={() => handleRespond(r.id, 'ACCEPTED')} className="btn-primary text-xs px-3 py-1.5">
                        Accept
                      </button>
                      <button onClick={() => handleRespond(r.id, 'DECLINED')} className="btn-outline text-xs px-3 py-1.5">
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {user.role === 'SPONSOR' && (
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-2">Sponsor account</h2>
          <p className="text-sm text-gray-500 mb-4">Browse athletes and send sponsorship requests.</p>
          <button onClick={() => navigate('/discover')} className="btn-primary">
            Discover athletes →
          </button>
        </div>
      )}
    </div>
  )
}
