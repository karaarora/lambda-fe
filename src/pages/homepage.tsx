/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import Detail from '../ui/Detail';
import Input from '../ui/Input';
import ListingContainer  from '../ui/ListingContainer';
import MainContainer from '../ui/MainContainer';
import OrderedList from '../ui/OrderedList';
import SideBarContainer from '../ui/SideBarConainer';
import Title from '../ui/Title';

const dummyList:any = [
    { name: "Trending", onClick: () => {} },
    { name: "Most Recent", onClick: () => {} },
    { name: "Most Liked", onClick: () => {} },
    { name: "Most Viewed", onClick: () => {} },
];

const HomePage = (): JSX.Element => {
    const [showDetail, setDetail] = useState(false);

    return <div className="flex">
        <SideBarContainer>
            <OrderedList list={dummyList} title="Sort by" />
            <span className="text-black text-xs font-base">Create your own memes</span>
            <Link 
                className="bg-primary rounded-3xl py-2 px-5 text-white w-fit mt-4"
                to="/studio"
            >
                Studio
            </Link>
        </SideBarContainer>
        <MainContainer>
            <div className="py-3 sticky top-0 bg-grey flex z-10">
                <Input placeholder="Search" type="text" />
                <Avatar />
            </div>
            <div className="container flex-grow mt-4 p-2" onClick={() => setDetail((d) => !d)}>
                <Title>Trending Memes</Title>
                <ListingContainer isCollapsed={showDetail} isMasonry>
                    {[...new Array(60)].map(() => (
                        <Card />
                    ))}
                </ListingContainer>
            </div>
        </MainContainer>
        {showDetail && <SideBarContainer showOnRight>
                <Detail />
            </SideBarContainer>}
    </div>;
};

export default HomePage;