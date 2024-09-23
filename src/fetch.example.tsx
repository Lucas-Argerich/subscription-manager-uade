import { collection, DocumentData, getDocs, QueryDocumentSnapshot } from 'firebase/firestore'
import { db } from './firebase/app'
import { useEffect, useState } from 'react'

export default function App() {
  // estados
  const [data, setData] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>()

  // fetch de datos
  useEffect(() => {
    const fetchData = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'))

      setData(usersSnapshot.docs)
    }

    fetchData()
      .then(() => {})
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false))
  }, [])

  // display (html)
  return (
    <div>
      {!isLoading && JSON.stringify(data.map((doc) => ({ id: doc.id, data: doc.data() })))}
      {error && <p>{error}</p>}
    </div>
  )
}
