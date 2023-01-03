import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {shallowEqual} from 'react-redux/es/exports'
import {redirect, Route, Routes} from 'react-router-dom'
import {LoggedInContext} from '../contexts/loggedInContext'
import {userSlice} from '../services/slices/userSlice'
import {api} from '../utils/Api'
import {IUser} from '../utils/Interfaces'

import {Admin} from './Admin'
import Header from './Header'
import {ProtectedRoute} from './ProtectedRoute'
import Auth from "./Auth";
import Main from "./Main";

function App() {
    const dispatch = useDispatch()
    const [currentUser, setCurrentUser] = useState<IUser>({
        balance:0,
        group:'user',
        name:'',
        photos:[],
        steamId:0
    })
    const {actions} = userSlice
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const handleLogin = () => {
        window.location.replace(`http://localhost:8000/auth/steam`)
    }
    useEffect(() => {
        api.getCurrentUser().then((res) => {
            console.log(res)
            setIsLoggedIn(true);
            setCurrentUser(res as IUser);
        })
    }, [])
    return (
        <LoggedInContext.Provider value={isLoggedIn}>
            <Header user={currentUser as IUser}/>
            <Routes>
                <Route
                    path="/auth"
                    element={
                        <Auth onLogin={handleLogin}/>
                    }
                />
                <Route path='/'
                element={
                    <ProtectedRoute>
                        <Main/>
                    </ProtectedRoute>
                }/>
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <main className="main">
                                <Admin/>
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
