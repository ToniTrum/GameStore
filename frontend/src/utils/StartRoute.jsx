import { Navigate } from 'react-router-dom'
import { useContext } from 'react'

import AuthContext from '../context/AuthContext.jsx'


const StartRoute = () => {
    let { user } = useContext(AuthContext)

    return user 
            ? <Navigate to={`/user/id/${user.user_id}`} /> 
            : <Navigate to="/login" />
}

export default StartRoute
