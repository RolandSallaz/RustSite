import {useCallback, useEffect, useMemo} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'

import Admin from './Admin'
import Header from './Header'
import {ProtectedRoute} from './ProtectedRoute'
import Auth from "./Auth";
import Main from "./Main";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchUser} from "../services/actions/api";

function App() {
    const dispatch = useAppDispatch();
    const {loggedIn, user} = useAppSelector((state) => state.user)
    const handleLoginClick = () => {
        window.location.replace(`http://localhost:8000/auth/steam`)
    }

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    return (
        <>
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
            <footer className="footer">
                <p className="footer__copyright">&#169; KakahaGames 2023</p>
            </footer>
        </>
    )
}

export default App
