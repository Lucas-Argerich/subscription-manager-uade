import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { auth } from 'firebase-functions'

admin.initializeApp()

export const createUserDocument = auth.user().onCreate((user) => {
  getFirestore()
    .collection('users')
    .doc(user.uid)
    .create({ email: user.email, displayName: user.displayName, createdAt: new Date() })
})
