import api from './client'
import { AthleteProfile, Achievement, Connection } from '../types'

// ── Auth ──────────────────────────────────────────────────
export const register = (email: string, password: string, role: string) =>
  api.post('/auth/register', { email, password, role })

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password })

// ── Athletes ──────────────────────────────────────────────
export const getAthletes = (sport?: string, state?: string) =>
  api.get<AthleteProfile[]>('/athletes', { params: { sport, state } })

export const getAthlete = (id: string) =>
  api.get<AthleteProfile>(`/athletes/${id}`)

export const createAthleteProfile = (profile: Partial<AthleteProfile>) =>
  api.post<AthleteProfile>('/athletes/me', profile)

export const updateAthleteProfile = (profile: Partial<AthleteProfile>) =>
  api.put<AthleteProfile>('/athletes/me', profile)

export const getAchievements = (athleteId: string) =>
  api.get<Achievement[]>(`/athletes/${athleteId}/achievements`)

export const addAchievement = (achievement: Partial<Achievement>) =>
  api.post('/athletes/me/achievements', achievement)

// ── Sponsors ──────────────────────────────────────────────
export const getSponsors = () =>
  api.get('/sponsors')

// ── Connections ───────────────────────────────────────────
export const sendConnectionRequest = (athleteId: string, message: string) =>
  api.post(`/connections/request/${athleteId}`, { message })

export const getMyRequests = () =>
  api.get<Connection[]>('/connections/my-requests')

export const respondToRequest = (connectionId: string, action: 'ACCEPTED' | 'DECLINED') =>
  api.put(`/connections/${connectionId}/respond`, { action })

export const getSentRequests = () =>
  api.get<Connection[]>('/connections/sent')

// ── Documents ─────────────────────────────────────────────
export const uploadDocument = (file: File, name: string, type: string) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('name', name)
  formData.append('type', type)
  return api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const getMyDocuments = () =>
  api.get('/documents/my')
