import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestImage from '../../../assets/notfound.jpeg';
import ShareMeme from './index';

const setup = () => {
    
    const component = render(<ShareMeme link={TestImage} />);

    return component;
};

test("Dont Show Share Modules By Default", () => {
    setup();

    expect(screen.queryByLabelText("dropup-items")).toBeNull();
});

test("On Click open Dropup", () => {
    setup();

    userEvent.click(screen.getByLabelText("dropup-value"));
    expect(screen.queryByLabelText("dropup-items")).toBeTruthy();
});

test("On Share click open new tab",() => {
    setup();
    const closeSpy = jest.fn();
    window.open = jest.fn().mockReturnValue({ close: closeSpy });
    window.close = jest.fn();
    userEvent.click(screen.getByLabelText("dropup-value"));
    userEvent.click(screen.getByLabelText("dropup-items").children[0]);
    
    expect(window.open).toHaveBeenCalled();
});