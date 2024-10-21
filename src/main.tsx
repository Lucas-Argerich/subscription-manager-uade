import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { MaterialUIControllerProvider } from './context'
import { FirebaseAuthProvider } from './context/firebaseAuth'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <FirebaseAuthProvider>
          <App />
        </FirebaseAuthProvider>
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </StrictMode>
)
