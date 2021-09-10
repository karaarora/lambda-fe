import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setFilter, setLoader } from '../../store/actions/meme';
import { getMemes } from '../../store/thunk/meme';
import { IState, Options as OptionsType } from '../../store/types/meme';
import OrderedList from '../../ui/OrderedList';
import OptionsSkeleton from '../../ui/Skeleton/OptionsSkeleton';

const Options:React.FC<{
    type: "sort"|"status";
}> = ({ type }):JSX.Element => {
    const { sortOptions, statusOptions, filter, loading  } = useSelector((state: { memes:IState }) => state.memes);
    const history = useHistory();
    const dispatch = useDispatch();
    const options:{
        title: string;
        options: OptionsType[]
    } | null = useMemo(() => (type === "sort" ? sortOptions:statusOptions),[sortOptions, statusOptions, type]);

    const list:any = useMemo(() => (options?.options||[]).map((option) => (
        { 
            name: option.displayText, 
            to: { pathname: history.location.pathname, search: `?${type}=${option.key}` },
            active: option.isSelected,
            onClick: () => {
                if(!option.isSelected && !loading) {
                    if(!loading) dispatch(setLoader(true));
                    dispatch(getMemes({...filter,[type]: option.key }));
                    dispatch(setFilter({...filter,[type as any]: option.key }));
                }
            }
        }
    )) as any,[dispatch, filter, history.location.pathname, loading, options?.options, type]);

    if(loading && !list.length)
    return <OptionsSkeleton />;

    return <OrderedList list={list} title={options?.title} />;
};

export default Options;