import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveFont } from '../../../store/actions/toolbar';
import getFonts from '../../../store/thunk/toolbar';
import { IState as EditorIState } from '../../../store/types/editor';
import { Font, IState as ToolBarIState } from '../../../store/types/toolbar';
import DropDown from '../../../ui/DropDown';
import DropDownItem from '../../../ui/DropDownItem';
import { updateTextBox } from '../../../utils/fabric';
import { fontsLoaded } from '../../../utils/fonts';

const FontSelect:React.FC = ():JSX.Element => {
    const { fonts, activeFont, canvas, activeObject } = useSelector((state: { toolbar: ToolBarIState, editor: EditorIState }) => 
        ({...state.toolbar,...state.editor}));
    const dispatch = useDispatch();

    const items = useMemo(() => fonts.map((font:Font) => (
        { 
            name: `${font.family}`
        }
    )),[fonts]);

    const handleClick = useCallback((value: string) => {
        const font:Font = fonts.find((f:Font) => f.family === value) as Font;
        if(font) {
            dispatch(setActiveFont(font));
            updateTextBox(canvas as fabric.Canvas,activeObject as fabric.Textbox,{ fontFamily: font.family });
        }
    }, [canvas, dispatch, fonts, activeObject]);

    useEffect(() => {
        if(!fonts.length){
            dispatch(getFonts());
        }
    }, [dispatch, fonts]);
    
    return <DropDown addValueToStyle onClick={handleClick} value={activeFont?.family||"Loading..."}>
        <DropDownItem addValueToStyle items={items} />
    </DropDown>;
};

export default FontSelect;