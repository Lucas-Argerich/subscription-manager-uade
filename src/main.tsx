import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { MaterialUIControllerProvider } from './context'
import { FirebaseAuthProvider } from './context/firebaseAuth'
import { ServiceProvider } from './context/services'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseAuthProvider>
      <ServiceProvider>
        <BrowserRouter>
          <MaterialUIControllerProvider>
            <App />
          </MaterialUIControllerProvider>
        </BrowserRouter>
      </ServiceProvider>
    </FirebaseAuthProvider>
  </StrictMode>
)
