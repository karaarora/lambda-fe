/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

import Input from '../../ui/Input';
import ModalContainer from '../../ui/ModalContainer';

const Login:React.FC<{
    handleClose: () => void;
}> = ({ handleClose }):JSX.Element => {
    const [isSignUp, setIsSignUp] = useState(false);
    
    return <ModalContainer footer={
            <p className="text-xs">{isSignUp ? "Already Signed Up? ": "Here for firt time? "} 
                <span className="underline cursor-pointer" 
                    onClick={() => setIsSignUp((v) => !v)}>{isSignUp ? 'Log In' : 'Sign Up'}
                </span>
            </p>
        }
        handleClose={handleClose}
        title={isSignUp? "Sign Up" : "Login"}
    >
        <Input className="mb-2 w-full" placeholder="User Name" type="text" />
        {isSignUp && <Input className="mb-2 w-full" placeholder="Email" type="email" />}
        <Input className="w-full" placeholder="Password" type="password" />
        <button className="bg-primary rounded-3xl py-2 px-5 text-white w-fit mt-4" type="button">
            {isSignUp? "Sign Up": "Login"}
        </button>
    </ModalContainer>;
};

export default Login;