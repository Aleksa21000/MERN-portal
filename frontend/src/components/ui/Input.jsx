const Input = ({ type = "text", placeholder, value, onChange, name, className = "" }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`flex-1 input border rounded p-2 input-md ${className}`}
        />
    );
};

export default Input;
