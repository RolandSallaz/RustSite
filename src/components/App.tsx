import React from 'react'
import logo from '../images/logo.png'

function App() {
  return (
    <>
      <header className="header">

        <div className="logo" />
        <h1 className="header__text">Rust server</h1>
        <p className="header__auth-state">Не авторизован</p>
      </header>
      <main className="main">
        <button className="main__login-button">Войти через Steam</button>
      </main>
      <footer className="footer">
        <p className="footer__copyright">&#169; KakahaGames 2023</p>
      </footer>
    </>
  )
}

export default App
