import React from 'react';

const Title:React.FunctionComponent = ({ children }):JSX.Element => (
    <div className="text-xl text-primary-bold font-bold">
        {children}
    </div>
);

export default Title;