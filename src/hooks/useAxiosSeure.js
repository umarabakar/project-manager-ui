import { useEffect } from "react";
import { axiosSecure } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosSecure = () => {
   const refresh = useRefreshToken();
   const {auth} = useAuth();

   useEffect( () => {

    const requestIntercept = axiosSecure.interceptors.request.use(
        config => {
            if(!config.headers['Authorization']){
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            }
            return config;
        }, (error) => Promise.reject(error)
    );

    const responseIntercept = axiosSecure.interceptors.response.use(
        response => response,
        async (error) => {


            const prevRequest = error?.config;
            if(error?.response?.status === 403 && !prevRequest?.sent){
                prevRequest.sent = true;
                const newAccessToken =  refresh();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosSecure(prevRequest);

            }
            return Promise.reject(error);
        } 
    );

    return () => {
        axiosSecure.interceptors.response.eject(responseIntercept);
        axiosSecure.interceptors.request.eject(requestIntercept);
    }

   },[auth,refresh])

   return axiosSecure;
}

export default useAxiosSecure;