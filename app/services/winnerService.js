import { authorizedAxiosInstance } from "@/app/helpers/axiosInstance";

export const getLatestWinner = async () => {
    return authorizedAxiosInstance.get("/admin/winners/latest");
};
