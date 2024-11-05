import { DocumentData } from 'firebase/firestore'

export interface UserDocument extends DocumentData {
  email: string
  displayName: string
  createdAt: Date
  services: ServiceDocument[]
}

export interface ServiceDocument extends DocumentData {
  serviceName: string
  domain: string
  username: string
  passwordEncrypted: string
  lastUsed: Date
  subscriptions?: SubscriptionDocument[]
  logins?: LoginDocument[]
}

export interface SubscriptionDocument extends DocumentData {
  plan: string
  price: string
  cycle: string
  expiresAt: Date
  isPayed: boolean
}

export interface LoginDocument extends DocumentData {
  ipAddress: string
  timestamp: Date
}
