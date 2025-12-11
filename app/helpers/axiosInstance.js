import { getCookie } from "@/app/helpers/storageHelper";
import axios from "axios";


export const authorizedAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


export const authorizedFileUploadAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});



// authorizedAxiosInstance.interceptors.request.use((config) => {
//     const token = getCookie("auth-token");

//     if (token) {
//         config.headers["auth-token"] = token;
//     }
//     return config;
// });

// authorizedFileUploadAxiosInstance.interceptors.request.use((config) => {
//     const token = getCookie("auth-token");

//     if (token) {
//         config.headers["auth-token"] = token;
//     }
//     return config;
// });
