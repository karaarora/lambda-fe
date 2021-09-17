import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setLoader, setUserData } from "../../store/actions/users";
import { getUser } from "../../store/thunk/users";
import { IState } from "../../store/types/users";
import Avatar from "../../ui/Avatar";
import { getCookie, removeCookie } from "../../utils/functions";
import AuthWrapper from "../Wrappers/AuthWrapper";

const User:React.FC<{ isTemplate:boolean; }> = ({ isTemplate }):JSX.Element|null => {
    const { userData, loader } = useSelector((state: { users:IState }) => state.users);
    const dispatch = useDispatch();
    
    const handleLogout = useCallback(() => {
        dispatch(setLoader(true));
        dispatch(setUserData(null));
        removeCookie("me_token");
        localStorage.removeItem("ms_memeData");
        window.location.reload();
    }, [dispatch]);

    useEffect(() => {
        const token = getCookie('me_token');
        if(token && !userData) {
            dispatch(setLoader(true));
            dispatch(getUser());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(isTemplate)
    return null;

    if(!userData) 
    return <AuthWrapper>
        {loader ? <div className="w-20 h-12 bg-white rounded-xl animate-pulse mr-3" />:
        <button className="bg-primary rounded-3xl py-2 px-5 text-white w-fit mt-1 transition transform-all hover:opacity-75 mr-3" 
            type="button">
            Login
        </button>}
    </AuthWrapper>;

    return <Avatar handleLogout={handleLogout} userData={userData} />;
};

export default User;