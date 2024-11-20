import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import {
  getAuth,
  signInWithCustomToken
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js'
import { getFirestore, getDoc, addDoc, doc, collection } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyDOpmn2oajHZ8USNXO6_3_uO-2LeH6OTGo',
  authDomain: 'subscription-manager-uade.firebaseapp.com',
  projectId: 'subscription-manager-uade',
  storageBucket: 'subscription-manager-uade.appspot.com',
  messagingSenderId: '1041561023629',
  appId: '1:1041561023629:web:ff741fe05a2eac35f61ec4',
  measurementId: 'G-LLNJV3J0KD'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

chrome?.storage?.local.get('subtrack_token', async (result) => {
  console.log(result['subtrack_token'])
  if (result['subtrack_token']) {
    const token = result['subtrack_token']

    await fetch(
      'https://us-central1-subscription-manager-uade.cloudfunctions.net/verifyIdTokenAndCreateCustomToken',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: { idToken: token }
        })
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.result) return
        signInWithCustomToken(auth, data.result.customToken)
      })
  }
})

const handleStorageChange = async (changes, areaName) => {
  if (areaName === 'local' && changes['subtrack_token']) {
    const token = changes['subtrack_token'].newValue

    if (token) {
      await fetch(
        'https://us-central1-subscription-manager-uade.cloudfunctions.net/verifyIdTokenAndCreateCustomToken',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: { idToken: token }
          })
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data || !data.result) return
          signInWithCustomToken(auth, data.result.customToken)
        })
    }
  }
}

chrome?.storage?.onChanged.addListener(handleStorageChange)

console.log('worker running')

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SET_AUTH_STATE' && message.user) {
    chrome.storage.local.set({ user: message.user })
    return true
  }
})

const handleLogWeb = async (details) => {
  const user = auth.currentUser
  if (!user || details.parentFrameId !== -1) return
  const domain = new URL(details.url).hostname
  console.log('app detected', domain)

  const ref = await getDoc(doc(db, 'users', user.uid, 'services', domain))

  if (ref.exists()) {
    console.log('saving', domain)
    await addDoc(collection(db, 'users', user.uid, 'services', domain, 'loginLogs'), {
      domain,
      timestamp: new Date(details.timeStamp)
    })
  }
}

chrome.webNavigation.onCompleted.addListener(handleLogWeb)
