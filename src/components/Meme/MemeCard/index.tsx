import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { setMemeDataLoading, setSelectedMeme } from "../../../store/actions/meme";
import { likeMeme } from "../../../store/thunk/meme";
import { IState, Meme } from "../../../store/types/meme";
import { IState as IUserState } from "../../../store/types/users";
import Card from "../../../ui/Card";
import CardSkeleton from "../../../ui/Skeleton/CardSkeleton";
import { triggerResizeEvent } from "../../../utils/functions";

const MemeCard:React.FC<{ data: Meme }> = ({ data }):JSX.Element => {
    const { selectedMeme, memeDataLoading, userData } = useSelector((state: { memes:IState,users: IUserState }) => 
        ({...state.memes,...state.users}));
    const isTemplate = useMemo(() => (data?.type === "TEMPLATE"), [data?.type]);
    const dispatch = useDispatch();
    const history = useHistory();
    const isLiked:boolean = useMemo(() => data?.likes?.includes(userData?.id||""),[data?.likes, userData?.id]);
    const isDisLiked:boolean = useMemo(() => data?.dislikes?.includes(userData?.id||""),[data?.dislikes, userData?.id]);
    const params:{ memeId: string } = useParams();

    const handleClick = useCallback(() => {
        if(isTemplate) {
            if(params.memeId && params.memeId === data.id) return;
            if(data.id) history.push(`/studio/${data.id}`);
            else toast.error("Unable to select this Template!");
        } else {
            if(selectedMeme && selectedMeme === data.id) return;
            if(!memeDataLoading) dispatch(setMemeDataLoading(true));
            dispatch(setSelectedMeme(data.id));
            triggerResizeEvent();
        }
    }, [isTemplate, params.memeId, history, selectedMeme, data.id, memeDataLoading, dispatch]);

    const handleLike = useCallback(() => {
        if(!userData) return;
        dispatch(likeMeme({ memeId: data.id, action: "LIKE",userId: userData?.id as string }));
    }, [data.id, dispatch, userData]);

    const handleDisLike = useCallback(() => {
        if(!userData) return;
        dispatch(likeMeme({ memeId: data.id, action: "DISLIKE",userId: userData?.id as string}));
    }, [data.id, dispatch, userData]);

    if((data as any)?.isLoading)
    return <CardSkeleton isTemplate={isTemplate} />;

    return <Card data={data} handleClick={handleClick} handleDisLike={handleDisLike} 
        handleLike={handleLike} isDisLiked={isDisLiked} isLiked={isLiked} 
        isTemplate={isTemplate}
    />;
};

export default MemeCard;