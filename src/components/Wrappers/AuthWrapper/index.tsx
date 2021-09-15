/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { IState } from '../../../store/types/users';
import Login from '../../Login';
import ModalWrapper from '../ModalWrapper';

const AuthWrapper:React.FC = ({ children }):JSX.Element => {
    const { userData,loader } = useSelector((state: { users: IState }) => state.users);
    const [showAuth, setShowAuth] = useState(false);
     
    const handleClickCapture = useCallback(() => {
        if((!userData && showAuth) || loader) return;
        
        if(!userData) {
            setShowAuth(true);
        }
    }, [loader, showAuth, userData]);
    
    return <div onClick={handleClickCapture}>
        {children}
        {showAuth && <ModalWrapper>
            <Login handleClose={(e?:MouseEvent) =>{ 
                e?.stopPropagation();
                setShowAuth(false); 
            }} />
        </ModalWrapper>}
    </div>;
};

export default AuthWrapper;