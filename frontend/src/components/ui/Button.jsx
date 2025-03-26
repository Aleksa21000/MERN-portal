const Button = ({ children, onClick, type = "button", variant = "primary", disabled }) => {
    const defaultStyle = "btn rounded-full btn-sm px-4";
    const variants = {
        primary: "btn-primary text-white",
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
