import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useInfiniteLoader, useMasonry, usePositioner, useResizeObserver } from "masonic";
import { useScroller, useSize } from 'mini-virtual-list';

import { clearMemeState, setFilter, setLoader, setMemes, setSortOptions, setStatusOptions } from '../../store/actions/meme';
import { getMemes } from '../../store/thunk/meme';
import { IState } from '../../store/types/meme';
import { IState as IUserState } from '../../store/types/users';
import ListingContainer from '../../ui/ListingContainer';
import { getQuery, triggerResizeEvent } from '../../utils/functions';
import MemeCard from '../Meme/MemeCard';

const params = getQuery();
const sort:any = params.get("sort");
const status:any = params.get("status");
const defaultTemplateFilters = {
    type: "TEMPLATE",
    showAllMemes: true,
    status: status||"ALL",
    sort: "LATEST",
    query: ""
};

const defaultFilters = {
    type: "MEME",
    status: "PUBLISHED",
    showAllMemes: true,
    sort: sort||"TRENDING",
    query: ""
};
const showTypeMeme = ["SAVED","PUBLISHED"]; 

const Listing:React.FC<{
    isTemplate: boolean;
}> = ({ isTemplate }):JSX.Element => {
    const { memes, loading, filter, selectedMeme, totalMemes,loader } = 
        useSelector((state: { memes:IState, users: IUserState }) => ({...state.memes,...state.users}));
    const dispatch = useDispatch();
    const listingRef = useRef<HTMLDivElement>(null);
    const fetchRef = useRef<HTMLDivElement>(null);
    const loadableMemes = useMemo(() => (loading? [...memes,...new Array(10).fill({ isLoading: true })]:memes),[memes,loading]);
    const maybeLoadMore = useInfiniteLoader(
        async () => {
            await new Promise((res:any) => {
                dispatch(getMemes({ ...filter,page: (filter?.page||1) + 1 }, () => res()));
            });
        },
        {
          isItemLoaded: (index, items) => !!items[index] && items.length > 0,
          minimumBatchSize: 20,
          threshold: 3,
          totalItems: totalMemes
        }
    );

    const { width, height } = useSize(listingRef);

    const { scrollTop, isScrolling } = useScroller(listingRef);
    const positioner = usePositioner({
      width,
      columnWidth: 200,
      columnGutter: 6
    }, [loadableMemes,loader,loading,selectedMeme]);
    const resizeObserver = useResizeObserver(positioner);

    useEffect(() => {
        triggerResizeEvent();
    }, [memes,loading,loader,selectedMeme]);

    useEffect(() => () => {
        dispatch(clearMemeState()) as any;
        triggerResizeEvent();
    }, [dispatch]);

    useEffect(() => {
        dispatch(setLoader(true));
        const addFilter:any = { 
            type: showTypeMeme.includes(defaultTemplateFilters.status) ? "MEME":"TEMPLATE",
            showTypeMeme: !showTypeMeme.includes(defaultTemplateFilters.status)
        };

        dispatch(setFilter(isTemplate ? {...defaultTemplateFilters,...addFilter} :defaultFilters as any));

        dispatch(getMemes(isTemplate ? {...defaultTemplateFilters,...addFilter} :defaultFilters));

        return () => {
            dispatch(setMemes([]));
            dispatch(setFilter(null));
            dispatch(setStatusOptions(null));
            dispatch(setSortOptions(null));
        };
    }, [dispatch, isTemplate]);
    
    return <ListingContainer isCollapsed={!!selectedMeme} ref={listingRef}>
        {useMasonry({
          positioner,
          resizeObserver,
          items: loadableMemes,
          height,
          scrollTop,
          isScrolling,
          overscanBy: 6,
          onRender: maybeLoadMore,
          render: MemeCard
        })}
        <div ref={fetchRef} />
    </ListingContainer>;
};

export default Listing;