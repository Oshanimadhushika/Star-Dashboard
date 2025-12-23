import { authorizedAxiosInstance } from "@/app/helpers/axiosInstance";

export const getUsers = async (page = 1, perPage = 10, search = "", userStatus = "") => {
    return authorizedAxiosInstance.get("/user/admin/all", {
        params: {
            page,
            perPage,
            search,
            userStatus
        }
    });
};

export const banUser = async (data) => {
    return authorizedAxiosInstance.post("/user/admin/ban-user", data);
};

export const activateUser = async (data) => {
    return authorizedAxiosInstance.post("/user/admin/activate-user", data);
};


