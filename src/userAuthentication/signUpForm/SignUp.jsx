import { useForm } from 'react-hook-form';
import uploadImage from '../../../utility/utility';
import toast from 'react-hot-toast';
import { FiLoader } from "react-icons/fi";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../useAxios/useAxiosSecure';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEye } from 'react-icons/io5';


const SignUp = () => {
    const useAxios = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm()
    const onSubmit = async (data) => {
        setLoading(true)

        try {
            const image = data.photo[0]
            const img = await uploadImage(image)
            console.log(img);
            const userCredentials = {
                photo: img,
                name: data.name,
                email: data.email,
                password: data.password
            }
            const res = await useAxios.post('/signUp', userCredentials)
            console.log('SignUp status', res);
            if (res?.status === 201) {
                toast.success('SignUp successful')
                reset()
                navigate('/signIn')
            }

        } catch (error) {
            console.log(error);
            if (error?.status === 400) {
                toast.error('user already exits')
                reset()

            }
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="bg-[url('/signup-bg.jpg')] h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative text-white">
            <form className=' min-w-[400px] mx-auto absolute z-50'
                onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                    <h2 className='text-3xl text-center'>Please Signup</h2>
                    {/* Photo */}
                    <div>
                        <label htmlFor="" className='block mb-2'>Photo*</label>
                        <input
                            {...register('photo', { required: 'user photo is required' })}
                            type="file"
                            className='border rounded-md px-4 py-2 w-full text-white' />
                        {/* error handle */}
                        {errors?.photo &&
                            <p className='text-red-600'>{errors?.photo?.message}</p>}
                    </div>
                    {/* name */}
                    <div>
                        <label htmlFor="" className='block w mb-2'>Name*</label>
                        <input
                            className='border rounded-md px-4 py-2 w-full '
                            {...register('name', { required: 'user name is required' })}
                            type="text"
                            placeholder='Enter your name' />
                        {/* error handle */}
                        {errors?.name &&
                            <p className='text-red-600'>{errors?.name?.message}</p>}
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="" className='block mb-2'>Email*</label>
                        <input
                            className='border rounded-md px-4 py-2 w-full text-white'
                            {...register('email', { required: 'user email is required' })}
                            type="email"
                            placeholder='Enter your email' />
                        {/* error handle */}
                        {errors?.email &&
                            <p className='text-red-600'>{errors?.email?.message}</p>}
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor="" className='block mb-2'>Password*</label>
                        <div className='relative '>
                            <input
                                className='border rounded-md px-4 py-2 w-full text-white'
                                {...register('password', { required: 'user password is required' })}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter your Password' />
                            <span className='absolute top-3 right-3 cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ?
                                        <span>
                                            <FaEyeSlash />
                                        </span> :
                                        <span>
                                            <IoEye />
                                        </span>
                                }
                            </span>
                        </div>
                        {/* error handle */}
                        {errors?.password &&
                            <p className='text-red-600'>{errors?.password?.message}</p>}
                    </div>
                    {/* submit button */}
                    <div>
                        <button
                            type='submit'
                            className='px-4 py-2 rounded-md bg-gradient-to-br from-blue-500 to-red-500 w-full text-white font-bold cursor-pointer flex items-center justify-center gap-3'>
                            <span>
                                <FiLoader className={`${loading ? 'animate-spin block' : 'hidden'} text-3xl`} />
                            </span>
                            {
                                loading ? 'Signup processing...' : 'SignUp'
                            }
                        </button>
                        <p className='font-medium text-center mt-4'>Do you have an account?
                            <Link to={'/signIn'}
                                className='ml-2'>
                                Signin
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
            <div className='absolute bg-black top-0 left-0 h-full w-full opacity-60'></div>
        </div>
    );
};

export default SignUp;