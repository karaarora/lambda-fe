import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from '../../store/actions/meme';
import { IState } from '../../store/types/meme';
import Input from '../../ui/Input';
import { debounce } from '../../utils/functions';

const ListingSearch:React.FC = ():JSX.Element => {
    const { filter } = useSelector((state: { memes:IState }) => state.memes);
    const [value, setValue] = useState<string>("");
    const dispatch = useDispatch();

    const handleOnChange = useCallback((e:React.ChangeEventHandler<HTMLInputElement>|any) => {
        setValue(e.target.value);
        if(e.target.value){
            debounce(() => dispatch(setFilter({ ...filter,query:  e.target.value })),800);
        } else {
            const { query, ...rest } = filter as any;
            dispatch(setFilter(rest));
        }
    }, [dispatch, filter]);

    return <Input className="mr-4" onChange={handleOnChange} placeholder="Search"
        type="text" value={value} />;
};

export default ListingSearch;