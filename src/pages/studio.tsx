import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DynamicModuleLoader } from 'redux-dynamic-modules';

import Editor from '../components/Editor';
import Listing from '../components/Listing';
import ListingSearch from '../components/ListingSearch';
import Title from '../components/Meme/Title';
import Options from '../components/Options';
import FontSelect from '../components/ToolBar/Font/FontSelect';
import FontSizeSelect from '../components/ToolBar/Font/FontSizeSelect';
import MemeAction from '../components/ToolBar/MemeAction';
import Upload from '../components/ToolBar/Upload';
import User from '../components/User';
import AuthWrapper from '../components/Wrappers/AuthWrapper';
import ErrorBoundaryWrapper from '../components/Wrappers/ErrorBoundaryWrapper';
import RestrictWrapper from '../components/Wrappers/RestrictWrapper';
import getEditorModule from '../store/modules/editor';
import getMemeModule from '../store/modules/meme';
import getToolBarModule from '../store/modules/toolbar';
import Logo from '../ui/Logo';
import MainContainer from '../ui/MainContainer';
import SideBarContainer from '../ui/SideBarConainer';
import ToolBarContainer from '../ui/ToolBarContainer';
import ToolTip from '../ui/Tooltip';
import { clearFonts } from '../utils/fonts';

const Studio:React.FC = (): JSX.Element => {
    useEffect(() => () => clearFonts(), []);

    return <ErrorBoundaryWrapper> 
        <div className="flex h-screen">
            <SideBarContainer>
                <Logo />
                <DynamicModuleLoader modules={[getMemeModule()]}>
                    <Options type="status" />
                </DynamicModuleLoader>
                <Link 
                    className="bg-primary rounded-3xl py-2 px-5 text-white w-fit mt-4 transition transform-all hover:opacity-75"
                    to="/"
                >
                    Exit Studio
                </Link>
            </SideBarContainer>
            <MainContainer className="p-8">
                <DynamicModuleLoader modules={[getMemeModule()]}>
                    <Title contentEditable>This is my Heading</Title>
                </DynamicModuleLoader>
                <User isTemplate />
                <DynamicModuleLoader modules={[getToolBarModule(),getEditorModule()]}>
                    <ToolBarContainer>
                        <div className="flex w-1/2 sm:w-2/5">
                            <RestrictWrapper levels={['editor','activeObject','type']} showFor="textbox">
                                <FontSelect />
                                <FontSizeSelect />
                            </RestrictWrapper>
                            <ToolTip position="bottom-full" value="Upload Background Image">
                                <Upload />
                            </ToolTip>
                        </div>
                        <AuthWrapper>
                            <div className="flex items-center">
                                <ToolTip position="bottom-full" value="Create a Template">
                                    <MemeAction action="create_template" />
                                </ToolTip>
                                <ToolTip position="bottom-full" value="Save">
                                    <MemeAction action="save_meme" />
                                </ToolTip>
                                <ToolTip position="bottom-full" value="Publish">
                                    <MemeAction action="publish_meme" />
                                </ToolTip>
                            </div>
                        </AuthWrapper>
                    </ToolBarContainer>
                </DynamicModuleLoader>
                <DynamicModuleLoader modules={[getToolBarModule()]}>
                    <Editor />
                </DynamicModuleLoader>
            </MainContainer>
            <SideBarContainer isExpanded={false} showOnRight>
                <DynamicModuleLoader modules={[getMemeModule()]}>
                    <ListingSearch />                
                    <Listing isMasonry={false} isTemplate  />
                </DynamicModuleLoader>
            </SideBarContainer>
        </div>
    </ErrorBoundaryWrapper>;
};

export default Studio;