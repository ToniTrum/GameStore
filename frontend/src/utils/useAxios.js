import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext } from 'react';

import AuthContext from '../context/AuthContext.jsx';
import { API_URL } from '../main.jsx';

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${authTokens?.access}`,
        },
        validateStatus: (status) => true
    })

    axiosInstance.interceptors.request.use(async (request) => {
        const user = jwtDecode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

        if (isExpired) 
        {
            const response = await axios.post(`${API_URL}/users/token/refresh/`, {
                refresh: authTokens.refresh
            })
            localStorage.setItem("authTokens", JSON.stringify(response.data))
            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.access))
            request.headers.Authorization = `Bearer ${response.data.access}`
        }
        return request;
    })

    return axiosInstance
}

export default useAxios