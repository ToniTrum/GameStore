import {createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import sweetAlert from 'sweetalert2';

import { API_URL } from "../main";

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    )
    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    )
    const [loading, setLoading] = useState(true)

    const history = useNavigate();

    const loginUser = async (email, password) => {
        const response = await fetch(`${API_URL}/users/token/`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        const data = await response.json()

        if(response.status === 200)
        {
            console.log("Logged In")
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))

            const userID = jwtDecode(data.access).user_id
            history(`/user/id/${userID}`)
            sweetAlert.fire({
                title: "Успешный вход",
                icon: "success",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
        else 
        {    
            console.log(response.status);
            sweetAlert.fire({
                title: "Неправильные почта или пароль",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const registerUser = async (email, username, password, password2, first_name, last_name, country, birthdate) => {
        const response = await fetch(`${API_URL}/users/register/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password, password2, first_name, last_name, country, birthdate
            })
        })

        if(response.status === 201)
        {
            history("/login")
        } 
        else 
        {
            const errorData = await response.json();
            console.log(errorData)

            const errorMessage = Object.entries(errorData)
                .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
                .join("\n");

            console.log(response)
            console.log(response.status)
            sweetAlert.fire({
                title: "Ошибка регистрации",
                text: errorMessage,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const logoutUser = () => {
        history("/login")
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
    }

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}