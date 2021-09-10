import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUserData } from "../../store/actions/users";
import { IState } from "../../store/types/users";
import Avatar from "../../ui/Avatar";
import { removeCookie } from "../../utils/functions";
import AuthWrapper from "../AuthWrapper";

const User:React.FC = ():JSX.Element => {
    const { userData } = useSelector((state: { users:IState }) => state.users);
    const dispatch = useDispatch();

    const handleLogout = useCallback(() => {
        dispatch(setUserData(null));
        removeCookie("me_token");
    }, [dispatch]);

    if(!userData) 
    return <AuthWrapper>
        <button className="bg-primary rounded-3xl py-2 px-5 text-white w-fit mt-1" type="button">
            Login
        </button>
    </AuthWrapper>;

    return <Avatar handleLogout={handleLogout} userData={userData} />;
};

export default User;