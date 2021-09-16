import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setFilter, setLoader, setMemes, setSortOptions, setStatusOptions } from '../../store/actions/meme';
import { getMemes } from '../../store/thunk/meme';
import { IState, Options as OptionsType } from '../../store/types/meme';
import OrderedList from '../../ui/OrderedList';
import OptionsSkeleton from '../../ui/Skeleton/OptionsSkeleton';

const showTypeMeme = ["SAVED","PUBLISHED"]; 
const Options:React.FC<{
    type: "sort"|"status";
    isPill?: boolean;
}> = ({ type, isPill }):JSX.Element => {
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
                const addFilter:any = showTypeMeme.includes(option.key) ? { type: "MEME" }:
                    { type: type === "status" ? "TEMPLATE":"MEME" };
                if(!option.isSelected && !loading) {
                    if(!loading) dispatch(setLoader(true));
                    dispatch(setFilter({...filter,[type as any]: option.key,query: "",...addFilter }));
                    dispatch(setLoader(true));
                    dispatch(setMemes([]));
                    dispatch(getMemes({...filter,[type as any]: option.key,query: "",...addFilter }));
                    const newOptions:any = options?.options;
                    for(let i=0;i<newOptions?.length;i += 1){
                        newOptions[i].isSelected = false;
                        if(newOptions[i].key === option.key){
                            newOptions[i].isSelected = true;
                        }
                    }
                    if(type === "sort"){
                        dispatch(setSortOptions({...options,options: newOptions} as any));

                    } else {
                        dispatch(setStatusOptions({...options,options: newOptions} as any));
                    }
                }
            }
        }
    )) as any,[dispatch, filter, history.location.pathname, loading, options, type]);

    if(loading && !list.length)
    return <OptionsSkeleton isPill={isPill} />;

    return <OrderedList isPill={isPill} list={list} title={options?.title} />;
};

Options.defaultProps = {
    isPill: false
};

export default Options;