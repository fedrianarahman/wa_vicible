import React from 'react'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({children}) => {
    const token = useAuth();
    if (!token) {
        
    }
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute