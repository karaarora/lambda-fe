import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DynamicModuleLoader } from 'redux-dynamic-modules';

import Editor from '../components/Editor';
import RestrictWrapper from '../components/RestrictWrapper';
import FontSelect from '../components/ToolBar/Font/FontSelect';
import FontSizeSelect from '../components/ToolBar/Font/FontSizeSelect';
import Publish from '../components/ToolBar/Publish';
import Save from '../components/ToolBar/Save';
import Upload from '../components/ToolBar/Upload';
import getEditorModule from '../store/modules/editor';
import getToolBarModule from '../store/modules/toolbar';
import MainContainer from '../ui/MainContainer';
import OrderedList from '../ui/OrderedList';
import SideBarContainer from '../ui/SideBarConainer';
import Title from '../ui/Title';
import ToolBarContainer from '../ui/ToolBarContainer';
import { clearFonts, fontsLoaded } from '../utils/fonts';

const dummyList:any = [
    { name: "Published", onClick: () => {} },
    { name: "Saved", onClick: () => {} },
];

const Studio:React.FC = (): JSX.Element => {
    useEffect(() => () => clearFonts(), []);

    return <div className="flex h-screen">
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
            <Title contentEditable>This is my Heading</Title>
            <DynamicModuleLoader modules={[getToolBarModule(),getEditorModule()]}>
                <ToolBarContainer>
                    <div className="flex w-1/2 sm:w-2/5">
                        <RestrictWrapper showFor="textbox">
                            <FontSelect />
                            <FontSizeSelect />
                        </RestrictWrapper>
                        <DynamicModuleLoader modules={[getEditorModule()]}>
                            <Upload />
                        </DynamicModuleLoader>
                    </div>
                    <div className="">
                        <Save />
                        <Publish />
                    </div>
                </ToolBarContainer>
            </DynamicModuleLoader>
            <DynamicModuleLoader modules={[getToolBarModule()]}>
                <Editor />
            </DynamicModuleLoader>
        </MainContainer>
        {/* <SideBarContainer showOnRight>
            <h1>right</h1>
        </SideBarContainer> */}
    </div>;
};

export default Studio;