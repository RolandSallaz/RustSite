import React from 'react'

interface props {
    onLogin: () => void
}

export default function Auth<FC>({onLogin}: props) {
    function handleLoginClick() {
        onLogin();
    }

    return (
        <main className="main">
            <button className="login-button" onClick={handleLoginClick}>
                <p className="login-button__text">Войти через Steam </p>
                <div className="loggin-button__logo"/>
            </button>
        </main>
    );
}
