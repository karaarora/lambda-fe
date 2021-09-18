/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import { ReactComponent as AvatarIcon } from '../../assets/icons/avatar.svg';
import { UserData } from '../../store/types/users';

const Avatar:React.FC<{ userData: UserData|null; handleLogout: () => void; }> = ({ userData, handleLogout }):JSX.Element => (
    <div aria-label="avatar" className="flex items-center pr-4">
        <div className="rounded-full bg-white shadow-md w-12 h-12 flex justify-center items-center">
            <AvatarIcon />
        </div>
        <div className="flex flex-col ml-3">
            <span className="text-sm font-medium text-primary-normal truncate w-20">hello, 
                <span className="text-base font-medium text-primary-bold">@{userData?.username}</span>
            </span>
            <span aria-label="logout"
                className="text-sm font-medium text-primary-bold underline cursor-pointer"
                onClick={() => handleLogout()}
            >Logout</span>
        </div>
    </div>
);

export default Avatar;