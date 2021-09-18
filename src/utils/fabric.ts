/* eslint-disable @typescript-eslint/no-use-before-define */
import { KeyboardEvent, MouseEvent } from "react-router/node_modules/@types/react";

import { fabric } from "fabric";
import { IEvent } from "fabric/fabric-impl";

export const defaultOptions = {
    cornerColor: "#46413b",
    borderColor: "#000",
    cornerStyle: "circle" as const,
    transparentCorners: false
};

export const defaultTextBoxOptions = { 
    scaleX: 2,
    scaleY: 2,
    isWrapping: true,
    dirty: true
};

export const ESTATE_KEY = "ms_e_state";
export const createCanvas = (canvasId:string,options?:fabric.ICanvasOptions):fabric.Canvas => 
    new fabric.Canvas(canvasId, options);

export const addImage = (canvas: fabric.Canvas | any, url:string,callback?: (c:fabric.Canvas) => void):void => {
    fabric.Image.fromURL(url, (image:fabric.Image | any) => {
        const imgWidth = image.width;
        const imgHeight = image.height;
        const aspectRatio = imgHeight/imgWidth;
        const canvasWidth = canvas.width;

        const canvasHeight = canvas.width * aspectRatio;
        const scaleFactor = canvasWidth / imgWidth;
        canvas.setWidth(canvasWidth);
        canvas.setHeight(canvasHeight);
        image.set({
            width: imgWidth, 
            height: imgHeight, 
            originX: 'left', 
            originY: 'top',
            scaleX: scaleFactor,
            scaleY:scaleFactor
        });
        canvas.setBackgroundImage(image);
        canvas.renderAll();
        if(callback) callback(canvas);
    });
};

export const listenEvent = (canvas:fabric.Canvas|null,key:string, action:(e:any) => void):void => {
    canvas?.on(key, action as any);
};

export const addTextBox = (canvas:fabric.Canvas,options: fabric.ITextboxOptions):fabric.Canvas => {
    const textBox = new fabric.Textbox('Sample Text', {...options,...defaultOptions});
    canvas.add(textBox);
    canvas.renderAll();
    canvas.setActiveObject(textBox);
    return canvas;
};

export const updateTextBox = (canavs:fabric.Canvas,textbox:fabric.Textbox,object:fabric.ITextboxOptions):void => {
    textbox.set(object);
    canavs.renderAll();
};

export const createTextBox = (e:MouseEvent|null, canvas:fabric.Canvas|null, options: fabric.ITextboxOptions):void => {
    if(!canvas) return;
    let left:number;
    let top:number;
    if(e && "absolutePointer" in e) {
        const { absolutePointer: { x, y }, target } = e as any;
        left = x;
        top = y;
        if (target) return;
    } else {
        left = (canvas?.width||100)/2;
        top = (canvas?.height||100)/2;
    }
    addTextBox(canvas, {...defaultTextBoxOptions,...options,left, top });
};

export const handleMouseDown = (e:IEvent<Event>, callback:(v:any) => void):void => {
    if(e.target) {
        callback(e.target);
    } else {
        callback(null);
    }
};

export const handleActiveObjectRemove = (e:KeyboardEvent|null, canvas:fabric.Canvas|null):void => {
    if(!canvas) return;
    if ((e && e.key === 'Backspace' && e.metaKey) || !e) {
        canvas.remove(canvas.getActiveObject());
    }
};

export const getCanvasDetails = (canvas:fabric.Canvas):{ state: string; base64: string; } => {
    const state = JSON.stringify(canvas.toJSON());
    const base64 = canvas.toDataURL({ 
        format: 'png',
        quality: 0.8
    }).split(',').pop() as string;
    return { state, base64 };
};