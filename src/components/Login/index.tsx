/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { KeyboardEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { setLoader } from '../../store/actions/users';
import { loginUser, registerUser } from '../../store/thunk/users';
import { IState } from '../../store/types/users';
import Input from '../../ui/Input';
import ModalContainer from '../../ui/ModalContainer';
import { isValidEmail } from '../../utils/functions';

const registerInitialData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const loginInitialData = {
    username: "",
    password: ""
};

const checkError = (key: string, value: string):string|boolean => {
    switch(key){
        case "email": {
            if(!isValidEmail(value)) {
                return "Email not valid !";
            }
            return false;
        }
        default: return false;
    }
};

const Login:React.FC<{
    handleClose: (e?:MouseEvent) => void;
}> = ({ handleClose }):JSX.Element => {
    const { loader } = useSelector((state: { users:IState })=> state.users);
    const [isSignUp, setIsSignUp] = useState(false);
    const [data, setData] = useState<any>(isSignUp ? registerInitialData: loginInitialData );
    const dispatch = useDispatch();

    useEffect(() => {
        setData(isSignUp ? registerInitialData: loginInitialData );
    }, [isSignUp]);

    const handleOnChange = useCallback((key: string, value: string) => {
        setData((d:any) => ({...d,[key]: value }));
    },[]);

    const isSubmitDisabled = useCallback(():boolean => {
        const keys: string[] = Object.keys(data);
        return !!keys.find((key:string) => !(data as any)[key].trim());
    }, [data]);

    const isDisabled:boolean = useMemo(() => isSubmitDisabled(), [isSubmitDisabled]);

    const handleSubmit = useCallback(() => {
        if(isDisabled) return;
        
        const keys: string[] = Object.keys(data);
        const errors:string[] = keys.reduce((acc:any[],key:string) => {
            const hasError = checkError(key, (data as any)[key]);
            if(hasError) return [...acc,hasError];
            return acc;
        }, []);

        if(errors.length > 0){
            toast(errors[0]);
            return;
        }
        if(isSignUp && data.password !== data.confirmPassword) {
            toast("Password did not match !");
            return;
        } 
        // register or login
        if(!loader) dispatch(setLoader(true));
        if(isSignUp){
            dispatch(registerUser(data,() => setIsSignUp(false)));
        } else {
            dispatch(loginUser(data,() => window.location.reload()));
        }
    }, [data, dispatch, isDisabled, isSignUp, loader]);

    const handleKeyDown:KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }, [handleSubmit]);

    return <ModalContainer footer={
            <p className="text-xs">{isSignUp ? "Already Signed Up? ": "Here for first time? "} 
                <span className="underline cursor-pointer" data-testid="signup-toggle"
                    onClick={() => setIsSignUp((v) => !v)}>{isSignUp ? 'Log In' : 'Sign Up'}
                </span>
            </p>
        }
        handleClose={handleClose}
        title={isSignUp? "Sign Up" : "Login"}
    >
        <Input aria-label="user-name" 
            className="mb-2 w-full"
            onChange={(e) => handleOnChange("username",e.target.value)} onKeyDown={handleKeyDown}
            placeholder="User Name" 
            type="text" value={data?.username||""} />
        {isSignUp && <Input aria-label="email" 
            className="mb-2 w-full"
            onChange={(e) => handleOnChange("email",e.target.value)}
            onKeyDown={handleKeyDown} placeholder="Email"
            type="email" value={data?.email||""} />}
        <Input aria-label="password" 
            className="w-full"
            onChange={(e) => handleOnChange("password",e.target.value)}
            onKeyDown={handleKeyDown} placeholder="Password"
            type="password" value={data?.password||""} />
        {isSignUp && <Input aria-label="confirm-password" 
            className="mt-2 w-full"
            onChange={(e) => handleOnChange("confirmPassword",e.target.value)}
            onKeyDown={handleKeyDown} placeholder="Confirm Password"
            type="password" value={data?.confirmPassword||""} />}
        <button className={`bg-primary rounded-3xl py-2 px-5 text-white w-auto mt-4 active:animate-ping transition transform-all
            ${isDisabled||loader ? "opacity-50 cursor-not-allowed":""} flex items-center`}
            data-testid="login" disabled={isDisabled||loader} onClick={handleSubmit}
type="button"
            >
            <span>{isSignUp? "Sign Up": "Login"}</span>
            {loader && <div className="w-5 h-5 border-4 border-blue-400 border-solid rounded-full animate-spin ml-2"
                style={{borderTopColor:"transparent"}} />}
        </button>
    </ModalContainer>;
};

export default Login;