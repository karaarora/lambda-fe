/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import Detail from '../ui/Detail';
import MainContainer from '../ui/MainContainer';
import OrderedList from '../ui/OrderedList';
import Search from '../ui/Search';
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
            <div className="py-3 sticky top-0 bg-gray flex z-10">
                <Search />
                <Avatar />
            </div>
            <div className="container flex-grow mt-4 p-2" onClick={() => setDetail((d) => !d)}>
                <Title>Trending Memes</Title>
                <div className={`py-5 ${showDetail ? `sm:masonry-1-col md:masonry-2-col lg:masonry-3-col`
                    : `masonry-1-col sm:masonry-2-col md:masonry-3-col lg:masonry-4-col
                    xl:masonry-5-col 2xl:masonry-6-col`} 
                    box-border mx-auto before:box-inherit after:box-inherit`}>
                    {[...new Array(60)].map(() => (
                        <Card />
                    ))}
                </div>
            </div>
        </MainContainer>
        {showDetail && <SideBarContainer showOnRight>
                <Detail />
            </SideBarContainer>}
    </div>;
};

export default HomePage;