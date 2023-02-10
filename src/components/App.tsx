import React, {useEffect} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'

import Admin from './Admin'
import Header from './Header'
import {ProtectedRoute} from './ProtectedRoute'
import Auth from "./Auth";
import Main from "./Main";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchUser, getProducts, getServers} from "../services/actions/api";
import ServerListMenu from "./ServerListMenu";
import {appSlice} from "../services/slices/appSlice";
import BuyPopup from "./popups/BuyPopup";

function App() {
    const dispatch = useAppDispatch();
    const {user: {loggedIn}, server: {servers}, app: {darkMode}} = useAppSelector((state) => state)
    const handleLoginClick = () => {
        window.location.replace(`http://localhost:8000/auth/steam`)
    }

    useEffect(() => {
        dispatch(fetchUser())
        dispatch(getServers());
        dispatch(getProducts())
        const hours = new Date().getHours();
        if (hours >= 21 || hours <= 9) {
            dispatch(appSlice.actions.setDarkMode(true))
        }
    }, [dispatch])

    return (
        <div className={`page ${darkMode && 'page_dark'}`}>
            <Header/>
            <Routes>
                <Route path='/'
                       element={
                           <ProtectedRoute>
                               <Main/>
                           </ProtectedRoute>
                       }/>
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute adminRequire>
                            <Admin/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/auth"
                    element={loggedIn ? <Navigate to='/'/> : (<Auth onLogin={handleLoginClick}/>)}
                />
            </Routes>
            {servers.length ? <ServerListMenu/> : null}
            <footer className={`footer ${darkMode && 'footer_dark'}`}>
                <small className="footer__copyright">&#169; KakahaGames 2023</small>
            </footer>
            <BuyPopup/>
        </div>
    )
}

export default App
