import React from 'react';
import { Link } from 'react-router-dom';

import MainContainer from '../ui/MainContainer';
import OrderedList from '../ui/OrderedList';
import SideBarContainer from '../ui/SideBarConainer';

const dummyList:any = [
    { name: "Published", onClick: () => {} },
    { name: "Saved", onClick: () => {} },
];

const Studio:React.FunctionComponent = (): JSX.Element => (
    <div className="flex">
        <SideBarContainer>
            <OrderedList list={dummyList} title="Your memes" />
            <Link 
                className="bg-primary rounded-3xl py-2 px-5 text-white w-fit mt-4"
                to="/"
            >
                Exit Studio
            </Link>
        </SideBarContainer>
        <MainContainer>
            <h1>hi</h1>
        </MainContainer>
        {/* <SideBarContainer showOnRight>
            <h1>right</h1>
        </SideBarContainer> */}
    </div>
);

export default Studio;