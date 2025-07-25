import { useForm } from 'react-hook-form';


const SignUp = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = (data) => {
        console.log(data);
    }
    console.log(errors);
    return (
        <div className='max-w-[400px] mx-auto lg:mt-8 mt-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                    <h2 className='text-3xl text-center'>Please Signup</h2>
                    {/* Photo */}
                    <div>
                        <label htmlFor="" className='block mb-2'>Photo*</label>
                        <input
                            {...register('photo', { required: 'user photo is required' })}
                            type="file"
                            className='border rounded-md px-4 py-2 w-full' />
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
                            className='px-4 py-2 rounded-md bg-gradient-to-br from-blue-500 to-red-500 w-full text-white font-bold cursor-pointer'>
                            SignUp
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;