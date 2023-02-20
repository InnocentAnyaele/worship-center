'use client'

import { useAuth } from './AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PrivateRoute({children}) {
  const router = useRouter()
  const {user} = useAuth()  



  useEffect(() => {
    if (!user) {
        router.push('/')
    }
  },[])

  return children
}



// const ProtectedRoutes = ({ children }) => {
//   const router = useRouter()
//   const {user} = useAuth()

//   if (!user) {
//     router.push('/')
//   }

//   return children
// }

// export default ProtectedRoutes
