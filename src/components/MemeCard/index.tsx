import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { setMemeDataLoading, setSelectedMeme } from "../../store/actions/meme";
import { IState, Meme } from "../../store/types/meme";
import Card from "../../ui/Card";
import CardSkeleton from "../../ui/Skeleton/CardSkeleton";
import { triggerResizeEvent } from "../../utils/functions";

const MemeCard:React.FC<{ data: Meme }> = ({ data }):JSX.Element => {
    const { selectedMeme, memeDataLoading } = useSelector((state: { memes:IState }) => state.memes);
    const isTemplate = useMemo(() => (data?.type === "TEMPLATE"), [data?.type]);
    const dispatch = useDispatch();
    const history = useHistory();
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

    if((data as any)?.isLoading)
    return <CardSkeleton isTemplate={isTemplate} />;

    return <Card data={data} handleClick={handleClick} isTemplate={isTemplate} />;
};

export default MemeCard;