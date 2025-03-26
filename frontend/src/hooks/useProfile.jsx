import { useQuery, useQueryClient } from "@tanstack/react-query";

const useProfile = (username) => {
    const queryClient = useQueryClient();
    const authUser = queryClient.getQueryData(["authUser"]);

    const {
        data: user,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery({
        queryKey: ["userProfile", username],
        queryFn: async () => {
            const res = await fetch(`/api/users/profile/${username}`, { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch user data");
            return res.json();
        },
    });

    const { data: userPosts } = useQuery({
        queryKey: ["userPosts", username],
        queryFn: async () => {
            const res = await fetch(`/api/posts/user/${username}`, { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch user posts");
            return res.json();
        },
    });

    return { user, userPosts, isLoading, isRefetching, refetch, authUser };
};

export default useProfile;
