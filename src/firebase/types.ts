import { DocumentData, Timestamp } from 'firebase/firestore'

export interface UserDocument extends DocumentData {
  email: string
  displayName: string
  createdAt: Timestamp
  services: ServiceDocument[]
}

export interface ServiceDocument extends DocumentData {
  serviceName: string
  username: string
  passwordEncrypted: string
  lastUsed: Timestamp
  subscriptions: SubscriptionDocument[]
  logins: LoginDocument[]
}

export interface SubscriptionDocument extends DocumentData {
  plan: string
  price: string
  cycle: string
  payedAt: Timestamp
}

export interface LoginDocument extends DocumentData {
  ipAddress: string
  timestamp: Timestamp
}
