import {FC} from 'react'
import {Navigate} from 'react-router-dom'
import {useAppSelector} from "../hooks/redux";
import {FailPage} from "./FailPage";
import {groups} from "../utils/enums";

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
