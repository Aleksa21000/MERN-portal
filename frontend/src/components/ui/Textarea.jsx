const Textarea = ({ placeholder, value, onChange, rows = 3, className = "" }) => {
    return (
        <textarea
            className={`textarea w-full p-1 rounded text-md resize-none focus:outline-none ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
        />
    );
};

export default Textarea;

// border border-gray-800
