export interface User {
  userId: string
  email: string
  role: 'ATHLETE' | 'SPONSOR'
  token: string
}

export interface AthleteProfile {
  id: string
  fullName: string
  sport: string
  state: string
  city: string
  age: number
  bio: string
  personalBest: string
  personalBestUnit: string
  sponsorshipStatus: 'OPEN' | 'IN_DISCUSSION' | 'SPONSORED' | 'NOT_LOOKING'
  profilePhotoUrl?: string
}

export interface Achievement {
  id: string
  title: string
  competition: string
  location: string
  year: number
  medal: 'GOLD' | 'SILVER' | 'BRONZE' | 'CERTIFICATE' | 'OTHER'
  level: 'DISTRICT' | 'STATE' | 'NATIONAL' | 'INTERNATIONAL'
}

export interface SponsorProfile {
  id: string
  companyName: string
  sector: string
  description: string
  logoUrl?: string
  website: string
  interestedSports: string
  budgetMin: number
  budgetMax: number
}

export interface Connection {
  id: string
  message: string
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'DEAL_MADE'
  createdAt: string
  athlete: AthleteProfile
  sponsor: SponsorProfile
}
