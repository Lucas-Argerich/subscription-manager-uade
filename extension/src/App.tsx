import { signOut } from 'firebase/auth'
import Header from './components/Header'
import useUser from './hooks/useUser'
import { auth } from './firebase'

function App() {
  const user = useUser()

  const handleSignOut = () => {
    signOut(auth)
    chrome.storage.local.remove('subtrack_token')
  }

  return (
    <main className="w-96 min-h-96 border border-sky-500 bg-background font-['Inter'] text-primary">
      <Header />
      <section className="w-full h-56 flex flex-col justify-center items-center">
        {user === null && (
          <a href="http://localhost:5173/authentication/extension" target="_blank">
            <button className="size-40 rounded-full bg-primary/70 font-bold flex justify-center items-center text-background">
              <div className="size-32 rounded-full flex justify-center items-center text-center bg-primary/80">
                <div className="size-24 rounded-full flex justify-center items-center text-center bg-primary">
                  INGRESAR
                </div> 
              </div>
            </button>
          </a>
        )}
        {
          user && 
          <>
            <p className="font-extrabold text-lg">Registrando tu movimiento por la web!</p>
            <button className="mt-4 px-4 py-2 rounded border border-primary" onClick={handleSignOut}>Cerrar Sesión</button>
          </>
        }
      </section>
    </main>
  )
}

export default App
