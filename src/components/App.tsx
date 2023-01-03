import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { shallowEqual } from 'react-redux/es/exports'
import { redirect, Route, Routes } from 'react-router-dom'
import { LoggedInContext } from '../contexts/loggedInContext'
import { userSlice } from '../services/slices/userSlice'
import { api } from '../utils/Api'
import { IUser } from '../utils/Interfaces'

import { Admin } from './Admin'
import Header from './Header'
import { ProtectedRoute } from './ProtectedRoute'

function App() {
  const dispatch = useDispatch()
  const [currentUser, setCurrentUser] = useState<IUser>({
    balance: 0,
    group: 'user',
    name: 'Бомж Селёдыч',
    photos: [
      {
        value:'https://avatars.akamai.steamstatic.com/6ee2b77f5c79d32797c2910524431b93bdd3837c.jpg'
      },
      {
        value:'https://avatars.akamai.steamstatic.com/6ee2b77f5c79d32797c2910524431b93bdd3837c_medium.jpg',
      },
      {
        value:'https://avatars.akamai.steamstatic.com/6ee2b77f5c79d32797c2910524431b93bdd3837c_full.jpg',
      },
    ],
    steamId: 76561198029225870
  })
  const { actions } = userSlice
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(true)
  const handleLoginClick = () => {
    window.location.replace(`http://localhost:8000/auth/steam`)
  }
  useEffect(() => {
    // api.getCurrentUser().then(setCurrentUser)
  }, [])
  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <Header user={currentUser} />
      <Routes>
        <Route
          path="/"
          element={
            <main className="main">
              <button className="login-button" onClick={handleLoginClick}>
                <p className="login-button__text">Войти через Steam </p>
                <div className="loggin-button__logo" />
              </button>
            </main>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <main className="main">
                <Admin />
              </main>
            </ProtectedRoute>
          }
        />
      </Routes>
      <footer className="footer">
        <p className="footer__copyright">&#169; KakahaGames 2023</p>
      </footer>
    </LoggedInContext.Provider>
  )
}

export default App
