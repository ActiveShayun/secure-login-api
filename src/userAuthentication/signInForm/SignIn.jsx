import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiLoader } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../useAxios/useAxiosSecure';
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
    const useAxios = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    // console.log(showPassword);
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
            const userCredentials = {
                email: data.email,
                password: data.password
            }
            const res = await useAxios.post('/signin', userCredentials)
            console.log('SignUp status', res);
            if (res?.status === 200 && res?.data?.success) {
                toast.success('Signin successful')
                reset()
                navigate('/profile')
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-[url('/login-bg.jpg')] bg-center bg-cover border h-screen flex items-center relative justify-center">
            <form className='min-w-[400px] mx-auto text-white absolute z-50'
                onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                    <h2 className='text-3xl text-center'>Please Signin</h2>
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
                                className='border rounded-md px-4 py-2 w-full '
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
                                loading ? 'Signin processing...' : 'Signin'
                            }
                        </button>
                    </div>
                    <p className='font-medium text-center mt-4'>Do you have an account?
                        <Link to={'/'}
                            className='ml-2'>
                            Signup
                        </Link>
                    </p>
                </div>
            </form>
            <div className='absolute bg-black top-0 left-0 h-full w-full opacity-50'></div>
        </div>
    );
};

export default SignIn;