import {useState,useEffect} from 'react'

function App() {



  return (
    <>
      <header className="header">
        <div className="logo" />
        <h1 className="header__text">KAKAMBE Rust server</h1>
        {/* auth state */}
        <p className="header__auth-state"></p>
      </header>
      <main className="main">
        <button className="login-button"><p className='login-button__text'>Войти через Steam </p><div className='loggin-button__logo'/></button>
      </main>
      <footer className="footer">
        <p className="footer__copyright">&#169; KakahaGames 2023</p>
      </footer>
    </>
  )
}

export default App
