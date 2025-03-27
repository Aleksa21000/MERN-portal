import { Link } from "react-router-dom";

const SidebarItem = ({ to, icon, label }) => {
    return (
        <li className="flex justify-center md:justify-start">
            <Link
                to={to}
                className="flex gap-3 items-center rounded-full py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
                {icon}
                <span className="text-lg hidden md:block">{label}</span>
            </Link>
        </li>
    );
};

export default SidebarItem;
