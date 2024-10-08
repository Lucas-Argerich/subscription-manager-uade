import { collection, getDocs, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { db } from 'firebase'
import { useEffect, useState } from 'react'
import { UserDocument } from 'firebase/types'

export default function App() {
  // estados
  const [data, setData] = useState<QueryDocumentSnapshot<UserDocument, UserDocument>[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>()

  // fetch de datos
  useEffect(() => {
    const fetchData = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users')) as QuerySnapshot<UserDocument, UserDocument>

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
