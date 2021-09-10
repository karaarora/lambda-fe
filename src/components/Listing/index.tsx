/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useInfiniteLoader, useMasonry, usePositioner, useResizeObserver } from "masonic";
import { useScroller, useSize } from 'mini-virtual-list';

import { setFilter, setLoader, setMemes } from '../../store/actions/meme';
import { getMemes } from '../../store/thunk/meme';
import { IState } from '../../store/types/meme';
import ListingContainer from '../../ui/ListingContainer';
import { triggerResizeEvent } from '../../utils/functions';
import MemeCard from '../MemeCard';

const Listing:React.FC<{
    isMasonry: boolean;
    isTemplate: boolean;
}> = forwardRef(({ isMasonry, isTemplate }):JSX.Element => {
    const { memes, loading, filter, selectedMeme, totalMemes } = useSelector((state: { memes:IState }) => state.memes);
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
    }, [loadableMemes]);
    const resizeObserver = useResizeObserver(positioner);

    useEffect(() => {
        triggerResizeEvent();
    }, [memes]);

    useEffect(() => {
        if(!loading) dispatch(setLoader(true));
        if(isTemplate) dispatch(setFilter({ ...filter, type: "TEMPLATE" }));
        dispatch(getMemes(isTemplate ? {...filter,type: "TEMPLATE"} : filter));
        return () => {
            dispatch(setMemes([]));
        };
    }, [filter?.query, isTemplate]);
    
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