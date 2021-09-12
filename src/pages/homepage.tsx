/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

import { DynamicModuleLoader } from 'redux-dynamic-modules';

import Listing from '../components/Listing';
import ListingSearch from '../components/ListingSearch';
import Title from '../components/Meme/Title';
import Options from '../components/Options';
import User from '../components/User';
import ErrorBoundaryWrapper from '../components/Wrappers/ErrorBoundaryWrapper';
import RestrictWrapper from '../components/Wrappers/RestrictWrapper';
import getMemeModule from '../store/modules/meme';
import Logo from '../ui/Logo';
import MainContainer from '../ui/MainContainer';
import SideBarContainer from '../ui/SideBarConainer';

const MemeDetail = lazy(() => import('../components/Meme/MemeDetail'));

const HomePage = (): JSX.Element => <ErrorBoundaryWrapper>
    <div className="flex">
        <SideBarContainer>
            <Logo />
            <DynamicModuleLoader modules={[getMemeModule()]}>
                <Options type="sort" />
            </DynamicModuleLoader>
            <span className="text-black text-xs font-base">Create your own memes</span>
            <Link 
                className="bg-primary rounded-3xl py-2 px-5 text-white w-fit mt-4 transition transform-all hover:opacity-75"
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
                <User isTemplate={false} />
            </div>
            <div className="container flex-grow mt-4 p-2">
                <Title />
                <DynamicModuleLoader modules={[getMemeModule()]}>
                    <Listing isMasonry isTemplate={false} />
                </DynamicModuleLoader>
            </div>
        </MainContainer>
        <Suspense fallback={<SideBarContainer> <div className="animate-pulse bg-grey w-full h-full" /> </SideBarContainer>}>
            <RestrictWrapper levels={["memes","selectedMeme"]} showFor="notnull">
                <SideBarContainer showOnRight>
                    <MemeDetail />
                </SideBarContainer>
            </RestrictWrapper>
        </Suspense>
    </div>
</ErrorBoundaryWrapper>;

export default HomePage;