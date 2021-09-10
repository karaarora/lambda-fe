import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setMemeData, setSelectedMeme } from '../../store/actions/meme';
import { getMemeData } from '../../store/thunk/meme';
import { IState } from '../../store/types/meme';
import Detail from '../../ui/Detail';

const MemeDetail:React.FC = ():JSX.Element|null => {
    const { memeData, selectedMeme, memeDataLoading } = useSelector((state: { memes: IState }) => state.memes);
    const dispatch = useDispatch();
    const history = useHistory();

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

    if(memeDataLoading)
    return <div className="animate-pulse bg-grey w-full h-full" />;

    return <Detail data={memeData} handleClose={handleClose} handleEdit={handleEdit} />;
};

export default MemeDetail;