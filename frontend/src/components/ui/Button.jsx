const Button = ({ children, onClick, type = "button", variant = "primary", disabled }) => {
    const defaultStyle = "btn rounded-full btn-sm";
    const variants = {
        primary: "btn-primary text-white px-4",
        secondary: "bg-white text-black hover:bg-white hover:opacity-90",
    };

    return (
        <button
            className={`${defaultStyle} ${variants[variant]}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
