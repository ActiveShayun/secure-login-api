import { useEffect } from "react";
import useAxiosSecure from "../../useAxios/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Profile = () => {
    const useAxios = useAxiosSecure()
    const [profile, setProfile] = useState({})
    console.log(profile);
    const navigate = useNavigate()

    const userInfo = async () => {
        const res = await useAxios.get('/profile')
        setProfile(res.data)
        console.log(res);
    }

    useEffect(() => {
        userInfo()
    }, [])

    const userSignout = async () => {
        const logout = await useAxios.post('/logout')
        console.log('userSignout', logout);
        if (logout?.status === 200) {
            toast.success('Logout successful')
            navigate('/signIn')
        }

    }



    return (
        <div className="max-w-[400px] mx-auto h-96 bg-black mt-8 rounded-b-md">
            <div >
                <div className="rounded-b-full mb-4 bg-white pb-4">
                    <img
                        className="rounded-full w-50 h-50 mx-auto"
                        src={profile?.userPhoto} alt="" />
                    <h3 className="text-center text-2xl font-medium ">{profile?.name}</h3>
                </div>
                <p className="text-center text-white text-lg">{profile.email}</p>
                <button onClick={() => userSignout()}
                    className='px-4 py-2 rounded-md bg-gradient-to-br from-blue-500 to-red-500 
                     w-1/2 mx-auto block text-white font-bold cursor-pointer mt-4'
                >Logout</button>
            </div>
        </div>
    );
};

export default Profile;