import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
            Athletes from every background
          </div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Where talent meets opportunity,<br />
            <span className="text-brand-500">regardless of background</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            Athletes from small towns and limited resources can now be found
            by sponsors who are actively looking for them.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/register" state={{ role: 'ATHLETE' }} className="btn-primary px-6 py-3 text-base">
              I am an athlete →
            </Link>
            <Link to="/register" state={{ role: 'SPONSOR' }} className="btn-outline px-6 py-3 text-base">
              I am a sponsor
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 divide-x divide-gray-200">
          {[
            { num: '2,840', label: 'Athletes registered' },
            { num: '310', label: 'Active sponsors' },
            { num: '₹4.2 Cr', label: 'Deals made' },
          ].map(s => (
            <div key={s.label} className="py-8 text-center">
              <div className="text-2xl font-bold text-brand-700">{s.num}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center">Everything athletes need to get discovered</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🏅', title: 'Upload achievements', desc: 'Share your medals, certificates, and competition results with verified proof.' },
            { icon: '📊', title: 'Showcase records', desc: 'Display your personal bests and performance stats that sponsors care about.' },
            { icon: '🤝', title: 'Connect with sponsors', desc: 'Receive direct sponsorship requests from companies actively looking for athletes.' },
          ].map(f => (
            <div key={f.title} className="card text-center">
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-medium text-gray-900 mb-1">{f.title}</div>
              <div className="text-sm text-gray-500 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-500 py-14 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to get discovered?</h2>
        <p className="text-brand-100 mb-6">Create your profile in minutes. It's completely free.</p>
        <Link to="/register" className="bg-white text-brand-600 font-semibold px-8 py-3 rounded-lg hover:bg-brand-50 transition-colors inline-block">
          Create your profile →
        </Link>
      </div>
    </div>
  )
}
