import axios from "axios";
import { useEffect } from "react";

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {
    useEffect(() => {
        instance.interceptors.response.use(response => {
            return response
        }, error => {
            console.log('interceptor caught error', error);
            return Promise.reject(error)
        })

    }, [])

    return instance
};

export default useAxiosSecure;