import axios from "axios";

const instance = axios.create({
    baseURL: 'https://secure-api-login-server.vercel.app'
})
const useAxiosPublic = () => {
    return instance
};

export default useAxiosPublic;