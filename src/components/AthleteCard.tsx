import { Link } from 'react-router-dom'
import { AthleteProfile } from '../types'

const statusColors: Record<string, string> = {
  OPEN: 'bg-green-100 text-green-800',
  IN_DISCUSSION: 'bg-yellow-100 text-yellow-800',
  SPONSORED: 'bg-blue-100 text-blue-800',
  NOT_LOOKING: 'bg-gray-100 text-gray-600',
}

const statusLabels: Record<string, string> = {
  OPEN: 'Open to sponsorship',
  IN_DISCUSSION: 'In discussion',
  SPONSORED: 'Sponsored',
  NOT_LOOKING: 'Not looking',
}

export default function AthleteCard({ athlete }: { athlete: AthleteProfile }) {
  const initials = athlete.fullName
    ?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? 'AT'

  return (
    <Link to={`/athlete/${athlete.id}`} className="card hover:border-brand-500 transition-colors block">
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
          <span className="text-brand-700 text-sm font-semibold">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 text-sm truncate">{athlete.fullName}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {athlete.sport} · {athlete.state}
          </div>
          {athlete.sponsorshipStatus && (
            <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[athlete.sponsorshipStatus]}`}>
              {statusLabels[athlete.sponsorshipStatus]}
            </span>
          )}
        </div>
      </div>
      {athlete.personalBest && (
        <div className="border-t border-gray-100 pt-2.5 mt-2.5 flex justify-between text-xs">
          <span className="text-gray-500">Personal best</span>
          <span className="font-semibold text-gray-900">
            {athlete.personalBest} {athlete.personalBestUnit}
          </span>
        </div>
      )}
    </Link>
  )
}
