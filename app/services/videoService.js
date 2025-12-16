import { authorizedAxiosInstance } from "../helpers/axiosInstance";

export const getAllVideos = async (params) => {
    return authorizedAxiosInstance.get("/campaign/admin/video/all", { params });
};

export const approveVideo = async (data) => {
    return authorizedAxiosInstance.post("/campaign/admin/video/approve", data);
};

export const rejectVideo = async (data) => {
    return authorizedAxiosInstance.post("/campaign/admin/video/reject", data);
};

export const deactivateVideo = async (data) => {
    return authorizedAxiosInstance.post("/campaign/admin/video/deactivate", data);
};
