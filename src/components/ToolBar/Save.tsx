import React from 'react';

import { ReactComponent as SaveIcon } from '../../assets/icons/save.svg';

const Save:React.FC = () => <button 
    className="rounded-3xl bg-white shadow text-primary-normal px-2 py-1" 
    type="button"
>
    <SaveIcon />
</button>;

export default Save;