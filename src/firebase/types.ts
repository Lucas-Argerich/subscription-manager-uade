import { DocumentData, Timestamp } from 'firebase/firestore'

export interface UserDocument extends DocumentData {
  email: string
  displayName: string
  createdAt: Timestamp
}

export interface ServiceDocument extends DocumentData {
  serviceName: string
  username: string
  passwordEncrypted: string
  lastUsed: Timestamp
}

export interface SubscriptionDocument extends DocumentData {
  plan: string
  price: string
  payedAt: Timestamp
}

export interface LoginDocument extends DocumentData {
  ipAddress: string
  timestamp: Timestamp
}
