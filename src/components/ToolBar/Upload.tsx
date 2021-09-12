import React, { useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';
import { setMemeData } from '../../store/actions/meme';
import { IState } from '../../store/types/editor';
import { IState as IMemeState } from '../../store/types/meme';
import { addImage } from '../../utils/fabric';
import { getBase64 } from '../../utils/functions';

const Upload:React.FC = ():JSX.Element => {
    const { canvas, memeData } = useSelector((state: { editor:IState, meme: IMemeState }) => ({...state.editor,...state.meme}));
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const handleUpload = useCallback((e:any) => {
        if(canvas) {
            // const name = e.target.files[0].name.split(".")[0];
            // const url:string = URL.createObjectURL(e.target.files[0]);
            getBase64(e.target.files[0]).then((res:string,err:boolean) => {
                if(!err) {
                    addImage(canvas, res);
                    dispatch(setMemeData({...memeData, state: "true"} as any));
                } else {
                    toast.error("Unable to upload Image!");
                }
            });
        } else {
            toast.error("Unable to Upload please try in some time!");
        }
        e.target.value = null;
    }, [canvas, dispatch, memeData]);

    const handleButtonClick = useCallback(() => {
        if(inputRef.current){
            inputRef.current.click();
        }
    }, []);

    return <>
        <button className="rounded-3xl bg-white shadow text-primary-bold px-2 py-1 transition transform-all hover:opacity-75" 
            onClick={handleButtonClick}
            type="button"
        >
            <ImageIcon />
        </button>
        <input className="hidden" onChange={handleUpload} ref={inputRef}
            type="file" />
    </>;
};

export default Upload;