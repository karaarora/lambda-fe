import React, { useCallback, useRef, useState } from 'react';

import { ReactComponent as EditIcon } from '../../assets/icons/pencil.svg';

const Title:React.FC<{ contentEditable?: boolean }> = ({ children, contentEditable }):JSX.Element => {
    const [canEdit, setCanEdit] = useState(false);
    const titleRef = useRef<HTMLDivElement | null>(null);

    const handleEdit = useCallback(() => {
        setCanEdit(true);
        if(titleRef.current){
            titleRef.current?.focus();
        }
    }, []);

    const handleBlur = useCallback(() => {
        setCanEdit(false);
    }, []);

    return <div className={`text-xl text-primary-bold font-bold flex p-2 ${canEdit ? 'w-fit break-all': ''}`}
        contentEditable={canEdit} onBlur={handleBlur} ref={titleRef}>
        {children}
        {!canEdit && contentEditable && <EditIcon className="w-6 h-6 ml-2 cursor-pointer" onClick={handleEdit} />}
    </div>;
};

export default Title;