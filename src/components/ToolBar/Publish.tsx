import React from 'react';

import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg';

const Publish:React.FC = () => <button 
    className="rounded-3xl bg-white shadow text-primary-normal px-2 py-1 ml-2" 
    type="button"
>
    <UploadIcon />
</button>;

export default Publish;