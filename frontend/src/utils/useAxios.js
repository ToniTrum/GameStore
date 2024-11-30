import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const API_URL = 'http://127.0.0.1:8000';

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);
}