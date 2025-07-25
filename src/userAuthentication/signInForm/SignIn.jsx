import React from 'react';

const SignIn = () => {
    return (
        <div>
            <div>
                <form action="">
                    {/* name */}
                    <div>
                        <label htmlFor="">Photo*</label>
                        <input type="file" placeholder='Enter your name' />
                    </div>
                    <div>
                        <label htmlFor="">Name*</label>
                        <input type="text" placeholder='Enter your name' />
                    </div>
                    <div>
                        <label htmlFor="">Name*</label>
                        <input type="email" placeholder='Enter your email' />
                    </div>
                    <div>
                        <label htmlFor="">Password*</label>
                        <input type="text" placeholder='Enter your Password' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;