import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setMemeData, setSelectedMeme } from '../../../store/actions/meme';
import { getMemeData, likeMeme } from '../../../store/thunk/meme';
import { IState } from '../../../store/types/meme';
import { IState as IUserState } from '../../../store/types/users';
import Detail from '../../../ui/Detail';
import { downloadMeme } from '../../../utils/functions';

const MemeDetail:React.FC = ():JSX.Element|null => {
    const { memeData, selectedMeme, memeDataLoading,userData } = useSelector((state: { memes: IState,users: IUserState }) => 
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

    const handleClose = useCallback(() => {
        dispatch(setMemeData(null));
        dispatch(setSelectedMeme(""));
        setTimeout(() => window.dispatchEvent(new Event('resize')), 0);
    }, [dispatch]);

    const handleEdit = useCallback(() => {
        history.push(`/studio/${memeData?.id}`);
    }, [history, memeData?.id]);

    const handleLike = useCallback(() => {
        if(!userData) return;
        if(memeData)
        dispatch(likeMeme({ memeId: memeData.id, action: "LIKE",userId: userData?.id as string }));
    }, [dispatch, memeData, userData]);

    const handleDisLike = useCallback(() => {
        if(!userData) return;
        if(memeData)
        dispatch(likeMeme({ memeId: memeData.id, action: "DISLIKE",userId: userData?.id as string}));
    }, [dispatch, memeData, userData]);

    const handleDownload = useCallback(() => {
        downloadMeme(memeData?.image_url||"",memeData?.heading||"");
    }, [memeData?.heading, memeData?.image_url]);

    if(memeDataLoading)
    return <div className="animate-pulse bg-grey w-full h-full" />;

    return <Detail data={memeData} handleClose={handleClose} handleDisLike={handleDisLike} 
        handleDownload={handleDownload} handleEdit={handleEdit} handleLike={handleLike}
        isDisLiked={isDisLiked} isLiked={isLiked}
    />;
};

export default MemeDetail;