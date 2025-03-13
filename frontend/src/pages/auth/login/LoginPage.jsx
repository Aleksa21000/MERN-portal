import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import LogoSvg from "../../../components/svgs/LogoSvg";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const queryClient = useQueryClient();

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async ({ username, password }) => {
            try {
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to login");
                return data;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        onSuccess: () => {
            // Refetch the authUser to update UI
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-3xl w-full mx-auto flex h-screen px-10">
            <div className="flex-1 hidden lg:flex items-center  justify-center">
                <LogoSvg className="lg:w-full px-5 mr-5 fill-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
                <form className="flex w-full gap-4 flex-col" onSubmit={handleSubmit}>
                    <LogoSvg className="w-24 lg:hidden fill-white" />
                    <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
                    <label className="input w-full input-bordered rounded flex items-center gap-2">
                        <MdOutlineMail />
                        <input
                            type="text"
                            className="grow"
                            placeholder="username"
                            name="username"
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </label>

                    <label className="input w-full input-bordered rounded flex items-center gap-2">
                        <MdPassword />
                        <input
                            type="password"
                            className="grow"
                            placeholder="Password"
                            name="password"
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    <button className="btn rounded-full btn-primary text-white">
                        {isPending ? "Loading..." : "Login"}
                    </button>
                    {isError && <p className="text-red-500">{error.message}</p>}
                </form>
                <div className="flex flex-col w-full gap-2 mt-4">
                    <p className="text-white text-center text-lg">{"Don't"} have an account?</p>
                    <Link to="/signup">
                        <button className="btn rounded-full btn-primary text-white btn-outline w-full">
                            Sign up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
