import React from 'react';

import { ReactComponent as AvatarIcon } from '../../assets/icons/avatar.svg';

const Avatar = ():JSX.Element => (
    <div className="flex items-center">
        <div className="rounded-full bg-white shadow-md w-12 h-12 flex justify-center items-center">
            <AvatarIcon />
        </div>
        <div className="flex flex-col ml-3">
            <span className="text-sm font-medium text-primary-normal">Hello</span>
            <span className="text-base font-medium text-primary-bold truncate w-20">Karan</span>
        </div>
    </div>
);

export default Avatar;