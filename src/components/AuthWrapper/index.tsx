import React, { MouseEventHandler, useCallback, useState } from 'react';

import Login from '../Login';
import ModalWrapper from '../ModalWrapper';

const AuthWrapper:React.FC = ({ children }):JSX.Element => {
    const [showAuth, setShowAuth] = useState(false);

    const handleClickCapture = useCallback(() => {
        // check if user loggedin
        // if not then show login popup
        setShowAuth(true);
    }, []);

    return <div onClickCapture={handleClickCapture}>
        {children}
        {showAuth && <ModalWrapper>
            <Login handleClose={() =>{ console.log('close req'); setShowAuth(false);}} />
        </ModalWrapper>}
    </div>;
};

export default AuthWrapper;