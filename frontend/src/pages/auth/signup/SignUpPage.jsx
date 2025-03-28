import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { signup } from "../../../api/authApi";
import RegisterForm from "../../../components/auth/RegisterForm";

import LogoSvg from "../../../components/ui/LogoSvg";
import Button from "../../../components/ui/Button";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });

    const navigate = useNavigate();

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: (data) => signup(data),
        onSuccess: () => {
            toast.success("Account created successfully");
            setFormData({
                email: "",
                username: "",
                fullName: "",
                password: "",
            });
            navigate("/login");
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
                <RegisterForm
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    formData={formData}
                    isPending={isPending}
                    isError={isError}
                    error={error}
                />
                <div className="flex flex-col w-full gap-2 mt-4">
                    <p className="text-white text-center text-lg">Already have an account?</p>
                    <Link to="/login">
                        <Button type="submit" variant="transparent">
                            Sign in
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
