import { authorizedAxiosInstance } from "@/app/helpers/axiosInstance";

// ... existing code ...
export const getLatestWinner = async () => {
    return authorizedAxiosInstance.get("/admin/winners/latest");
};

export const getAllCampaignWinners = async (page = 1, perPage = 10, search = "") => {
    return authorizedAxiosInstance.get(`/admin/all-campaign-winners`, {
        params: {
            page,
            perPage,
            search
        }
    });
};

export const getCampaignTopWinners = async (campaignId) => {
    return authorizedAxiosInstance.get(`/admin/campaign-top-winners`, {
        params: {
            campaignId
        }
    });
};

export const getOtherCampaignParticipants = async (page = 1, perPage = 10, campaignId) => {
    return authorizedAxiosInstance.get(`/admin/other-campaign-participants`, {
        params: {
            page,
            perPage,
            campaignId
        }
    });
};
