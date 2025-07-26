import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiLoader } from "react-icons/fi";
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../useAxios/useAxiosSecure';

const SignIn = () => {
    const useAxios = useAxiosSecure()
    const [loading, setLoading] = useState(false)

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
            if (res?.status === 200 && res.data.success) {
                toast.success('Signin successful')
                reset()
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='max-w-[400px] mx-auto lg:mt-8 mt-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                    <h2 className='text-3xl text-center'>Please Signup</h2>
                    {/* Email */}
                    <div>
                        <label htmlFor="" className='block mb-2'>Email*</label>
                        <input
                            className='border rounded-md px-4 py-2 w-full'
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
                        <input
                            className='border rounded-md px-4 py-2 w-full '
                            {...register('password', { required: 'user password is required' })}
                            type="text"
                            placeholder='Enter your Password' />
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
        </div>
    );
};

export default SignIn;