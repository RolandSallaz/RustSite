import { FC, useContext } from 'react'
import { redirect, Route, Routes, Navigate } from 'react-router-dom'
import { LoggedInContext } from '../contexts/loggedInContext'

interface IRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: FC<IRouteProps> = (props) => {
  const loggedIn = useContext(LoggedInContext)
  return loggedIn ? <>{props.children}</> : <Navigate to="/" />
}
