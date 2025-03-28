import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

import LogoSvg from "../ui/LogoSvg";
import Button from "../ui/Button";

const LoginForm = ({ handleSubmit, handleInputChange, formData, isPending, isError, error }) => {
    return (
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
                    value={formData?.username}
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
                    value={formData?.password}
                />
            </label>
            <Button type="submit" variant="primary">
                {isPending ? "Loading..." : "Login"}
            </Button>
            {isError && <p className="text-red-500">{error?.message}</p>}
        </form>
    );
};

export default LoginForm;
