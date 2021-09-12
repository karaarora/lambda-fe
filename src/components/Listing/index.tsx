import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useInfiniteLoader, useMasonry, usePositioner, useResizeObserver } from "masonic";
import { useScroller, useSize } from 'mini-virtual-list';

import { clearMemeState, setFilter, setLoader, setMemes } from '../../store/actions/meme';
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
    showAllMemes: false,
    status: status||"ALL",
    sort: "",
    query: ""
};

const defaultFilters = {
    type: "MEME",
    status: "PUBLISHED",
    showAllMemes: true,
    sort: sort||"TRENDING",
    query: ""
};

const Listing:React.FC<{
    isMasonry: boolean;
    isTemplate: boolean;
}> = forwardRef(({ isMasonry, isTemplate }):JSX.Element => {
    const { memes, loading, filter, selectedMeme, totalMemes, userData } = 
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
          isItemLoaded: (index, items) => !!items[index],
          minimumBatchSize: 20,
          threshold: 3,
          totalItems: totalMemes
        }
    );
    
    // const containerRef = React.useRef(null);
    // In this example we are deriving the height and width properties
    // from a hook that measures the offsetWidth and offsetHeight of
    // the scrollable div.
    //
    // The code for this hook can be found here:
    // https://github.com/jaredLunde/mini-virtual-list/blob/5791a19581e25919858c43c37a2ff0eabaf09bfe/src/index.tsx#L376
    const { width, height } = useSize(listingRef);
    // Likewise, we are tracking scroll position and whether or not
    // the element is scrolling using the element, rather than the
    // window.
    //
    // The code for this hook can be found here:
    // https://github.com/jaredLunde/mini-virtual-list/blob/5791a19581e25919858c43c37a2ff0eabaf09bfe/src/index.tsx#L414
    const { scrollTop, isScrolling } = useScroller(listingRef);
    const positioner = usePositioner({
      width,
      columnWidth: 188,
      columnGutter: 6
    }, [loadableMemes,memes]);
    const resizeObserver = useResizeObserver(positioner);

    useEffect(() => {
        triggerResizeEvent();
    }, [memes]);

    useEffect(() => () => dispatch(clearMemeState()) as any, [dispatch]);

    useEffect(() => {
        dispatch(setLoader(true));
        
        dispatch(setFilter(isTemplate ? defaultTemplateFilters :defaultFilters as any));

        dispatch(getMemes(isTemplate ? defaultTemplateFilters :defaultFilters));

        return () => {
            dispatch(setMemes([]));
            dispatch(setFilter(null));
        };
    }, [dispatch, isTemplate, userData]);
    
    return <ListingContainer isCollapsed={!!selectedMeme} isMasonry={isMasonry} ref={listingRef}>
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
});

export default Listing;