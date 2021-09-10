import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';

import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';
import { IState } from '../../store/types/editor';
import { addImage } from '../../utils/fabric';

const Upload:React.FC = ():JSX.Element => {
    const { canvas } = useSelector((state: { editor:IState }) => state.editor);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = useCallback((e:any) => {
        const url:string = URL.createObjectURL(e.target.files[0]);
        addImage(canvas, url);
        e.target.value = null;
    }, [canvas]);

    const handleButtonClick = useCallback(() => {
        if(inputRef.current){
            inputRef.current.click();
        }
    }, []);

    return <>
        <button className="rounded-3xl bg-white shadow text-primary-normal px-2 py-1" onClick={handleButtonClick}
            type="button"
        >
            <ImageIcon />
        </button>
        <input className="hidden" onChange={handleUpload} ref={inputRef}
            type="file" />
    </>;
};

export default Upload;