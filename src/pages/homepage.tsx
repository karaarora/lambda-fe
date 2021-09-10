/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';

import { DynamicModuleLoader } from 'redux-dynamic-modules';

import Listing from '../components/Listing';
import ListingSearch from '../components/ListingSearch';
import MemeDetail from '../components/MemeDetail';
import Options from '../components/Options';
import RestrictWrapper from '../components/RestrictWrapper';
import Title from '../components/Title';
import User from '../components/User';
import getMemeModule from '../store/modules/meme';
import Logo from '../ui/Logo';
import MainContainer from '../ui/MainContainer';
import SideBarContainer from '../ui/SideBarConainer';

const HomePage = (): JSX.Element => <div className="flex">
        <SideBarContainer>
            <Logo />
            <DynamicModuleLoader modules={[getMemeModule()]}>
                <Options type="sort" />
            </DynamicModuleLoader>
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
                <DynamicModuleLoader modules={[getMemeModule()]}>
                    <ListingSearch />
                </DynamicModuleLoader>
                <User />
            </div>
            <div className="container flex-grow mt-4 p-2">
                <Title>Trending Memes</Title>
                <DynamicModuleLoader modules={[getMemeModule()]}>
                    <Listing isMasonry isTemplate={false} />
                </DynamicModuleLoader>
            </div>
        </MainContainer>
        <RestrictWrapper levels={["memes","selectedMeme"]} showFor="notnull">
            <SideBarContainer showOnRight>
                <MemeDetail />
            </SideBarContainer>
        </RestrictWrapper>
    </div>;

export default HomePage;