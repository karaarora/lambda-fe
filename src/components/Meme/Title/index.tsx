import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as EditIcon } from '../../../assets/icons/pencil.svg';
import { setMemeData } from '../../../store/actions/meme';
import { IState, Meme } from '../../../store/types/meme';

const MAX_CHAR = 30;

const Title:React.FC<{ contentEditable?: boolean; }> = ({ children, contentEditable }):JSX.Element => {
    const [canEdit, setCanEdit] = useState(false);
    const { memeData,loading,sortOptions } = useSelector((state: { memes:IState }) => state.memes);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const heading = useMemo(() => memeData?.heading||"", [memeData]);
    const listingTitle:string = useMemo(() => 
        ((sortOptions as any)?.options||[]).find((option:any) => option.isSelected)?.displayText || "", [sortOptions]);
    const dispatch = useDispatch();
    
    const handleEdit = useCallback(() => {
        setCanEdit(true);
        const node = titleRef.current;
        if(node){
            setTimeout(() => {
                node.focus();
            }, 0);
        }
    }, [titleRef]);

    const handleBlur = useCallback(() => {
        const node = titleRef.current;
        const value = node ? (node.textContent||"").trim(): "";
        if(node && !value) {
            toast("Meme Heading can not be Empty");
            node.textContent = value || "This is my Heading";
        };
        if(node && value && value.length > MAX_CHAR) {
            toast(`Meme Heading can not more than ${MAX_CHAR} characters`);
            node.textContent = (node.textContent || "").slice(0, MAX_CHAR);
        };
        setCanEdit(false);
        dispatch(setMemeData({ ...memeData,heading: (node?.textContent || "This is my Heading") } as Meme));
    }, [dispatch, memeData ]);

    const handleKeyDown = useCallback((e:KeyboardEvent) => {
        if(e.key === "Escape" || e.key === "Enter") {
            handleBlur();
        }
    }, [handleBlur]);

    useEffect(() => {
        const node = titleRef.current;
        if(node)
        node.addEventListener('keydown',handleKeyDown);
        
        return () => {
            if(node)
            node.removeEventListener('keydown',handleKeyDown);
        };
    }, [handleKeyDown]);

    return <div aria-label="title" 
        className={`flex-grow text-xl text-primary-bold font-bold flex p-2 whitespace-nowrap overflow-hidden capitalize
        ${canEdit ? 'w-11/12 break-all': ''} ${loading? "w-60 h-12 bg-white rounded-xl animate-pulse":""}`} 
        contentEditable={canEdit}
        onBlur={handleBlur}
        ref={titleRef} suppressContentEditableWarning>
        {contentEditable ? (heading||children) : `${listingTitle ? `${listingTitle} Memes`:""} `}
        {!canEdit && contentEditable && (
            <EditIcon 
                aria-label="title-edit-icon"
                className="w-6 h-6 ml-2 cursor-pointer" 
                onClick={handleEdit} 
            />
        )}
    </div>;
};

Title.defaultProps = {
    contentEditable: false
};

export default Title;