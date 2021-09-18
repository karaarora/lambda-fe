import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter, setLoader, setMemes } from '../../store/actions/meme';
import { getMemes } from '../../store/thunk/meme';
import { IState } from '../../store/types/meme';
import Input from '../../ui/Input';
import { debounce } from '../../utils/functions';

const ListingSearch:React.FC = ():JSX.Element => {
    const { filter } = useSelector((state: { memes:IState }) => state.memes);
    const [value, setValue] = useState<string>("");
    const dispatch = useDispatch();

    const handleOnChange = useCallback((e:React.ChangeEventHandler<HTMLInputElement>|any) => {
        setValue(e.target.value);
        debounce(() => {
            dispatch(setFilter({ ...filter,query:  e.target.value }));
            dispatch(setLoader(true));
            dispatch(setMemes([]));
            dispatch(getMemes({ ...filter,query:  e.target.value }));
        },400);
    }, [dispatch, filter]);

    useEffect(() => {
        setValue(filter?.query||"");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter?.query]);

    return <Input className="mx-3" onChange={handleOnChange} placeholder="Search"
        type="text" value={value} />;
};

export default ListingSearch;