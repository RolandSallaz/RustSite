import {FC} from 'react'
import {Navigate} from 'react-router-dom'
import {useAppSelector} from "../hooks/redux";
import {groups} from "../utils/Interfaces";
import {FailPage} from "./FailPage";

interface IRouteProps {
    adminRequire?: boolean
    children: React.ReactNode
}

export const ProtectedRoute: FC<IRouteProps> = ({children, adminRequire}: IRouteProps) => {
    const {loggedIn, user: {group}} = useAppSelector(state => state.user)
    if(adminRequire && group !== groups.ADMIN){
        return (<FailPage text='Нету прав для просмотра данной страницы'/>)
    }
    return loggedIn ? <>{children}</> : <Navigate to="/auth"/>
}
