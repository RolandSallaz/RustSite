import React from 'react'
import {IUser} from '../utils/Interfaces'
import {useNavigate} from "react-router-dom";

interface props {
    user: IUser
}

export default function Header<FC>({user: {photos, name, balance}}: props) {
    const navigate = useNavigate()

    function handleRedirectToMain() {
        navigate('/');
    }

    return (
        <header className="header">
            <div className="logo logo__place_header" onClick={handleRedirectToMain}/>
            <h1 className="header__text" onClick={handleRedirectToMain}>KAKAMBE Rust server</h1>
            {/* auth state */}
            <div className="profile">
                <div className="profile__info">
                    <p className="profile__name">{name}</p>
                    <p className="profile__balance">{`${balance} р`}</p>
                </div>
                <div
                    className="profile__image"
                    style={{backgroundImage: `url(${photos[1]?.value})`}}
                />
            </div>
        </header>
    )
}
