import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setMemeData, setMemes, setSelectedMeme } from '../../../store/actions/meme';
import { getMemeData, likeMeme } from '../../../store/thunk/meme';
import { IState } from '../../../store/types/meme';
import { IState as IUserState } from '../../../store/types/users';
import Detail from '../../../ui/Detail';
import MemeDetailSkeleton from '../../../ui/Skeleton/MemeDetailSkeleton';
import { downloadMeme, triggerResizeEvent, update } from '../../../utils/functions';

const MemeDetail:React.FC = ():JSX.Element|null => {
    const { memeData, selectedMeme, memeDataLoading,userData,memes } = 
        useSelector((state: { memes: IState,users: IUserState }) => 
        ({...state.memes,...state.users}));
    const dispatch = useDispatch();
    const history = useHistory();
    const isLiked:boolean = useMemo(() => memeData?.likes.includes(userData?.id||""),[memeData?.likes, userData?.id])||false;
    const isDisLiked:boolean = useMemo(() => memeData?.dislikes.includes(userData?.id||"")
        ,[memeData?.dislikes, userData?.id])||false;

    useEffect(() => {
        if(selectedMeme)
        dispatch(getMemeData(selectedMeme));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMeme]);

    useEffect(() => {
        triggerResizeEvent();
    }, [memeData?.id]);

    const handleClose = useCallback(() => {
        dispatch(setMemeData(null));
        dispatch(setSelectedMeme(""));
        setTimeout(() => window.dispatchEvent(new Event('resize')), 0);
    }, [dispatch]);

    const handleEdit = useCallback(() => {
        history.push(`/studio/${memeData?.id}`);
    }, [history, memeData?.id]);

    const handleLike = useCallback((action:"LIKE"|"DISLIKE") => {
        if(!userData) return;
        if(memeData) {
            const likes:any = memeData?.likes.filter((l:any) => l !== userData?.id);
            const dislikes:any = memeData?.dislikes.filter((l:any) => l !== userData?.id);
            if(likes.length < memeData?.likes.length && action === "LIKE") return; 
            if(dislikes.length < memeData?.dislikes.length && action === "DISLIKE") return;
            dispatch(likeMeme({ memeId: memeData.id, action,userId: userData?.id as string }));
            const newMeme = {...memeData,
                likes: action === "LIKE" ? [...likes,userData?.id]:likes,
                dislikes: action === "DISLIKE" ? [...dislikes,userData?.id]:dislikes
            };
            dispatch(setMemeData(newMeme as any));
            dispatch(setMemes(update(memes,newMeme,(v) => v.id === memeData?.id)));
        }
    }, [dispatch, memeData, memes, userData]);

    const handleDownload = useCallback(() => {
        downloadMeme(memeData?.image_url||"",memeData?.heading||"");
    }, [memeData?.heading, memeData?.image_url]);

    if(memeDataLoading)
    return <MemeDetailSkeleton />;

    return <Detail data={memeData} handleClose={handleClose} 
        handleDownload={handleDownload} handleEdit={handleEdit} handleLike={handleLike}
        isDisLiked={isDisLiked} isLiked={isLiked}
    />;
};

export default MemeDetail;