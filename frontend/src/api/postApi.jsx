export const createPost = async ({ text, img }) => {
    const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text, img }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create post");
    return data;
};

export const deletePost = async (postId) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong");
    return data;
};

export const likePost = async (postId) => {
    const res = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong");
    return data;
};

export const commentPost = async (postId, commentText) => {
    const res = await fetch(`/api/posts/comment/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text: commentText }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to comment");
    return data;
};
