import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IState } from '../../store/types/users';
import { triggerResizeEvent } from '../../utils/functions';
import Login from '../Login';
import ModalWrapper from '../ModalWrapper';

const AuthWrapper:React.FC = ({ children }):JSX.Element => {
    const { userData } = useSelector((state: { users: IState }) => state.users);
    const [showAuth, setShowAuth] = useState(false);

    const handleClickCapture = useCallback(() => {
        // check if user loggedin
        // if not then show login popup
        if(!userData) {
            setShowAuth(true);
        } else {
            setShowAuth(false);
        }
    }, [userData]);

    useEffect(() => {
        if(userData) {
            setShowAuth(false);
            triggerResizeEvent();
        }
    }, [userData]);

    return <div onClickCapture={handleClickCapture}>
        {children}
        {showAuth && <ModalWrapper>
            <Login handleClose={() =>{ setShowAuth(false); }} />
        </ModalWrapper>}
    </div>;
};

export default AuthWrapper;