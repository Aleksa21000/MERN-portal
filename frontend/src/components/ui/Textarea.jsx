const Textarea = ({ name, placeholder, value, onChange, rows = 3, className = "" }) => {
    return (
        <textarea
            name={name}
            className={`textarea w-full p-1 rounded text-md resize-none focus:outline-none ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            style={{ wordWrap: "break-word" }}
        />
    );
};

export default Textarea;
