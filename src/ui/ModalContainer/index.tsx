/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

const ModalContainer:React.FC<{
  handleClose: () => void;
  footer?: JSX.Element;
  title?: string;
}> = ({ children, handleClose, footer, title  }):JSX.Element => (
        <>
          <div
            aria-label="modal-container"
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto
              fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto w-80 max-w-2xl">
              {/* content */}
              <div className="border rounded-lg shadow-lg relative flex flex-col w-full
                bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 rounded-t">
                  {title && <h3 className="text-xl text-primary-bold font-semibold mx-auto">
                    {title}
                  </h3>}
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black 
                    float-right text-3xl leading-none font-semibold outline-none 
                    transition transform-all hover:opacity-75
                    focus:outline-none absolute right-0 top-0 transform -translate-y-2/4 translate-x-2/4"
                    onClick={handleClose}
                    type="button"
                  >
                    <span className="bg-transparent text-white text-2xl
                      block outline-none focus:outline-none">
                      <CloseIcon className="w-12 h-12" />
                    </span>
                  </button>
                </div>
                {/* body */}
                <div className="relative p-6 flex-auto flex flex-col items-center">
                  {children}
                </div>
                {/* footer */}
                {footer && <div className="flex items-center justify-center p-6 border-solid rounded-b">
                  {footer}
                </div>}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={handleClose} />
        </>
      );

ModalContainer.defaultProps = {
  footer: undefined,
  title: ""
};

export default ModalContainer;