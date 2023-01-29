import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";
import {groups} from "../utils/enums";

export default function Header() {
    const {loggedIn, user: {photos, balance, name, group}} = useAppSelector(state => state.user)
    const {darkMode} = useAppSelector(state => state.app);
    const [showNavigation, setShowNagivation] = useState<boolean>(false);
    const navigationListClass = darkMode ? 'navagation__list-element navagation__list-element_dark' : 'navagation__list-element'

    function toggleShowNavigation(state: boolean) {
        setShowNagivation(state);
    }

    return (
        <header className={`header ${darkMode && 'header_dark'}`}>
            <Link className='header__container' to='/'>
                <div className="logo logo__place_header"/>
                <h1 className="header__text">KAKAMBE Rust server</h1>
            </Link>
            {loggedIn && (
                <div className={`profile ${darkMode && 'profile_dark'}`} onMouseEnter={() => toggleShowNavigation(true)}
                     onMouseLeave={() => toggleShowNavigation(false)}>
                    <div className='profile__container'>
                        <div className="profile__info">
                            <p className="profile__name">{name}</p>
                            <p className="profile__balance">{`${balance} р`}</p>
                        </div>
                        <div
                            className="profile__image"
                            style={{backgroundImage: `url(${photos[1]?.value})`}}
                        />
                    </div>
                    <nav className={`profile__navigation ${!showNavigation && 'profile__navigation_hidden'}`}>
                        <ul className='navigation__list'>
                            {group === groups.ADMIN && (
                                <li className={navigationListClass}>
                                    <Link className='navigation__link' to='/admin'>Админ панель</Link>
                                </li>)}
                            <li className={navigationListClass}>
                                <Link className='navigation__link' to='/'>Выход</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    )
}
