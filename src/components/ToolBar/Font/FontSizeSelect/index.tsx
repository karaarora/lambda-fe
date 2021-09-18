import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFontSize } from '../../../../store/actions/toolbar';
import { IState as EditorIState } from '../../../../store/types/editor';
import { IState as ToolBarIState } from '../../../../store/types/toolbar';
import DropDown from '../../../../ui/DropDown';
import DropDownItem from '../../../../ui/DropDownItem';
import { updateTextBox } from '../../../../utils/fabric';
import { fontSizes } from '../../../../utils/fonts';

const items = fontSizes.map((size:number) => ({ name: size.toString() }));
const FontSizeSelect:React.FC = ():JSX.Element => {
    const { fontSize, canvas, activeObject } = useSelector((state: { toolbar: ToolBarIState, editor: EditorIState }) => 
    ({...state.toolbar,...state.editor}));
    const dispatch = useDispatch();

    useEffect(() => {
        const active = activeObject;
        if(active && active.type === "textbox") {
            dispatch(setFontSize(((active as fabric.Textbox).fontSize)?.toString() || ""));
        }
    }, [activeObject, canvas, dispatch]);

    const handleClick = useCallback((value:string) => {
        if(value && fontSize !== value){
            dispatch(setFontSize(value));
            const active:fabric.Object = canvas?.getActiveObject() as fabric.Object;
            if(active.type === "textbox") {
                updateTextBox(canvas as fabric.Canvas,active as fabric.Textbox,{ fontSize: parseInt(value,10) });
            }
        }
    },[canvas, dispatch, fontSize]);
 
    return <DropDown onClick={handleClick} value={fontSize}>
        <DropDownItem items={items} />
    </DropDown>;
};

export default FontSizeSelect;