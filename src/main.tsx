import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { MaterialUIControllerProvider } from './context'
import { FirebaseAuthProvider } from './context/firebaseAuth'
import { SubscriptionProvider } from './context/subscription'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseAuthProvider>
      <SubscriptionProvider>
        <BrowserRouter>
          <MaterialUIControllerProvider>
            <App />
          </MaterialUIControllerProvider>
        </BrowserRouter>
      </SubscriptionProvider>
    </FirebaseAuthProvider>
  </StrictMode>
)
