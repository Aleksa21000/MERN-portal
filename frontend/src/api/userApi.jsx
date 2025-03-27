export const fetchSuggestedUsers = async () => {
    try {
        const res = await fetch("/api/users/suggested", { method: "GET", credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch suggested users");
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const logoutUser = async () => {
    try {
        const res = await fetch("api/auth/logout", { method: "POST", credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};
