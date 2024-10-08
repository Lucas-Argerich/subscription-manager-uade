import { useState } from 'react'
import { signInWithEmailAndPassword, User } from 'firebase/auth'
import { auth } from 'firebase'

export default function Login() {
  const [user, setUser] = useState<User>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
      })
      .catch((err) => setError(err.message))
  }

  return (
    <main>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      {user && (
        <>
          <h3>Current User:</h3>
          <p>{JSON.stringify(user)}</p>
        </>
      )}
    </main>
  )
}
