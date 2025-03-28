export const login = async ({ username, password }) => {
    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to login");
        return data;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

export const signup = async ({ email, username, fullName, password }) => {
    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, fullName, password }),
            credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");
        return data;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};
