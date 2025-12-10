import { getLocalStoragedata } from "@/app/helpers/storageHelper";
import axios from "axios";

// -------------------------
// JSON Axios
// -------------------------
export const authorizedAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// -------------------------
// File Upload Axios (form-data)
// -------------------------
export const authorizedFileUploadAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

// -------------------------
// Interceptors for both
// -------------------------

authorizedAxiosInstance.interceptors.request.use((config) => {
    const token = getLocalStoragedata("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

authorizedFileUploadAxiosInstance.interceptors.request.use((config) => {
    const token = getLocalStoragedata("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
