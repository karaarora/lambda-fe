/* eslint-disable react/jsx-props-no-spreading */
import React, { ImgHTMLAttributes } from 'react';
import ProgressiveImage from 'react-progressive-image';

import NotFound from '../../assets/notfound.jpeg';
import PlaceHolder from '../../assets/placeholder.jpg';

const Image:React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, className, ...rest }):JSX.Element => 
    <ProgressiveImage onError={(e:any) => {
        e.target.src = NotFound;
        e.target.error = null;
    }} placeholder={PlaceHolder} src={src as string}>
        {(source:string, loading:boolean) => <img alt={alt} className={loading? `${className} animate-pulse`:className} 
            src={source} {...rest} />}
    </ProgressiveImage>;

export default Image;