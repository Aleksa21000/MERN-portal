import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import LogoSvg from "../../../components/svgs/LogoSvg";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async ({ email, username, fullName, password }) => {
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
        },
        onSuccess: () => {
            toast.success("Account created successfully");
            setFormData({
                email: "",
                username: "",
                fullName: "",
                password: "",
            });
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
                <LogoSvg className=" lg:w-full px-5 mr-5 fill-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
                <form className="flex w-full gap-4 flex-col" onSubmit={handleSubmit}>
                    <LogoSvg className="w-24 lg:hidden fill-white" />
                    <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
                    <label className="input w-full input-bordered rounded flex items-center gap-2">
                        <MdOutlineMail />
                        <input
                            type="email"
                            className="grow"
                            placeholder="Email"
                            name="email"
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </label>
                    <label className="input w-full input-bordered rounded flex items-center gap-2">
                        <FaUser />
                        <input
                            type="text"
                            className="grow "
                            placeholder="Username"
                            name="username"
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </label>
                    <label className="input w-full input-bordered rounded flex items-center gap-2">
                        <MdDriveFileRenameOutline />
                        <input
                            type="text"
                            className="grow"
                            placeholder="Full Name"
                            name="fullName"
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={formData.fullName}
                        />
                    </label>
                    <label className="input w-full input-bordered rounded flex items-center gap-2">
                        <MdPassword />
                        <input
                            type="password"
                            className="grow"
                            placeholder="Password"
                            name="password"
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    <button className="btn rounded-full btn-primary text-white">
                        {isPending ? "Loading..." : "Sing up"}
                    </button>
                    {isError && <p className="text-red-500">{error.message}</p>}
                </form>
                <div className="flex flex-col w-full gap-2 mt-4">
                    <p className="text-white text-center text-lg">Already have an account?</p>
                    <Link to="/login">
                        <button className="btn rounded-full btn-primary text-white btn-outline w-full">
                            Sign in
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
