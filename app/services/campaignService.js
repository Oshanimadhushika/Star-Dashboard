import { authorizedAxiosInstance, authorizedFileUploadAxiosInstance } from "@/app/helpers/axiosInstance";

export const uploadCampaignImage = async (data) => {
    return authorizedFileUploadAxiosInstance.post("/campaign/admin/upload-image", data);
};

export const createCampaign = async (data) => {
    return authorizedAxiosInstance.post("/campaign/admin/create", data);
};

export const getAllCampaigns = async (params) => {
    return authorizedAxiosInstance.get("/campaign/admin/all", { params });
};

export const updateCampaign = async (data) => {
    return authorizedAxiosInstance.post("/campaign/admin/update", data);
};

export const validateCampaignTitle = async (data) => {
    return authorizedAxiosInstance.post("/campaign/validate-compaign-title", data);
};
