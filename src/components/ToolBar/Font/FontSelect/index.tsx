import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveFont } from '../../../../store/actions/toolbar';
import { getFonts } from '../../../../store/thunk/toolbar';
import { IState as EditorIState } from '../../../../store/types/editor';
import { Font, IState as ToolBarIState } from '../../../../store/types/toolbar';
import DropDown from '../../../../ui/DropDown';
import DropDownItem from '../../../../ui/DropDownItem';
import { updateTextBox } from '../../../../utils/fabric';
import { loadFonts } from '../../../../utils/fonts';

const FontSelect:React.FC = ():JSX.Element => {
    const { fonts, activeFont, canvas, activeObject } = useSelector((state: { toolbar: ToolBarIState, editor: EditorIState }) => 
        ({...state.toolbar,...state.editor}));
    const dispatch = useDispatch();

    const items = useMemo(() => fonts.map((font:Font) => (
        { 
            name: `${font.family}`
        }
    )),[fonts]);

    useEffect(() => {
        const active:any = activeObject;
        
        if(active && active.type === "textbox" && fonts.length > 0) {
            const font = fonts.find((f:Font) => f.family === active.fontFamily);
            dispatch(setActiveFont(font ? { family: active.fontFamily } as Font : fonts[0]));
            setTimeout(() => {
                document.fonts.ready.then(() => {
                    if(canvas) {
                        canvas.getObjects("textbox").forEach((object:fabric.Object) => {
                            const textObj:fabric.Object = object;
                            textObj.dirty = true;
                        });
                        canvas?.renderAll();
                    }
                });
            }, 2000);
        }
    }, [dispatch, fonts, activeObject, canvas]);

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
        } else if(document.fonts && document.fonts.size < 100) {
            loadFonts(fonts);
        }
    }, [dispatch, fonts]);
    
    return <DropDown addValueToStyle onClick={handleClick} value={activeFont?.family||"Loading..."}>
        <DropDownItem addValueToStyle items={items} />
    </DropDown>;
};

export default FontSelect;