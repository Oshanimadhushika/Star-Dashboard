import { useState, useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const useLazyFetch = (apiFn) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [error, setError] = useState(null);
    const { openNotification, handleError } =
        useContext(NotificationContext) || {};

    const trigger = async (params, apiStatus) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await apiFn(params);

            if (response.data?.success) {
                setData(response?.data.data);
                setError(null);
                if (apiStatus?.successMsg) {
                    openNotification?.(
                        "success",
                        response?.message || response.data?.message
                    );
                }
                setHasTriggered(true);
                return response;
            } else {
                setError(response?.message || response.data?.message);
                if (apiStatus?.errorMsg) {
                    openNotification?.(
                        "error",
                        response?.message || response.data?.message
                    );
                }
                setHasTriggered(false);
                return null;
            }
        } catch (err) {
            handleError?.(err);
            setHasTriggered(false);
            return null;
        } finally {
            setLoading(false);
            setHasTriggered(false);
        }
    };
    return { data, loading, hasTriggered, error, trigger };
};

export default useLazyFetch;
