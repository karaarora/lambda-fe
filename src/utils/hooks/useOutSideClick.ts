import React, { useEffect } from "react";

const useOutsideClick = (ref:React.MutableRefObject<any>, callback: () => void):void => {
  const handleClick = (e:MouseEvent) => {
    if (ref?.current && !ref?.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;
