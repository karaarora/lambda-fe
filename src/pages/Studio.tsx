import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { ReactComponent as LeftArrow } from '../assets/icons/leftarrow.svg';
import Editor from '../components/Editor';
import Listing from '../components/Listing';
import ListingSearch from '../components/ListingSearch';
import Title from '../components/Meme/Title';
import Options from '../components/Options';
import ToggleRightSideBar from '../components/ToggleRightSideBar';
import FontSelect from '../components/ToolBar/Font/FontSelect';
import FontSizeSelect from '../components/ToolBar/Font/FontSizeSelect';
import MemeAction from '../components/ToolBar/MemeAction';
import RemoveObject from '../components/ToolBar/RemoveObject';
import TextBox from '../components/ToolBar/TextBox';
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
    const ref = useRef(null);
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
                    <div className="flex items-center">
                    <Link 
                        className="cursor-pointer scale-125 transform active:scale-100 block lg:hidden" 
                        to="/"
                    >
                        <LeftArrow />
                    </Link>
                        <Title contentEditable>This is my Heading</Title>
                        <ToggleRightSideBar sideBarRef={ref} />
                    </div>
                </DynamicModuleLoader>
                <User isTemplate />
                <DynamicModuleLoader modules={[getToolBarModule(),getEditorModule()]}>
                    <ToolBarContainer>
                        <div className="flex w-2/3 sm:w-2/5">
                            <RestrictWrapper levels={['editor','activeObject','type']} showFor="textbox">
                                <FontSelect />
                                <FontSizeSelect />
                            </RestrictWrapper>
                            <ToolTip position="bottom-full" value="Upload Background Image">
                                <Upload />
                            </ToolTip>
                            <RestrictWrapper levels={['memes','memeData']} showFor="notnull">
                                <RestrictWrapper levels={['editor','activeObject']} showFor="null">
                                    <ToolTip position="bottom-full" value="Add Text">
                                        <TextBox />
                                    </ToolTip>
                                </RestrictWrapper>
                            </RestrictWrapper>
                            <RestrictWrapper levels={['editor','activeObject']} showFor="notnull">
                                <ToolTip position="bottom-full" value="Remove Selected">
                                    <RemoveObject />
                                </ToolTip>
                            </RestrictWrapper>
                        </div>
                        <AuthWrapper>
                            <div className="flex items-center">
                                {/* uncomment this to enable creating a template */}
                                {/* <ToolTip position="bottom-full" value="Create a Template">
                                    <MemeAction action="create_template" />
                                </ToolTip> */}
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
            <SideBarContainer isExpanded={false} ref={ref} showOnRight>
                <DynamicModuleLoader modules={[getMemeModule()]}>
                    <ToggleRightSideBar sideBarRef={ref} />
                    <ListingSearch />  
                    <div className="w-full block md:block lg:hidden">
                        <DynamicModuleLoader modules={[getMemeModule()]}>
                            <Options isPill type="status" />
                        </DynamicModuleLoader>              
                    </div>
                    <Listing isTemplate  />
                </DynamicModuleLoader>
            </SideBarContainer>
        </div>
    </ErrorBoundaryWrapper>;
};

export default Studio;