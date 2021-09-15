import toast from 'react-hot-toast';

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { BASE_URL } from './env';
import { getCookie } from './functions';

/**
 * Create an Axios Client with defaults
 */
export const client = axios.create({
  baseURL: BASE_URL,
  headers: getCookie("me_token") ?  { Authorization: `Bearer ${getCookie("me_token")}` }:undefined
});

/**
 * Request Wrapper with default success/error actions
 */
const request = (options:AxiosRequestConfig):any => {

  const onSuccess = (response:AxiosResponse) => response.data;

  const onError = (error:AxiosError) => {
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx 
      toast.error(typeof error.response?.data === "string"? 
        error.response?.data : "Some Issue Occured! Please try in some time !");
    } else {
      // Something else happened while setting up the request
      // triggered the error
      toast.error(error.message || "Some thing happened!");
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;