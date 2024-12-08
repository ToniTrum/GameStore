import { Outlet, Navigate, useParams } from 'react-router-dom'
import { useContext } from 'react'

import AuthContext from '../context/AuthContext.jsx'


const PrivateRoutes = () => {
    let { user } = useContext(AuthContext)
    const { id } = useParams()

    return user && id == user.user_id ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes
