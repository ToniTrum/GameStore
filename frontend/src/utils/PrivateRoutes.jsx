import {Outlet, Navigate} from 'react-router-dom'
import {useContext} from 'react'
import AuthContext from '../context/AuthContext.jsx'


const PrivateRoutes = ({children, ...rest}) => {
    let { user } = useContext(AuthContext)

    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes
