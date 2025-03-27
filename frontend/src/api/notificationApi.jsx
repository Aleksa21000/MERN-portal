export const fetchNotifications = async () => {
    try {
        const res = await fetch("/api/notifications", {
            method: "GET",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch notifications");
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteAllNotifications = async () => {
    try {
        const res = await fetch("/api/notifications", {
            method: "DELETE",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to delete notifications");
        return data;
    } catch (error) {
        throw new Error(error);
    }
};
