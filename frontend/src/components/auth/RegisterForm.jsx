import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

import LogoSvg from "../ui/LogoSvg";
import Button from "../ui/Button";

const RegisterForm = ({ handleSubmit, handleInputChange, formData, isPending, isError, error }) => {
    return (
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
                    value={formData?.email}
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
                    value={formData?.username}
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
                    value={formData?.fullName}
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
                    value={formData?.password}
                />
            </label>
            <Button type="submit" variant="primary">
                {isPending ? "Loading..." : "Sing up"}
            </Button>
            {isError && <p className="text-red-500">{error?.message}</p>}
        </form>
    );
};

export default RegisterForm;
