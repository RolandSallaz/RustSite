import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoggedInContext } from '../contexts/loggedInContext'
import { Admin } from './Admin'
import { ProtectedRoute } from './ProtectedRoute'

function App() {
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(true)

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <header className="header">
        <div className="logo" />
        <h1 className="header__text">KAKAMBE Rust server</h1>
        {/* auth state */}
        <p className="header__auth-state"></p>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <main className="main">
                <button className="login-button">
                  <p className="login-button__text">Войти через Steam </p>
                  <div className="loggin-button__logo" />
                </button>
              </main>
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <main className='main'><Admin /></main>
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
