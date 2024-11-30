import {Route, Redirect} from 'react-router-dom'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext.jsx'


const PrivateRoutes = ({children, ...rest}) => {
    let { user } = useContext(AuthContext)
    return (
        <Route {...rest}>
            {user ? <Redirect to="/login" /> : children}
        </Route>
    )
}
