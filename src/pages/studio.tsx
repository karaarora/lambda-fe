import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DynamicModuleLoader } from 'redux-dynamic-modules';

import AuthWrapper from '../components/AuthWrapper';
import Editor from '../components/Editor';
import ErrorBoundaryWrapper from '../components/ErrorBoundaryWrapper';
import Listing from '../components/Listing';
import ListingSearch from '../components/ListingSearch';
import Options from '../components/Options';
import RestrictWrapper from '../components/RestrictWrapper';
import Title from '../components/Title';
import FontSelect from '../components/ToolBar/Font/FontSelect';
import FontSizeSelect from '../components/ToolBar/Font/FontSizeSelect';
import Publish from '../components/ToolBar/Publish';
import Save from '../components/ToolBar/Save';
import Template from '../components/ToolBar/Template';
import Upload from '../components/ToolBar/Upload';
import getEditorModule from '../store/modules/editor';
import getMemeModule from '../store/modules/meme';
import getToolBarModule from '../store/modules/toolbar';
import MainContainer from '../ui/MainContainer';
import SideBarContainer from '../ui/SideBarConainer';
import ToolBarContainer from '../ui/ToolBarContainer';
import { clearFonts } from '../utils/fonts';

const Studio:React.FC = (): JSX.Element => {
    useEffect(() => () => clearFonts(), []);

    return <ErrorBoundaryWrapper> 
        <div className="flex h-screen">
            <SideBarContainer>
                <DynamicModuleLoader modules={[getMemeModule()]}>
                    <Options type="status" />
                </DynamicModuleLoader>
                <Link 
                    className="bg-primary rounded-3xl py-2 px-5 text-white w-fit mt-4"
                    to="/"
                >
                    Exit Studio
                </Link>
            </SideBarContainer>
            <MainContainer className="p-8">
                <Title contentEditable>This is my Heading</Title>
                <DynamicModuleLoader modules={[getToolBarModule(),getEditorModule()]}>
                    <ToolBarContainer>
                        <div className="flex w-1/2 sm:w-2/5">
                            <RestrictWrapper levels={['editor','activeObject','type']} showFor="textbox">
                                <FontSelect />
                                <FontSizeSelect />
                            </RestrictWrapper>
                            <DynamicModuleLoader modules={[getEditorModule()]}>
                                <Upload />
                            </DynamicModuleLoader>
                        </div>
                        <AuthWrapper>
                            <Template />
                            <Save />
                            <Publish />
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