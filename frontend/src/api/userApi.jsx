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

export const fetchUserProfile = async (username) => {
    try {
        const res = await fetch(`/api/users/profile/${username}`, { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch user data");
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const fetchUserPosts = async (username) => {
    try {
        const res = await fetch(`/api/posts/user/${username}`, { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch user posts");
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const logoutUser = async () => {
    try {
        const res = await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};
