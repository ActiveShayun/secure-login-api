import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
    baseURL: 'https://secure-api-login-server.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    useEffect(() => {
        instance.interceptors.response.use(response => {
            return response
        }, error => {
            console.log('interceptor caught error', error.response.status);
            if (error.response.status === 401) {
                navigate('/signIn')
            }
            return Promise.reject(error)
        })

    }, [])

    return instance
};

export default useAxiosSecure;