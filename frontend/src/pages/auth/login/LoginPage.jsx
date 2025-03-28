import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "../../../api/authApi";
import LoginForm from "../../../components/auth/LoginForm";

import LogoSvg from "../../../components/ui/LogoSvg";
import Button from "../../../components/ui/Button";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const queryClient = useQueryClient();

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: (data) => login(data),
        onSuccess: () => {
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
                <LoginForm
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    formData={formData}
                    isPending={isPending}
                    isError={isError}
                    error={error}
                />
                <div className="flex flex-col w-full gap-2 mt-4">
                    <p className="text-white text-center text-lg">{"Don't"} have an account?</p>
                    <Link to="/signup">
                        <Button type="submit" variant="transparent">
                            Sign up
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
