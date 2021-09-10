import Cookies from 'universal-cookie';

const cookies = new Cookies();
 
let timer:any;

export const debounce = (action: (...args:any[]) => void ,time:number):void =>  {
        clearTimeout(timer);
        timer = setTimeout(() => { action(); }, time);
    };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const serialize = (obj:any):string => new URLSearchParams(obj).toString();

export const getQuery = ():URLSearchParams => new URLSearchParams(window.location.search);

export const setLocalStorage = (key:string,value:string|any):void => {
    localStorage.setItem(key,typeof value === 'string' ? value : JSON.stringify(value));
};

export const getLocalStorage = (key:string):any => {
    const value:string|null = localStorage.getItem(key);
    return value ? JSON.parse(value): null;
};

export const elementInViewport = (elem:HTMLDivElement):boolean => {
  if(!elem) return false;
  const rect = elem.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true:
  const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  // isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
};

export const throttle = (fn: () => void, wait:number):any => {
  let time = Date.now();
  return () => {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  };
};

export const isValidEmail = (text: string):boolean => !!(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(text));

export const triggerResizeEvent = ():any => setTimeout(() => {
  window.dispatchEvent(new Event('resize'));
}, 0);

export const setCookie = (key:string, value:string):void => {
  const days = 7;
  const date = new Date();
  const expires:number = date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  cookies.set(key, value, {
    path: "/",
    expires: new Date(expires)
  });
};

export const getCookie = (key:string):string => cookies.get(key);

export const removeCookie = (key:string):void => {
  cookies.remove(key);
};