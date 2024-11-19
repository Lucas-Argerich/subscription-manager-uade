import Header from "./components/Header"
import useUser from "./hooks/useUser"

function App() {
  const user = useUser()
  return (
    <main className="w-96 min-h-96 border border-sky-500 bg-background">
      <Header />
      {JSON.stringify(user)}
    </main>
  )
}

export default App
