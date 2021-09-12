import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const ModalWrapper:React.FC = ({ children }) => {
  const el = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(()=>{
      const elRef:HTMLDivElement = el.current;
    modalRoot?.appendChild(elRef);
    return ()=>{
      modalRoot?.removeChild(elRef);
    };
  },[]);

  return ReactDOM.createPortal(
    children,
    el.current
  );
};

export default ModalWrapper;