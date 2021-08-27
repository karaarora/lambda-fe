import React from 'react';

const Search: React.FunctionComponent = ():JSX.Element => (
    <input className="p-3 px-6 mr-5 rounded-3xl focus:outline-none shadow-md flex-grow min-w-7" placeholder="Search" 
        type="text" />
);

export default Search;