import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({user}) {
  return user?<Outlet/>:<Navigate to={'/register'}/>
}
